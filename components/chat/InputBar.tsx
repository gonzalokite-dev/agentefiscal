'use client';
import { useRef, useEffect } from 'react';

interface InputBarProps {
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
  isLoading: boolean;
  attachedFile: File | null;
  onFileAttach: (file: File) => void;
  onFileRemove: () => void;
}

export default function InputBar({
  input,
  setInput,
  onSend,
  isLoading,
  attachedFile,
  onFileAttach,
  onFileRemove,
}: InputBarProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
  }, [input]);

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
        // Give it a readable name based on timestamp
        const ext = file.type.split('/')[1] || 'png';
        const named = new File([file], `captura-${Date.now()}.${ext}`, { type: file.type });
        onFileAttach(named);
      }
    }
  };

  const canSend = (input.trim().length > 0 || attachedFile !== null) && !isLoading;

  return (
    <div
      className="px-4 pb-6 pt-2"
      style={{ backgroundColor: 'white' }}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* File chip */}
        {attachedFile && (
          <div className="mb-2 flex">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full font-sans text-xs"
              style={{
                background: 'rgba(234,170,0,0.1)',
                border: '1px solid rgba(234,170,0,0.3)',
                color: '#002A3A',
              }}
            >
              {attachedFile.type.startsWith('image/') ? (
                <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              ) : (
                <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              )}
              <span>{attachedFile.name}</span>
              <button
                onClick={onFileRemove}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5F5E5A', lineHeight: 1, padding: 0 }}
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Input pill */}
        <div
          className="flex items-end gap-2"
          style={{
            border: '1px solid #E2DED9',
            borderRadius: '16px',
            backgroundColor: 'white',
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
            padding: '10px 10px 10px 16px',
            transition: 'border-color 0.15s, box-shadow 0.15s',
          }}
          onFocus={() => {}}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            placeholder="Escribe tu consulta o arrastra un documento..."
            rows={1}
            className="flex-1 font-sans resize-none outline-none bg-transparent"
            style={{
              fontSize: '15px',
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
              accept=".pdf,.png,.jpg,.jpeg,.webp"
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
              onMouseEnter={(e) => (e.currentTarget.style.color = '#002A3A')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>

            <button
              onClick={onSend}
              disabled={!canSend}
              className="flex items-center justify-center rounded-xl transition-all"
              style={{
                backgroundColor: canSend ? '#002A3A' : '#E2DED9',
                color: canSend ? 'white' : '#9ca3af',
                width: '34px',
                height: '34px',
                border: 'none',
                cursor: canSend ? 'pointer' : 'default',
                flexShrink: 0,
              }}
            >
              {isLoading ? (
                <svg className="animate-spin" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0110 10" />
                </svg>
              ) : (
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <p className="text-center font-sans mt-2" style={{ fontSize: '11px', color: '#9ca3af' }}>
          Enter para enviar · Shift+Enter para nueva línea · Pega capturas con Ctrl+V
        </p>
      </div>
    </div>
  );
}
