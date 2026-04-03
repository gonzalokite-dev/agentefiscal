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
}: {
  message: Message;
  isStreaming?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const time = new Date(message.timestamp).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 group`}>
      <div style={{ maxWidth: isUser ? '70%' : '80%' }}>
        {/* File chip */}
        {message.attachedFile && (
          <div
            className="flex items-center gap-2 mb-2 px-3 py-1.5 rounded-full font-sans text-xs"
            style={{
              background: 'rgba(234,170,0,0.12)',
              border: '1px solid rgba(234,170,0,0.3)',
              color: '#002A3A',
              width: 'fit-content',
              marginLeft: isUser ? 'auto' : '0',
            }}
          >
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            {message.attachedFile.name}
          </div>
        )}

        {/* Bubble */}
        {isUser ? (
          <div
            className="font-sans"
            style={{
              backgroundColor: '#002A3A',
              color: 'white',
              borderRadius: '16px 16px 4px 16px',
              padding: '12px 16px',
              fontSize: '14px',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
            }}
          >
            {message.content}
          </div>
        ) : (
          <div className="relative">
            <div
              className="font-sans prose-fiscal"
              style={{
                backgroundColor: 'white',
                border: '1px solid #E2DED9',
                borderRadius: '16px 16px 16px 4px',
                padding: '16px 20px',
                fontSize: '14px',
                lineHeight: 1.65,
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
              {isStreaming && (
                <span
                  style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '14px',
                    backgroundColor: '#002A3A',
                    marginLeft: '2px',
                    verticalAlign: 'middle',
                    animation: 'blink-cursor 0.8s step-end infinite',
                  }}
                />
              )}
            </div>
            {/* Timestamp + copy */}
            <div className="flex items-center justify-between mt-1 px-1">
              <span style={{ fontSize: '11px', color: '#5F5E5A' }}>{isStreaming ? '' : time}</span>
              <button
                onClick={handleCopy}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ fontSize: '11px', color: '#5F5E5A', background: 'none', border: 'none', cursor: 'pointer' }}
                title="Copiar mensaje"
              >
                {copied ? '¡Copiado!' : (
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
