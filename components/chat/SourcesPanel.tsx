'use client';

export interface SourceEntry {
  id: string;
  source: string;
  query: string;
}

interface Props {
  sources: SourceEntry[];
  onSuggestionClick: (text: string) => void;
}

const NEXT_STEPS = [
  '¿Existe alguna deducción adicional aplicable en este caso?',
  '¿Cuáles son los plazos de presentación?',
  'Redacta un resumen ejecutivo para mi cliente',
];

function sourceDotColor(source: string): string {
  const s = source.toUpperCase();
  if (s.includes('DGT')) return '#00B5AD';
  if (s.includes('AEAT')) return '#EF4444';
  if (s.includes('BOE')) return '#1E3A5F';
  return '#6B7280';
}

function sourceCardStyle(source: string): React.CSSProperties {
  const s = source.toUpperCase();
  if (s.includes('DGT')) {
    return {
      backgroundColor: 'rgba(0,181,173,0.06)',
      borderLeft: '3px solid #00B5AD',
    };
  }
  if (s.includes('AEAT')) {
    return {
      backgroundColor: 'rgba(239,68,68,0.05)',
      borderLeft: '3px solid #EF4444',
    };
  }
  if (s.includes('BOE')) {
    return {
      backgroundColor: 'rgba(30,58,95,0.05)',
      borderLeft: '3px solid #1E3A5F',
    };
  }
  return {
    backgroundColor: 'rgba(107,114,128,0.05)',
    borderLeft: '3px solid #6B7280',
  };
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
      {/* Tabs */}
      <div
        className="flex items-center"
        style={{ borderBottom: '1px solid #E5E7EB', padding: '0 16px', flexShrink: 0 }}
      >
        {['Fuentes', 'Tareas', 'Plantillas'].map((tab, i) => (
          <button
            key={tab}
            className="font-sans"
            style={{
              padding: '12px 12px',
              fontSize: '12px',
              fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? '#00B5AD' : '#9CA3AF',
              background: 'none',
              border: 'none',
              cursor: i === 0 ? 'pointer' : 'default',
              borderBottom: i === 0 ? '2px solid #00B5AD' : '2px solid transparent',
              marginBottom: '-1px',
              transition: 'color 0.15s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '16px' }}>
        {/* Sources section */}
        <p
          className="font-sans"
          style={{
            fontSize: '10px',
            color: '#9CA3AF',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '10px',
            fontWeight: 600,
          }}
        >
          Fuentes consultadas
        </p>

        {sources.length === 0 ? (
          <p
            className="font-sans"
            style={{ fontSize: '12px', color: '#D1D5DB', fontStyle: 'italic', marginBottom: '20px' }}
          >
            Las fuentes aparecerán aquí cuando Victoria realice búsquedas.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {sources.map((entry) => (
              <div
                key={entry.id}
                className="font-sans"
                style={{
                  borderRadius: '8px',
                  padding: '10px 12px',
                  ...sourceCardStyle(entry.source),
                }}
              >
                <div className="flex items-center gap-2" style={{ marginBottom: '4px' }}>
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: sourceDotColor(entry.source),
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#0D2E35',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {entry.source}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '11px',
                    color: '#6B7280',
                    lineHeight: 1.4,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    margin: 0,
                  }}
                >
                  {entry.query}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Next steps section */}
        <p
          className="font-sans"
          style={{
            fontSize: '10px',
            color: '#9CA3AF',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '10px',
            fontWeight: 600,
          }}
        >
          Siguientes pasos
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {NEXT_STEPS.map((step) => (
            <button
              key={step}
              onClick={() => onSuggestionClick(step)}
              className="font-sans text-left"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                background: 'white',
                cursor: 'pointer',
                fontSize: '12px',
                color: '#374151',
                lineHeight: 1.5,
                transition: 'border-color 0.15s, background-color 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,181,173,0.4)';
                e.currentTarget.style.backgroundColor = 'rgba(0,181,173,0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <span style={{ color: '#00B5AD', flexShrink: 0, marginTop: '1px', fontSize: '13px' }}>→</span>
              <span>{step}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom hint */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid #E5E7EB',
          flexShrink: 0,
        }}
      >
        <div className="flex items-center gap-2">
          <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="font-sans" style={{ fontSize: '11px', color: '#9CA3AF' }}>
            ¿Te lo envío al buzón?
          </span>
        </div>
      </div>
    </aside>
  );
}
