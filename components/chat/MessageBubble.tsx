'use client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachedFile?: { name: string; type: string; base64: string };
}

export default function MessageBubble({
  message,
  isStreaming = false,
  onFeedback,
  feedbackRating,
}: {
  message: Message;
  isStreaming?: boolean;
  onFeedback?: (rating: 'up' | 'down') => void;
  feedbackRating?: 'up' | 'down' | null;
}) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  if (isUser) {
    return (
      <div className="flex justify-end mb-6">
        <div style={{ maxWidth: '75%' }}>
          {message.attachedFile && (
            <div
              className="flex items-center gap-2 mb-1.5 px-3 py-1 rounded-full font-sans text-xs ml-auto w-fit"
              style={{
                background: 'rgba(0,42,58,0.08)',
                color: '#0D2E35',
              }}
            >
              <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              {message.attachedFile.name}
            </div>
          )}
          <div
            className="font-sans"
            style={{
              backgroundColor: '#F4F4F4',
              color: '#1a1a1a',
              borderRadius: '18px',
              padding: '12px 18px',
              fontSize: '15px',
              lineHeight: 1.65,
              whiteSpace: 'pre-wrap',
            }}
          >
            {message.content}
          </div>
        </div>
      </div>
    );
  }

  // Assistant message — Claude.ai style: avatar + plain text, no bubble
  return (
    <div className="flex gap-3 mb-8 group">
      {/* BA avatar */}
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          backgroundColor: '#0D2E35',
          marginTop: '2px',
        }}
      >
        <span
          style={{
            fontSize: '9px',
            fontWeight: 700,
            color: '#00B5AD',
            fontFamily: 'Lora, Georgia, serif',
            letterSpacing: '0.02em',
          }}
        >
          BA
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div
          className="prose-fiscal"
          style={{ fontSize: '15px', lineHeight: 1.75, color: '#1a1a1a', minWidth: 0, overflowWrap: 'break-word', wordBreak: 'break-word' }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              table: ({ children }) => (
                <div className="table-wrapper">
                  <table>{children}</table>
                </div>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#00B5AD', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  {children}
                </a>
              ),
            }}
          >{message.content}</ReactMarkdown>
          {isStreaming && (
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '15px',
                backgroundColor: '#0D2E35',
                marginLeft: '2px',
                verticalAlign: 'middle',
                animation: 'blink-cursor 0.8s step-end infinite',
              }}
            />
          )}
        </div>

        {/* Actions — visible on hover */}
        {!isStreaming && (
          <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md font-sans transition-colors hover:bg-gray-100"
              style={{ fontSize: '12px', color: '#5F5E5A', background: 'none', border: 'none', cursor: 'pointer' }}
              title="Copiar respuesta"
            >
              {copied ? (
                <span style={{ color: '#22c55e' }}>✓ Copiado</span>
              ) : (
                <>
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copiar
                </>
              )}
            </button>

            {onFeedback && (
              <>
                <div style={{ width: '1px', height: '14px', backgroundColor: '#E5E7EB', margin: '0 2px' }} />
                <button
                  onClick={() => onFeedback('up')}
                  className="flex items-center gap-1 px-2 py-1 rounded-md font-sans transition-colors hover:bg-gray-100"
                  style={{
                    fontSize: '12px',
                    background: 'none',
                    border: 'none',
                    cursor: feedbackRating ? 'default' : 'pointer',
                    color: feedbackRating === 'up' ? '#16a34a' : '#9CA3AF',
                    fontWeight: feedbackRating === 'up' ? 600 : 400,
                  }}
                  title="Buena respuesta"
                  disabled={!!feedbackRating}
                >
                  👍
                </button>
                <button
                  onClick={() => onFeedback('down')}
                  className="flex items-center gap-1 px-2 py-1 rounded-md font-sans transition-colors hover:bg-gray-100"
                  style={{
                    fontSize: '12px',
                    background: 'none',
                    border: 'none',
                    cursor: feedbackRating ? 'default' : 'pointer',
                    color: feedbackRating === 'down' ? '#dc2626' : '#9CA3AF',
                    fontWeight: feedbackRating === 'down' ? 600 : 400,
                  }}
                  title="Respuesta mejorable"
                  disabled={!!feedbackRating}
                >
                  👎
                </button>
                {feedbackRating && (
                  <span className="font-sans" style={{ fontSize: '11px', color: '#9CA3AF', marginLeft: '2px' }}>
                    {feedbackRating === 'up' ? 'Gracias' : 'Anotado para mejorar'}
                  </span>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
