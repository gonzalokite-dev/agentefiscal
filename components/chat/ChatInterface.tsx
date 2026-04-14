'use client';
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Logo from '@/components/ui/Logo';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';
import SourcesPanel, { type SourceEntry } from './SourcesPanel';
import Link from 'next/link';
import {
  getConversations,
  saveConversation,
  deleteConversation,
  newId,
  groupByDate,
  type Conversation,
} from '@/lib/storage';

const ADMIN_EMAIL = 'gbenavides@benavidesasociados.com';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachedFile?: { name: string; type: string; base64: string };
}

const QUICK_SUGGESTIONS = [
  {
    text: '¿Qué retención aplica en arrendamientos a no residentes?',
    tag: 'IRNR',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
      </svg>
    ),
  },
  {
    text: 'Analiza esta factura y dime las obligaciones derivadas',
    tag: 'Documentos',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    text: 'Calcula la cuota de IRPF para estos rendimientos',
    tag: 'IRPF',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    text: 'Redacta un recurso de reposición contra esta liquidación',
    tag: 'Recursos',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
];

function getGreeting(firstName: string) {
  const h = new Date().getHours();
  const name = firstName || 'asesor';
  if (h >= 6 && h < 14) return `Buenos días, ${name}`;
  if (h >= 14 && h < 21) return `Buenas tardes, ${name}`;
  return `Buenas noches, ${name}`;
}


