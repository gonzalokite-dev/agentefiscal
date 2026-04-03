'use client';
import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';
import Link from 'next/link';

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

const SIDEBAR_ITEMS = [
  'Análisis de facturas y documentos',
  'Consultas IRPF · IVA · IS · IRNR',
  'ITP · Sucesiones · Normativa balear',
  'Cálculos y retenciones',
  'Borradores de escritos y recursos',
  'Modelos tributarios y plazos',
];

function getGreeting() {
  const h = new Date().getHours();
  if (h >= 6 && h < 12) return 'Buenos días, asesor';
  if (h >= 12 && h < 20) return 'Buenas tardes, asesor';
  return 'Buenas noches, asesor';
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMsgId, setStreamingMsgId] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
      id: Date.now().toString(),
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

    const assistantId = (Date.now() + 1).toString();

    try {
      const apiMessages = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

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

            if (parsed.text) {
              if (!streamStarted) {
                streamStarted = true;
                setStreamingMsgId(assistantId);
                setMessages((prev) => [
                  ...prev,
                  {
                    id: assistantId,
                    role: 'assistant',
                    content: parsed.text,
                    timestamp: new Date(),
                  },
                ]);
              } else {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId
                      ? { ...m, content: m.content + parsed.text }
                      : m
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
    }
  };

  const handleSuggestion = (text: string) => {
    handleSend(text);
  };

  const clearChat = () => {
    if (confirm('¿Limpiar toda la conversación?')) {
      setMessages([]);
      setInput('');
      setAttachedFile(null);
    }
  };

  const Sidebar = () => (
    <aside
      className="flex flex-col h-full"
      style={{ backgroundColor: '#002A3A', width: '260px', minWidth: '260px' }}
    >
      <div className="p-5" style={{ borderBottom: '1px solid rgba(215,210,203,0.1)' }}>
        <p className="font-serif font-semibold text-white" style={{ fontSize: '13px' }}>
          Benavides Asociados
        </p>
        <p className="font-sans" style={{ fontSize: '11px', color: '#EAAA00', marginTop: '2px' }}>
          Agente Fiscal BA
        </p>
      </div>

      <div className="p-5">
        <button
          onClick={clearChat}
          className="w-full flex items-center gap-2 font-sans transition-opacity hover:opacity-80"
          style={{
            border: '1px solid rgba(215,210,203,0.25)',
            borderRadius: '6px',
            color: '#D7D2CB',
            fontSize: '13px',
            padding: '10px 16px',
            background: 'none',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: '16px', lineHeight: 1 }}>+</span>
          Nueva conversación
        </button>
      </div>

      <div className="px-5 flex-1">
        <p
          className="font-sans mb-3"
          style={{ fontSize: '11px', color: 'rgba(215,210,203,0.5)', letterSpacing: '0.08em' }}
        >
          PUEDO AYUDARTE CON
        </p>
        <ul className="flex flex-col gap-2">
          {SIDEBAR_ITEMS.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span
                className="flex-shrink-0 rounded-full mt-1.5"
                style={{ width: '5px', height: '5px', backgroundColor: '#EAAA00', minWidth: '5px' }}
              />
              <span className="font-sans" style={{ fontSize: '12px', color: 'rgba(215,210,203,0.7)', lineHeight: 1.5 }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-5" style={{ borderTop: '1px solid rgba(215,210,203,0.1)' }}>
        <Link
          href="/"
          className="font-sans block mb-2 hover:opacity-80 transition-opacity"
          style={{ fontSize: '12px', color: 'rgba(215,210,203,0.5)', textDecoration: 'none' }}
        >
          ← Volver a la landing
        </Link>
        <p className="font-sans" style={{ fontSize: '10px', color: 'rgba(215,210,203,0.4)' }}>
          Uso interno · v2.0
        </p>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#F7F6F4' }}>
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
          <div className="flex-1 bg-black bg-opacity-40" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Chat header */}
        <div
          className="flex items-center justify-between px-8 py-4"
          style={{ backgroundColor: 'white', borderBottom: '1px solid #E2DED9', flexShrink: 0 }}
        >
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-1"
              onClick={() => setSidebarOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#002A3A' }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <p className="font-sans font-medium" style={{ fontSize: '15px', color: '#002A3A' }}>
                Agente Fiscal Senior
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className="rounded-full"
                  style={{
                    width: '7px',
                    height: '7px',
                    backgroundColor: '#22c55e',
                    boxShadow: '0 0 0 2px rgba(34,197,94,0.2)',
                    animation: 'pulse 2s infinite',
                  }}
                />
                <span className="font-sans" style={{ fontSize: '12px', color: '#5F5E5A' }}>
                  {isLoading ? 'Escribiendo...' : 'Disponible'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={clearChat}
            title="Limpiar conversación"
            className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5F5E5A' }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg
                width="48"
                height="48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                viewBox="0 0 24 24"
                style={{ color: '#002A3A', opacity: 0.15, marginBottom: '20px' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
              <h2 className="font-serif font-semibold mb-2" style={{ fontSize: '22px', color: '#002A3A' }}>
                {getGreeting()}
              </h2>
              <p className="font-sans mb-8" style={{ fontSize: '14px', color: '#5F5E5A' }}>
                Formula tu consulta o sube un documento para empezar.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                {QUICK_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestion(s)}
                    className="text-left p-4 rounded-lg font-sans transition-colors hover:bg-white"
                    style={{
                      border: '1px solid #E2DED9',
                      fontSize: '13px',
                      color: '#002A3A',
                      background: 'rgba(255,255,255,0.6)',
                      cursor: 'pointer',
                      lineHeight: 1.5,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isStreaming={msg.id === streamingMsgId}
                />
              ))}
              {/* Typing dots: only while waiting for first token */}
              {isLoading && streamingMsgId === null && (
                <div className="flex justify-start mb-4">
                  <div
                    className="font-sans"
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid #E2DED9',
                      borderRadius: '16px 16px 16px 4px',
                      padding: '14px 18px',
                    }}
                  >
                    <div className="flex gap-1.5 items-center">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input bar */}
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
