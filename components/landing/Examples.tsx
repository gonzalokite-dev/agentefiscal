const examples = [
  '¿Un no residente alemán tiene que presentar Modelo 210 por su piso en Palma?',
  'Analiza esta factura intracomunitaria de servicios de software',
  'Calcula la retención en esta transmisión inmobiliaria de no residente',
  '¿Qué reducción aplica en ISD para un hijo residente en Baleares?',
  'Redacta las alegaciones para esta comprobación limitada de IVA',
  '¿Cuándo tributa el alquiler turístico como actividad económica en IRPF?',
];

export default function Examples() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#F7F6F4' }}>
      <div className="mx-auto" style={{ maxWidth: '900px' }}>
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="font-sans font-medium mb-3"
            style={{
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: '#EAAA00',
              textTransform: 'uppercase',
            }}
          >
            Consultas frecuentes
          </p>
          <h2
            className="font-sans font-bold mb-3"
            style={{ fontSize: '36px', color: '#002A3A', lineHeight: 1.1, letterSpacing: '-0.025em' }}
          >
            Consultas del día a día
          </h2>
          <p className="font-sans" style={{ fontSize: '15px', color: '#5F5E5A' }}>
            Preguntas reales que el equipo formula al agente cada semana.
          </p>
        </div>

        {/* Pills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
          {examples.map((text, idx) => (
            <a
              key={text}
              href={`/chat?q=${encodeURIComponent(text)}`}
              className="flex items-center gap-3 px-5 py-3 rounded-full font-sans bg-white transition-all hover:border-amber-300 hover:shadow-sm"
              style={{ border: '1px solid #E2DED9', textDecoration: 'none' }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(234,170,0,0.15)',
                }}
              >
                <span
                  className="font-sans font-bold"
                  style={{ fontSize: '10px', color: '#002A3A' }}
                >
                  {idx + 1}
                </span>
              </div>
              <span style={{ fontSize: '14px', color: '#002A3A', flex: 1 }}>{text}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EAAA00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          ))}
        </div>

        {/* CTA banner */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 rounded-2xl"
          style={{ backgroundColor: '#002A3A' }}
        >
          <div>
            <p className="font-sans font-medium text-white" style={{ fontSize: '15px', marginBottom: '4px' }}>
              ¿Tienes una consulta urgente?
            </p>
            <p className="font-sans" style={{ fontSize: '13px', color: '#D7D2CB' }}>
              Formula tu pregunta al agente ahora mismo
            </p>
          </div>
          <a
            href="/chat"
            className="font-sans font-medium flex-shrink-0 transition-opacity hover:opacity-90"
            style={{
              backgroundColor: '#EAAA00',
              color: '#002A3A',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Consultar ahora →
          </a>
        </div>
      </div>
    </section>
  );
}
