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
      {/* Victoria avatar */}
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
            fontSize: '10px',
            fontWeight: 700,
            color: '#00B5AD',
            fontFamily: 'var(--font-playfair), "Playfair Display", serif',
            fontStyle: 'italic',
          }}
        >
          vi
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-sans font-semibold mb-1" style={{ fontSize: '12px', color: '#0D2E35', letterSpacing: '0.01em' }}>
          Victoria
        </p>
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
                  }}
                  title="Buena respuesta"
                  disabled={!!feedbackRating}
                >
                  <svg width="14" height="14" fill={feedbackRating === 'up' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                  </svg>
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
                  }}
                  title="Respuesta mejorable"
                  disabled={!!feedbackRating}
                >
                  <svg width="14" height="14" fill={feedbackRating === 'down' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                  </svg>
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
