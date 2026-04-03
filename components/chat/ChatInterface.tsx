'use client';
import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';
import Link from 'next/link';
import {
  getConversations,
  saveConversation,
  deleteConversation,
  newId,
  groupByDate,
  type Conversation,
} from '@/lib/storage';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachedFile?: { name: string; type: string; base64: string };
}

const QUICK_SUGGESTIONS = [
  '¿Qué retención aplica en arrendamientos a no residentes?',
  'Analiza esta factura y dime las obligaciones derivadas',
  'Calcula la cuota de IRPF para estos rendimientos',
  'Redacta un recurso de reposición contra esta liquidación',
];

function getGreeting() {
  const h = new Date().getHours();
  if (h >= 6 && h < 12) return 'Buenos días, asesor';
  if (h >= 12 && h < 20) return 'Buenas tardes, asesor';
  return 'Buenas noches, asesor';
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConvId, setCurrentConvId] = useState<string>('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMsgId, setStreamingMsgId] = useState<string | null>(null);
  const [toolStatus, setToolStatus] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load conversations from localStorage on mount
  useEffect(() => {
    const convs = getConversations();
    setConversations(convs);
    if (convs.length > 0) {
      const latest = convs[0];
      setCurrentConvId(latest.id);
      setMessages(
        latest.messages.map((m) => ({ ...m, timestamp: new Date(m.timestamp) }))
      );
    } else {
      setCurrentConvId(newId());
    }
  }, []);

  // Save conversation whenever messages change
  useEffect(() => {
    if (messages.length === 0 || !currentConvId) return;
    const conv: Conversation = {
      id: currentConvId,
      title: messages[0].content.slice(0, 60) || 'Nueva conversación',
      messages: messages.map((m) => ({ ...m, timestamp: m.timestamp.toISOString() })),
      createdAt: messages[0].timestamp.toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveConversation(conv);
    setConversations(getConversations());
  }, [messages, currentConvId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, toolStatus]);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const startNewConversation = () => {
    setCurrentConvId(newId());
    setMessages([]);
    setInput('');
    setAttachedFile(null);
    setSidebarOpen(false);
  };

  const loadConversation = (conv: Conversation) => {
    setCurrentConvId(conv.id);
    setMessages(conv.messages.map((m) => ({ ...m, timestamp: new Date(m.timestamp) })));
    setInput('');
    setAttachedFile(null);
    setSidebarOpen(false);
  };

  const handleDeleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteConversation(id);
    const updated = getConversations();
    setConversations(updated);
    if (id === currentConvId) {
      if (updated.length > 0) {
        loadConversation(updated[0]);
      } else {
        startNewConversation();
      }
    }
  };

  const handleSend = async (overrideInput?: string) => {
    const text = (overrideInput ?? input).trim();
    if (!text && !attachedFile) return;
    if (isLoading) return;

    let fileData: { name: string; type: string; base64: string } | undefined;
    if (attachedFile) {
      const base64 = await fileToBase64(attachedFile);
      fileData = { name: attachedFile.name, type: attachedFile.type, base64 };
    }

    const userMsg: Message = {
      id: newId(),
      role: 'user',
      content: text,
      timestamp: new Date(),
      attachedFile: fileData,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setAttachedFile(null);
    setIsLoading(true);

    const assistantId = newId();

    try {
      const apiMessages = newMessages.map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, fileData }),
      });

      if (!res.ok || !res.body) throw new Error('Error de red');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let streamStarted = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = line.slice(6).trim();
          if (payload === '[DONE]') break;

          try {
            const parsed = JSON.parse(payload);

            if (parsed.error) throw new Error(parsed.error);

            if (parsed.searching) {
              setToolStatus(`Consultando ${parsed.searching.source}: "${parsed.searching.query}"`);
            }
            if (parsed.searched) {
              setToolStatus(null);
            }

            if (parsed.text) {
              if (!streamStarted) {
                streamStarted = true;
                setStreamingMsgId(assistantId);
                setMessages((prev) => [
                  ...prev,
                  { id: assistantId, role: 'assistant', content: parsed.text, timestamp: new Date() },
                ]);
              } else {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: m.content + parsed.text } : m
                  )
                );
              }
            }
          } catch (e) {
            if (!streamStarted) {
              const errMsg = e instanceof Error ? e.message : 'Error al procesar la consulta.';
              setMessages((prev) => [
                ...prev,
                { id: assistantId, role: 'assistant', content: errMsg, timestamp: new Date() },
              ]);
              streamStarted = true;
            }
          }
        }
      }

      if (!streamStarted) {
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: 'assistant', content: 'No se recibió respuesta.', timestamp: new Date() },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: 'assistant',
          content: 'Error de conexión. Por favor, inténtalo de nuevo.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setStreamingMsgId(null);
      setToolStatus(null);
    }
  };

  const Sidebar = () => (
    <aside
      className="flex flex-col h-full"
      style={{ backgroundColor: '#171717', width: '260px', minWidth: '260px' }}
    >
      {/* Header */}
      <div className="p-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="font-serif font-semibold" style={{ fontSize: '13px', color: 'white' }}>
          Benavides Asociados
        </p>
        <p className="font-sans" style={{ fontSize: '11px', color: '#EAAA00', marginTop: '2px' }}>
          Agente Fiscal BA
        </p>
      </div>

      {/* New conversation */}
      <div className="p-3">
        <button
          onClick={startNewConversation}
          className="w-full flex items-center gap-2 font-sans rounded-lg transition-colors"
          style={{
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.85)',
            fontSize: '13px',
            padding: '9px 14px',
            background: 'none',
            cursor: 'pointer',
            textAlign: 'left',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nueva conversación
        </button>
      </div>

      {/* Conversation history */}
      <div className="flex-1 overflow-y-auto px-2 py-1">
        {conversations.length === 0 ? (
          <p className="font-sans px-3 py-2" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
            Aún no hay conversaciones
          </p>
        ) : (
          groupByDate(conversations).map(([label, convs]) => (
            <div key={label} className="mb-3">
              <p
                className="font-sans px-3 mb-1"
                style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}
              >
                {label.toUpperCase()}
              </p>
              {convs.map((conv) => (
                <div
                  key={conv.id}
                  className="group/item flex items-center rounded-lg"
                  style={{
                    backgroundColor: conv.id === currentConvId ? 'rgba(255,255,255,0.1)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (conv.id !== currentConvId)
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    if (conv.id !== currentConvId)
                      e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <button
                    onClick={() => loadConversation(conv)}
                    className="flex-1 text-left font-sans px-3 py-2 rounded-lg"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: conv.id === currentConvId ? 'white' : 'rgba(255,255,255,0.65)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      width: 0,
                      minWidth: 0,
                    }}
                    title={conv.title}
                  >
                    {conv.title}
                  </button>
                  <button
                    onClick={(e) => handleDeleteConversation(conv.id, e)}
                    className="flex-shrink-0 p-1.5 mr-1 rounded opacity-0 group-hover/item:opacity-100 transition-opacity"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)' }}
                    title="Eliminar conversación"
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                  >
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <Link
          href="/"
          className="font-sans flex items-center gap-1.5 hover:opacity-80 transition-opacity mb-2"
          style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}
        >
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a la landing
        </Link>
        <p className="font-sans" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}>
          Uso interno · v2.0
        </p>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'white' }}>
      {/* Sidebar — desktop */}
      <div className="hidden md:flex flex-col" style={{ width: '260px', flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* Sidebar — mobile drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="flex flex-col h-full" style={{ width: '260px' }}>
            <Sidebar />
          </div>
          <div className="flex-1 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Minimal header */}
        <div
          className="flex items-center justify-between px-6 py-3"
          style={{ borderBottom: '1px solid #F3F4F6', flexShrink: 0 }}
        >
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-1"
              onClick={() => setSidebarOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#374151' }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div
                className="flex items-center justify-center rounded-full"
                style={{ width: '24px', height: '24px', backgroundColor: '#002A3A' }}
              >
                <span style={{ fontSize: '8px', fontWeight: 700, color: '#EAAA00', fontFamily: 'serif' }}>BA</span>
              </div>
              <span className="font-sans font-medium" style={{ fontSize: '14px', color: '#111827' }}>
                Agente Fiscal Senior
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span
                className="rounded-full"
                style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: toolStatus ? '#EAAA00' : '#22c55e',
                  animation: 'pulse 2s infinite',
                }}
              />
              <span className="font-sans" style={{ fontSize: '12px', color: '#6B7280' }}>
                {toolStatus ? 'Buscando...' : isLoading ? 'Escribiendo...' : 'Disponible'}
              </span>
            </div>
            <button
              onClick={() => {
                if (messages.length === 0) return;
                if (confirm('¿Limpiar esta conversación?')) {
                  setMessages([]);
                  setCurrentConvId(newId());
                }
              }}
              title="Nueva conversación"
              className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div
                className="flex items-center justify-center rounded-full mb-5"
                style={{ width: '48px', height: '48px', backgroundColor: '#002A3A' }}
              >
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#EAAA00', fontFamily: 'serif' }}>BA</span>
              </div>
              <h2 className="font-serif font-semibold mb-2" style={{ fontSize: '22px', color: '#111827' }}>
                {getGreeting()}
              </h2>
              <p className="font-sans mb-8" style={{ fontSize: '15px', color: '#6B7280', maxWidth: '420px' }}>
                Formula tu consulta o sube un documento para empezar.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-xl">
                {QUICK_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="text-left p-4 rounded-xl font-sans transition-colors"
                    style={{
                      border: '1px solid #E5E7EB',
                      fontSize: '13px',
                      color: '#374151',
                      background: 'white',
                      cursor: 'pointer',
                      lineHeight: 1.5,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 24px' }}>
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isStreaming={msg.id === streamingMsgId}
                />
              ))}

              {/* Search status */}
              {toolStatus && (
                <div className="flex gap-3 mb-6">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#002A3A', marginTop: '2px' }}
                  >
                    <span style={{ fontSize: '9px', fontWeight: 700, color: '#EAAA00', fontFamily: 'serif' }}>BA</span>
                  </div>
                  <div
                    className="flex items-center gap-2 font-sans"
                    style={{
                      backgroundColor: 'rgba(234,170,0,0.08)',
                      border: '1px solid rgba(234,170,0,0.25)',
                      borderRadius: '10px',
                      padding: '8px 14px',
                      fontSize: '13px',
                      color: '#5F5E5A',
                    }}
                  >
                    <svg className="animate-spin flex-shrink-0" width="13" height="13" fill="none" stroke="#EAAA00" strokeWidth="2.5" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0110 10" />
                    </svg>
                    <span style={{ color: '#92733A', fontWeight: 500 }}>Consultando fuentes oficiales —</span>
                    <span className="truncate">{toolStatus}</span>
                  </div>
                </div>
              )}

              {/* Typing dots */}
              {isLoading && streamingMsgId === null && !toolStatus && (
                <div className="flex gap-3 mb-6">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#002A3A', marginTop: '2px' }}
                  >
                    <span style={{ fontSize: '9px', fontWeight: 700, color: '#EAAA00', fontFamily: 'serif' }}>BA</span>
                  </div>
                  <div className="flex items-center" style={{ paddingTop: '6px' }}>
                    <div className="flex gap-1">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <InputBar
          input={input}
          setInput={setInput}
          onSend={() => handleSend()}
          isLoading={isLoading}
          attachedFile={attachedFile}
          onFileAttach={setAttachedFile}
          onFileRemove={() => setAttachedFile(null)}
        />
      </div>
    </div>
  );
}
