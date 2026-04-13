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
      {/* Header */}
      <div
        style={{ padding: '14px 16px 12px', borderBottom: '1px solid #E5E7EB', flexShrink: 0 }}
      >
        <p
          className="font-sans"
          style={{ fontSize: '12px', fontWeight: 600, color: '#0D2E35' }}
        >
          Panel de contexto
        </p>
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

    </aside>
  );
}
