'use client';
import { useRef, useEffect, useState } from 'react';

interface InputBarProps {
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
  onStop: () => void;
  isLoading: boolean;
  attachedFile: File | null;
  onFileAttach: (file: File) => void;
  onFileRemove: () => void;
}

export default function InputBar({
  input,
  setInput,
  onSend,
  onStop,
  isLoading,
  attachedFile,
  onFileAttach,
  onFileRemove,
}: InputBarProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
  }, [input]);

  useEffect(() => {
    if (!attachedFile || !attachedFile.type.startsWith('image/')) {
      setPreviewUrl(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(attachedFile);
  }, [attachedFile]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = Array.from(e.clipboardData.items);
    const imageItem = items.find((item) => item.type.startsWith('image/'));
    if (imageItem) {
      e.preventDefault();
      const file = imageItem.getAsFile();
      if (file) {
        const ext = file.type.split('/')[1] || 'png';
        const named = new File([file], `captura-${Date.now()}.${ext}`, { type: file.type });
        onFileAttach(named);
      }
    }
  };

  const canSend = (input.trim().length > 0 || attachedFile !== null) && !isLoading;

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderTop: '1px solid #E5E7EB',
        boxShadow: '0 -2px 12px rgba(0,0,0,0.04)',
        flexShrink: 0,
      }}
    >
      <div
        className="px-3 md:px-5 pt-3"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)' }}
      >
        <div style={{ maxWidth: '740px', margin: '0 auto' }}>
          {/* File preview */}
          {attachedFile && (
            <div className="mb-2 flex">
              {attachedFile.type.startsWith('image/') && previewUrl ? (
                <div className="relative" style={{ display: 'inline-block' }}>
                  <img
                    src={previewUrl}
                    alt={attachedFile.name}
                    style={{
                      height: '80px',
                      maxWidth: '200px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      border: '1px solid #E5E7EB',
                      display: 'block',
                    }}
                  />
                  <button
                    onClick={onFileRemove}
                    className="flex items-center justify-center"
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-6px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: '#0D2E35',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '11px',
                      lineHeight: 1,
                    }}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl font-sans"
                  style={{
                    background: attachedFile.name.endsWith('.docx') ? 'rgba(37,99,235,0.06)' : 'rgba(0,181,173,0.08)',
                    border: attachedFile.name.endsWith('.docx') ? '1px solid rgba(37,99,235,0.25)' : '1px solid rgba(0,181,173,0.3)',
                    color: '#0D2E35',
                    fontSize: '12px',
                    maxWidth: '260px',
                  }}
                >
                  {attachedFile.name.endsWith('.docx') ? (
                    <svg width="18" height="18" fill="none" stroke="#2563EB" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" fill="none" stroke="#00B5AD" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  <div className="flex flex-col min-w-0">
                    <span style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {attachedFile.name}
                    </span>
                    <span style={{ fontSize: '10px', color: '#9ca3af' }}>
                      {(attachedFile.size / 1024).toFixed(0)} KB
                    </span>
                  </div>
                  <button
                    onClick={onFileRemove}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', lineHeight: 1, padding: 0, flexShrink: 0 }}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Input pill */}
          <div
            className="flex items-end gap-2"
            style={{
              border: '1px solid #E5E7EB',
              borderRadius: '16px',
              backgroundColor: 'white',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              padding: '12px 12px 12px 18px',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onFocusCapture={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,181,173,0.5)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.06), 0 0 0 3px rgba(0,181,173,0.08)';
            }}
            onBlurCapture={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
            }}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              placeholder="Escribe tu consulta..."
              rows={1}
              className="flex-1 font-sans resize-none outline-none bg-transparent"
              style={{
                fontSize: '16px',
                color: '#1a1a1a',
                lineHeight: '24px',
                border: 'none',
                padding: 0,
              }}
            />

            {/* Right actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.webp,.docx"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onFileAttach(file);
                  e.target.value = '';
                }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-lg transition-colors"
                style={{ color: '#9ca3af', border: 'none', background: 'none', cursor: 'pointer' }}
                title="Adjuntar documento"
                onMouseEnter={(e) => (e.currentTarget.style.color = '#0D2E35')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>

              {isLoading ? (
                <button
                  onClick={onStop}
                  className="flex items-center justify-center rounded-xl transition-all"
                  title="Detener respuesta"
                  style={{
                    backgroundColor: '#EF4444',
                    color: 'white',
                    width: '36px',
                    height: '36px',
                    border: 'none',
                    cursor: 'pointer',
                    flexShrink: 0,
                    boxShadow: '0 2px 10px rgba(239,68,68,0.35)',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#DC2626')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#EF4444')}
                >
                  <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={onSend}
                  disabled={!canSend}
                  className="flex items-center justify-center rounded-xl transition-all"
                  style={{
                    backgroundColor: canSend ? '#00B5AD' : '#E5E7EB',
                    color: canSend ? 'white' : '#C4C4C4',
                    width: '36px',
                    height: '36px',
                    border: 'none',
                    cursor: canSend ? 'pointer' : 'default',
                    flexShrink: 0,
                    boxShadow: canSend ? '0 2px 10px rgba(0,181,173,0.40)' : 'none',
                    transition: 'background-color 0.15s, box-shadow 0.15s',
                  }}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <p className="hidden md:block text-center font-sans mt-2" style={{ fontSize: '11px', color: '#9ca3af' }}>
            Enter para enviar · Shift+Enter para nueva línea · Pega capturas con Ctrl+V
          </p>
        </div>
      </div>
    </div>
  );
}