export default function ChatInterface() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email ?? '';
  const firstName = session?.user?.name?.split(' ')[0] ?? '';
  const isAdmin = userEmail === ADMIN_EMAIL;
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConvId, setCurrentConvId] = useState<string>('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMsgId, setStreamingMsgId] = useState<string | null>(null);
  const [toolStatus, setToolStatus] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [feedbackMap, setFeedbackMap] = useState<Record<string, 'up' | 'down'>>({});
  const [consultedSources, setConsultedSources] = useState<SourceEntry[]>([]);
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

  // Pre-fill input from ?q= URL param (e.g. from landing examples)
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setInput(q);
  }, [searchParams]);

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
    setConsultedSources([]);
    setSidebarOpen(false);
  };

  const loadConversation = (conv: Conversation) => {
    setCurrentConvId(conv.id);
    setMessages(conv.messages.map((m) => ({ ...m, timestamp: new Date(m.timestamp) })));
    setInput('');
    setAttachedFile(null);
    setConsultedSources([]);
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

  const handleFeedback = async (messageId: string, rating: 'up' | 'down') => {
    if (feedbackMap[messageId]) return; // ya valorado
    setFeedbackMap((prev) => ({ ...prev, [messageId]: rating }));

    // Find the assistant message and the user message just before it
    const msgIndex = messages.findIndex((m) => m.id === messageId);
    const agentResponse = messages[msgIndex]?.content ?? '';
    const userQuestion = messages
      .slice(0, msgIndex)
      .filter((m) => m.role === 'user')
      .at(-1)?.content ?? '';

    // Build readable conversation context (last 8 messages)
    const contextSlice = messages.slice(Math.max(0, msgIndex - 7), msgIndex + 1);
    const conversationContext = contextSlice
      .map((m) => `[${m.role === 'user' ? 'USUARIO' : 'AGENTE'}]\n${m.content}`)
      .join('\n\n---\n\n');

    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rating,
        messageId,
        conversationId: currentConvId,
        userQuestion,
        agentResponse,
        conversationContext,
      }),
    });
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
      const apiMessages = newMessages.map((m) => ({
        role: m.role,
        content: m.content || (m.attachedFile ? `[Archivo adjunto: ${m.attachedFile.name}]` : ' '),
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

            if (parsed.searching) {
              setToolStatus(`Consultando ${parsed.searching.source}: "${parsed.searching.query}"`);
              // Add to consulted sources (avoid duplicates by source+query)
              setConsultedSources((prev) => {
                const isDuplicate = prev.some(
                  (e) => e.source === parsed.searching.source && e.query === parsed.searching.query
                );
                if (isDuplicate) return prev;
                return [
                  ...prev,
                  {
                    id: newId(),
                    source: parsed.searching.source,
                    query: parsed.searching.query,
                  },
                ];
              });
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

  /* ─── Left Sidebar ─── */
  const Sidebar = () => (
    <aside
      className="flex flex-col h-full"
      style={{ backgroundColor: '#FFFFFF', width: '220px', minWidth: '220px', borderRight: '1px solid #E5E7EB' }}
    >
      {/* Logo + subtitle */}
      <div className="px-4 py-5" style={{ borderBottom: '1px solid #E5E7EB', flexShrink: 0 }}>
        <img
          src="/logo-victoria-transparent.png"
          alt="Victoria"
          style={{ height: '32px', width: 'auto' }}
        />
        <p
          className="font-sans"
          style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '4px', letterSpacing: '0.02em' }}
        >
          Tu copiloto fiscal
        </p>
      </div>

      {/* New chat button */}
      <div className="p-3" style={{ flexShrink: 0 }}>
        <button
          onClick={startNewConversation}
          className="w-full flex items-center justify-center gap-2 font-sans rounded-lg transition-colors"
          style={{
            backgroundColor: '#00B5AD',
            color: 'white',
            fontSize: '13px',
            fontWeight: 600,
            padding: '9px 14px',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#009e97')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#00B5AD')}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nuevo chat
        </button>
      </div>

      {/* Conversation history */}
      <div className="flex-1 overflow-y-auto px-2 py-1">
        <p
          className="font-sans px-3 mb-2"
          style={{ fontSize: '11px', color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}
        >
          Conversaciones
        </p>

        {conversations.length === 0 ? (
          <p className="font-sans px-3 py-2" style={{ fontSize: '12px', color: '#D1D5DB', fontStyle: 'italic' }}>
            Aún no hay conversaciones
          </p>
        ) : (
          groupByDate(conversations).map(([label, convs]) => (
            <div key={label} className="mb-3">
              <p
                className="font-sans px-3 mb-1"
                style={{ fontSize: '10px', color: '#C4C4C4', letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                {label}
              </p>
              {convs.map((conv) => (
                <div
                  key={conv.id}
                  className="group/item flex items-center rounded-lg"
                  style={{
                    backgroundColor: conv.id === currentConvId ? 'rgba(0,181,173,0.08)' : 'transparent',
                    borderLeft: conv.id === currentConvId ? '2px solid #00B5AD' : '2px solid transparent',
                    transition: 'background-color 0.15s, border-color 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    if (conv.id !== currentConvId)
                      e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)';
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
                      color: conv.id === currentConvId ? '#0D2E35' : '#4B5563',
                      fontWeight: conv.id === currentConvId ? 600 : 400,
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
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}
                    title="Eliminar conversación"
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#374151')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
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
      <div className="p-4" style={{ borderTop: '1px solid #E5E7EB', flexShrink: 0 }}>
        {/* User email + Pro badge */}
        <div className="flex items-center gap-2 mb-3" style={{ overflow: 'hidden' }}>
          <p
            className="font-sans flex-1 min-w-0"
            style={{
              fontSize: '11px',
              color: '#6B7280',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {userEmail}
          </p>
          <span
            className="font-sans flex-shrink-0"
            style={{
              fontSize: '10px',
              fontWeight: 600,
              color: '#00B5AD',
              backgroundColor: 'rgba(0,181,173,0.1)',
              border: '1px solid rgba(0,181,173,0.25)',
              borderRadius: '9999px',
              padding: '2px 7px',
              whiteSpace: 'nowrap',
            }}
          >
            Victoria Pro · IA
          </span>
        </div>

        <Link
          href="/"
          className="font-sans flex items-center gap-1.5 hover:opacity-80 transition-opacity mb-2"
          style={{ fontSize: '12px', color: '#9CA3AF', textDecoration: 'none' }}
        >
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a la landing
        </Link>

        {isAdmin && (
          <Link
            href="/admin/feedback"
            className="font-sans flex items-center gap-1.5 hover:opacity-80 transition-opacity mb-2"
            style={{ fontSize: '12px', color: '#9CA3AF', textDecoration: 'none' }}
          >
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Panel de feedback
          </Link>
        )}

        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="font-sans hover:opacity-80 transition-opacity"
          style={{
            fontSize: '12px',
            color: '#9CA3AF',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex overflow-hidden" style={{ height: '100dvh', backgroundColor: '#F5F7FA', overflowX: 'hidden' }}>
      {/* Left Sidebar — desktop */}
      <div className="hidden md:flex flex-col" style={{ flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* Left Sidebar — mobile drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="flex flex-col" style={{ width: '260px', height: '100dvh' }}>
            <Sidebar />
          </div>
          <div className="flex-1 bg-black bg-opacity-40" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main chat area */}
      <div className="flex flex-col flex-1 min-w-0" style={{ backgroundColor: '#F5F7FA' }}>
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 md:px-5 py-3"
          style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', flexShrink: 0 }}
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Hamburger — mobile only */}
            <button
              className="md:hidden p-1 flex-shrink-0"
              onClick={() => setSidebarOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#374151' }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo — mobile header (desktop has it in sidebar) */}
            <img
              src="/logo-victoria-transparent.png"
              alt="Victoria"
              className="md:hidden flex-shrink-0"
              style={{ height: '22px', width: 'auto' }}
            />

            {/* Conversation title — desktop only */}
            <div className="hidden md:block min-w-0">
              <h1
                className="font-sans font-semibold truncate"
                style={{ fontSize: '14px', color: '#0D2E35', maxWidth: '320px' }}
              >
                {messages.length > 0
                  ? messages[0].content.slice(0, 55) + (messages[0].content.length > 55 ? '…' : '')
                  : 'Nueva conversación'}
              </h1>
            </div>

            {/* Sources count badge */}
            {consultedSources.length > 0 && (
              <span
                className="font-sans flex-shrink-0"
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#00B5AD',
                  backgroundColor: 'rgba(0,181,173,0.1)',
                  border: '1px solid rgba(0,181,173,0.25)',
                  borderRadius: '9999px',
                  padding: '2px 8px',
                  whiteSpace: 'nowrap',
                }}
              >
                {consultedSources.length} {consultedSources.length === 1 ? 'fuente' : 'fuentes'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Status pill — full text on desktop, dot only on mobile */}
            <div
              className="font-sans flex items-center gap-1.5"
              style={{
                fontSize: '11px',
                padding: '4px 10px',
                borderRadius: '9999px',
                backgroundColor: toolStatus || isLoading ? 'rgba(0,181,173,0.08)' : 'rgba(34,197,94,0.08)',
                border: toolStatus || isLoading ? '1px solid rgba(0,181,173,0.2)' : '1px solid rgba(34,197,94,0.2)',
                color: toolStatus || isLoading ? '#00B5AD' : '#16a34a',
                transition: 'all 0.3s ease',
              }}
            >
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: toolStatus || isLoading ? '#00B5AD' : '#22c55e',
                  flexShrink: 0,
                  animation: isLoading || toolStatus ? 'pulse 1.5s infinite' : 'none',
                }}
              />
              <span className="hidden sm:inline">
                {toolStatus ? 'Buscando...' : isLoading ? 'Escribiendo...' : 'Disponible'}
              </span>
            </div>

            {/* New chat icon button */}
            <button
              onClick={startNewConversation}
              title="Nueva conversación"
              className="p-1.5 rounded-lg transition-colors"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D1D5DB' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#6B7280')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#D1D5DB')}
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' } as React.CSSProperties}
        >
          {messages.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
              <img
                src="/logo-victoria-transparent.png"
                alt="Victoria"
                style={{ height: '56px', width: 'auto', marginBottom: '20px', flexShrink: 0 }}
              />
              <h2
                className="font-serif font-bold mb-2"
                style={{ fontSize: 'clamp(20px, 5vw, 26px)', color: '#0D2E35', letterSpacing: '-0.02em' }}
              >
                {getGreeting(firstName)}
              </h2>
              <p
                className="font-sans mb-8"
                style={{ fontSize: '14px', color: '#9CA3AF', maxWidth: '360px', lineHeight: 1.6 }}
              >
                Pregunta sobre normativa, sube un documento o pide un cálculo.
              </p>
              <p
                className="font-sans mb-3"
                style={{ fontSize: '11px', color: '#C4C4C4', letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                Consultas frecuentes
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" style={{ maxWidth: '600px' }}>
                {QUICK_SUGGESTIONS.map((s) => (
                  <button
                    key={s.text}
                    onClick={() => handleSend(s.text)}
                    className="text-left rounded-xl font-sans transition-all"
                    style={{
                      border: '1px solid #E5E7EB',
                      background: 'white',
                      cursor: 'pointer',
                      padding: '14px 16px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0,181,173,0.4)';
                      e.currentTarget.style.backgroundColor = 'rgba(0,181,173,0.03)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span style={{ color: '#00B5AD', flexShrink: 0, marginTop: '1px' }}>
                        {s.icon}
                      </span>
                      <div className="flex flex-col gap-1 min-w-0">
                        <span
                          className="font-sans font-medium"
                          style={{ fontSize: '11px', color: '#00B5AD', letterSpacing: '0.06em', textTransform: 'uppercase' }}
                        >
                          {s.tag}
                        </span>
                        <span style={{ fontSize: '13px', color: '#374151', lineHeight: 1.5 }}>
                          {s.text}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-[740px] mx-auto px-4 md:px-6 py-5 md:py-8">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isStreaming={msg.id === streamingMsgId}
                  onFeedback={msg.role === 'assistant' ? (r) => handleFeedback(msg.id, r) : undefined}
                  feedbackRating={feedbackMap[msg.id] ?? null}
                />
              ))}

              {/* Search status */}
              {toolStatus && (
                <div className="flex gap-3 mb-6">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#0D2E35', marginTop: '2px' }}
                  >
                    <span style={{ fontSize: '9px', fontWeight: 700, color: '#00B5AD', fontFamily: 'var(--font-playfair), serif', fontStyle: 'italic' }}>vi</span>
                  </div>
                  <div
                    className="flex items-center gap-2 font-sans"
                    style={{
                      backgroundColor: 'rgba(0,181,173,0.08)',
                      border: '1px solid rgba(0,181,173,0.25)',
                      borderRadius: '10px',
                      padding: '8px 14px',
                      fontSize: '13px',
                      color: '#5F5E5A',
                    }}
                  >
                    <svg className="animate-spin flex-shrink-0" width="13" height="13" fill="none" stroke="#00B5AD" strokeWidth="2.5" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0110 10" />
                    </svg>
                    <span style={{ color: '#00B5AD', fontWeight: 500 }}>Consultando</span>
                    <span style={{ color: '#9CA3AF' }} className="truncate">· {toolStatus}</span>
                  </div>
                </div>
              )}

              {/* Typing dots */}
              {isLoading && streamingMsgId === null && !toolStatus && (
                <div className="flex gap-3 mb-6">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#0D2E35', marginTop: '2px' }}
                  >
                    <span style={{ fontSize: '9px', fontWeight: 700, color: '#00B5AD', fontFamily: 'var(--font-playfair), serif', fontStyle: 'italic' }}>vi</span>
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

      {/* Right panel — Sources (lg+ only, only when there are messages) */}
      {messages.length > 0 && (
        <SourcesPanel
          sources={consultedSources}
          onSuggestionClick={(text) => handleSend(text)}
        />
      )}
    </div>
  );
}
