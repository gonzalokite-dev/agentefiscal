const CHECK = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="8" fill="#0D2E35" fillOpacity="0.08" />
    <path d="M4.5 8.5l2.5 2.5 4-5" stroke="#00B5AD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PARTIAL = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="8" fill="#F3F4F6" />
    <path d="M4.5 8h7" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const CROSS = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="8" fill="#FEF2F2" />
    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const rows = [
  {
    feature: 'Conectado a BOE, DGT y AEAT en tiempo real',
    hint: 'Consulta las fuentes oficiales en el momento de cada pregunta, no datos estáticos de entrenamiento',
    asesor: CHECK,
    manual: CROSS,
    chatgpt: CROSS,
  },
  {
    feature: 'Cita consultas vinculantes de la DGT',
    hint: null,
    asesor: CHECK,
    manual: PARTIAL,
    chatgpt: CROSS,
  },
  {
    feature: 'Normativa balear (ITP, ISD, pactos sucesorios)',
    hint: null,
    asesor: CHECK,
    manual: CROSS,
    chatgpt: CROSS,
  },
  {
    feature: 'Analiza documentos adjuntos (PDF, imágenes)',
    hint: null,
    asesor: CHECK,
    manual: CROSS,
    chatgpt: PARTIAL,
  },
  {
    feature: 'Redacta recursos y escritos a la AEAT',
    hint: null,
    asesor: CHECK,
    manual: CROSS,
    chatgpt: PARTIAL,
  },
  {
    feature: 'Indica cuando hay incertidumbre normativa',
    hint: null,
    asesor: CHECK,
    manual: PARTIAL,
    chatgpt: CROSS,
  },
  {
    feature: 'Disponible 24/7 sin esperas',
    hint: null,
    asesor: CHECK,
    manual: CROSS,
    chatgpt: CHECK,
  },
];

export default function Comparativa() {
  return (
    <section
      style={{ backgroundColor: '#F9FAFB', paddingTop: '96px', paddingBottom: '96px' }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p
            className="font-sans"
            style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#00B5AD', textTransform: 'uppercase', fontWeight: 600, marginBottom: '12px' }}
          >
            ¿Por qué Victoria?
          </p>
          <h2
            className="font-sans"
            style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, color: '#0D2E35', letterSpacing: '-0.03em', marginBottom: '14px', lineHeight: 1.15 }}
          >
            Conectado a las fuentes oficiales.<br />No a un modelo desactualizado.
          </h2>
          <p
            className="font-sans"
            style={{ fontSize: '16px', color: '#6B7280', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}
          >
            La diferencia clave frente a otras soluciones es la conexión directa con el BOE, la DGT y la AEAT —
            no respuestas generadas de memoria.
          </p>
        </div>

        {/* Table */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '1px solid #E5E7EB',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          {/* Column headers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 120px 120px 120px',
              borderBottom: '1px solid #E5E7EB',
              backgroundColor: '#F9FAFB',
            }}
          >
            <div style={{ padding: '14px 20px' }} />
            {/* Victoria header — highlighted */}
            <div
              style={{
                padding: '14px 8px',
                textAlign: 'center',
                backgroundColor: '#0D2E35',
                position: 'relative',
              }}
            >
              <img
                src="/logo-victoria-transparent.png"
                alt="victoria"
                style={{ height: '20px', width: 'auto', filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <div style={{ padding: '14px 8px', textAlign: 'center' }}>
              <span className="font-sans" style={{ fontSize: '12px', fontWeight: 600, color: '#9CA3AF' }}>
                Búsqueda manual
              </span>
            </div>
            <div style={{ padding: '14px 8px', textAlign: 'center' }}>
              <span className="font-sans" style={{ fontSize: '12px', fontWeight: 600, color: '#9CA3AF' }}>
                IA genérica
              </span>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 120px 120px 120px',
                borderBottom: i < rows.length - 1 ? '1px solid #F3F4F6' : 'none',
                alignItems: 'center',
              }}
            >
              {/* Feature name */}
              <div style={{ padding: '14px 20px' }}>
                <span
                  className="font-sans"
                  style={{
                    fontSize: '14px',
                    color: '#111827',
                    fontWeight: row.hint ? 600 : 400,
                    lineHeight: 1.4,
                  }}
                >
                  {row.feature}
                </span>
                {row.hint && (
                  <p className="font-sans" style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px', lineHeight: 1.5 }}>
                    {row.hint}
                  </p>
                )}
              </div>

              {/* Victoria cell — highlighted column */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '14px 8px',
                  backgroundColor: 'rgba(0,181,173,0.05)',
                  borderLeft: '1px solid rgba(0,181,173,0.15)',
                  borderRight: '1px solid rgba(0,181,173,0.15)',
                }}
              >
                {row.asesor}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '14px 8px' }}>
                {row.manual}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '14px 8px' }}>
                {row.chatgpt}
              </div>
            </div>
          ))}
        </div>

        {/* Source note */}
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          <p className="font-sans" style={{ fontSize: '12px', color: '#9CA3AF', lineHeight: 1.6 }}>
            La conexión en tiempo real con BOE, DGT y AEAT significa que Victoria siempre responde con la normativa vigente en el momento de la consulta.
          </p>
        </div>

      </div>
    </section>
  );
}
