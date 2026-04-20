'use client';

export interface SourceEntry {
  id: string;
  source: string;
  query: string;
  urls?: Array<{ title: string; url: string }>;
}

interface Props {
  sources: SourceEntry[];
  onSuggestionClick: (text: string) => void;
}

const NEXT_STEPS = [
  '¿Existe alguna deducción adicional aplicable?',
  '¿Cuáles son los plazos de presentación?',
  'Redacta un resumen ejecutivo para mi cliente',
];

function sourceConfig(source: string): { color: string; bg: string; border: string; abbr: string } {
  const s = source.toUpperCase();
  if (s.includes('DGT')) return { color: '#00B5AD', bg: 'rgba(0,181,173,0.07)', border: 'rgba(0,181,173,0.2)', abbr: 'DGT' };
  if (s.includes('AEAT')) return { color: '#EF4444', bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.18)', abbr: 'AEAT' };
  if (s.includes('BOE')) return { color: '#1E3A5F', bg: 'rgba(30,58,95,0.06)', border: 'rgba(30,58,95,0.15)', abbr: 'BOE' };
  return { color: '#6B7280', bg: 'rgba(107,114,128,0.06)', border: 'rgba(107,114,128,0.15)', abbr: source.slice(0, 4).toUpperCase() };
}

export default function SourcesPanel({ sources, onSuggestionClick }: Props) {
  return (
    <aside
      className="hidden lg:flex flex-col h-full"
      style={{
        width: '260px',
        minWidth: '260px',
        backgroundColor: '#FFFFFF',
        borderLeft: '1px solid #E5E7EB',
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <div style={{ padding: '14px 16px 12px', borderBottom: '1px solid #F3F4F6', flexShrink: 0 }}>
        <div className="flex items-center gap-2">
          <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="font-sans font-semibold" style={{ fontSize: '12px', color: '#374151' }}>
            Panel de contexto
          </p>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '16px' }}>

        {/* Sources section */}
        <div className="flex items-center gap-1.5 mb-3">
          <p
            className="font-sans"
            style={{ fontSize: '10px', color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}
          >
            Fuentes consultadas
          </p>
          {sources.length > 0 && (
            <span
              className="font-sans font-semibold"
              style={{
                fontSize: '10px',
                backgroundColor: 'rgba(0,181,173,0.1)',
                color: '#00B5AD',
                borderRadius: '9999px',
                padding: '1px 6px',
              }}
            >
              {sources.length}
            </span>
          )}
        </div>

        {sources.length === 0 ? (
          <div
            style={{
              border: '1px dashed #E5E7EB',
              borderRadius: '10px',
              padding: '16px',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            <p className="font-sans" style={{ fontSize: '12px', color: '#C4C4C4', fontStyle: 'italic', lineHeight: 1.5 }}>
              Las fuentes aparecerán aquí cuando Victoria realice búsquedas
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {sources.map((entry) => {
              const cfg = sourceConfig(entry.source);
              return (
                <div
                  key={entry.id}
                  className="font-sans"
                  style={{
                    borderRadius: '10px',
                    padding: '10px 12px',
                    backgroundColor: cfg.bg,
                    border: `1px solid ${cfg.border}`,
                  }}
                >
                  <div className="flex items-center gap-2" style={{ marginBottom: '5px' }}>
                    <span
                      className="font-sans font-bold"
                      style={{
                        fontSize: '9px',
                        letterSpacing: '0.06em',
                        color: cfg.color,
                        backgroundColor: `${cfg.color}18`,
                        border: `1px solid ${cfg.color}30`,
                        padding: '2px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      {cfg.abbr}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#4B5563',
                      lineHeight: 1.45,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      margin: 0,
                    }}
                  >
                    {entry.query}
                  </p>
                  {entry.urls && entry.urls.length > 0 && (
                    <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {entry.urls.map((u) => (
                        <a
                          key={u.url}
                          href={u.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-sans flex items-start gap-1.5"
                          style={{
                            fontSize: '11px',
                            color: cfg.color,
                            textDecoration: 'none',
                            lineHeight: 1.4,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                        >
                          <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '2px' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          {u.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Divider */}
        <div style={{ borderTop: '1px solid #F3F4F6', marginBottom: '16px' }} />

        {/* Next steps section */}
        <p
          className="font-sans"
          style={{ fontSize: '10px', color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 600 }}
        >
          Siguientes pasos
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {NEXT_STEPS.map((step, i) => (
            <button
              key={step}
              onClick={() => onSuggestionClick(step)}
              className="font-sans text-left"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid #E5E7EB',
                background: 'white',
                cursor: 'pointer',
                fontSize: '12px',
                color: '#374151',
                lineHeight: 1.5,
                transition: 'border-color 0.15s, background-color 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,181,173,0.35)';
                e.currentTarget.style.backgroundColor = 'rgba(0,181,173,0.03)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,181,173,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span
                className="font-sans font-bold flex-shrink-0"
                style={{
                  fontSize: '10px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,181,173,0.1)',
                  color: '#00B5AD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '1px',
                }}
              >
                {i + 1}
              </span>
              <span>{step}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
