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

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    const lineH = 24;
    const maxH = lineH * 5 + 24;
    ta.style.height = Math.min(ta.scrollHeight, maxH) + 'px';
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const canSend = (input.trim().length > 0 || attachedFile !== null) && !isLoading;

  return (
    <div
      className="flex flex-col gap-2"
      style={{
        borderTop: '1px solid #E2DED9',
        backgroundColor: 'white',
        padding: '20px 32px',
      }}
    >
      {/* File chip */}
      {attachedFile && (
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full font-sans text-xs w-fit"
          style={{
            background: 'rgba(234,170,0,0.12)',
            border: '1px solid rgba(234,170,0,0.3)',
            color: '#002A3A',
          }}
        >
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
          <span>{attachedFile.name}</span>
          <button onClick={onFileRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5F5E5A', lineHeight: 1 }}>
            ×
          </button>
        </div>
      )}

      {/* Input row */}
      <div className="flex items-end gap-2">
        {/* Attach button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex-shrink-0 p-2 rounded-lg transition-colors hover:bg-gray-50"
          style={{ color: '#5F5E5A', border: 'none', background: 'none', cursor: 'pointer' }}
          title="Adjuntar documento"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

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

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu consulta o arrastra un documento..."
          rows={1}
          className="flex-1 font-sans resize-none outline-none"
          style={{
            border: '1px solid #E2DED9',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
            color: '#002A3A',
            lineHeight: '24px',
            transition: 'border-color 0.15s',
            backgroundColor: 'white',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#002A3A')}
          onBlur={(e) => (e.target.style.borderColor = '#E2DED9')}
        />

        {/* Send button */}
        <button
          onClick={onSend}
          disabled={!canSend}
          className="flex-shrink-0 flex items-center justify-center rounded-lg transition-opacity"
          style={{
            backgroundColor: '#EAAA00',
            color: '#002A3A',
            padding: '10px 16px',
            border: 'none',
            cursor: canSend ? 'pointer' : 'default',
            opacity: canSend ? 1 : 0.4,
          }}
        >
          {isLoading ? (
            <svg
              className="animate-spin"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 0110 10" />
            </svg>
          ) : (
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
