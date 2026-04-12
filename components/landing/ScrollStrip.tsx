const items = [
  { label: 'BOE en tiempo real', dot: '#22c55e' },
  { label: 'Consultas DGT vinculantes', dot: '#00B5AD' },
  { label: 'ITP · Illes Balears', dot: '#00B5AD' },
  { label: 'Pactos sucesorios baleares', dot: '#00B5AD' },
  { label: 'Recursos de reposición', dot: '#00B5AD' },
  { label: 'IRPF · Ganancias patrimoniales', dot: '#00B5AD' },
  { label: 'AEAT · Expedientes', dot: '#00B5AD' },
  { label: 'IVA · Deducciones', dot: '#00B5AD' },
  { label: 'IS · Bases imponibles', dot: '#00B5AD' },
  { label: 'IRNR · Retenciones no residentes', dot: '#00B5AD' },
  { label: 'Análisis de escrituras', dot: '#00B5AD' },
  { label: 'Cálculos auditables', dot: '#00B5AD' },
  { label: 'ISD · Sucesiones y Donaciones', dot: '#00B5AD' },
  { label: 'Plazos y modelos tributarios', dot: '#00B5AD' },
];

// Duplicate for seamless loop
const allItems = [...items, ...items];

export default function ScrollStrip() {
  return (
    <div
      className="strip-wrap"
      style={{
        backgroundColor: '#001D2B',
        borderTop: '1px solid rgba(0,181,173,0.12)',
        borderBottom: '1px solid rgba(0,181,173,0.12)',
        padding: '14px 0',
      }}
    >
      <div className="strip-track">
        {allItems.map((item, idx) => (
          <div
            key={idx}
            className="font-sans flex items-center gap-2 flex-shrink-0"
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: 'rgba(215,210,203,0.72)',
              letterSpacing: '0.01em',
              paddingLeft: '36px',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: item.dot,
                flexShrink: 0,
                opacity: 0.8,
              }}
            />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
