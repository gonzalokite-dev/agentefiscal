const cards = [
  {
    label: 'CONOCIMIENTO ACUMULADO',
    text: 'Las consultas, correcciones y criterios que el equipo va aportando enriquecen la base de conocimiento del agente de forma continua.',
  },
  {
    label: 'CRITERIO PROPIO DEL DESPACHO',
    text: 'El agente aprende cómo Benavides Asociados trata los supuestos habituales y adopta ese criterio cuando existe, antes de aplicar la norma general.',
  },
];

const flow = [
  { n: 1, title: 'Asesor consulta', desc: 'Formula una consulta o sube un documento' },
  { n: 2, title: 'Agente responde', desc: 'Aplica normativa y criterio acumulado' },
  { n: 3, title: 'Equipo corrige', desc: 'Valida, ajusta o enriquece la respuesta' },
  { n: 4, title: 'Agente mejora', desc: 'El criterio se incorpora al conocimiento base' },
];

export default function KnowledgeLoop() {
  return (
    <section
      className="py-20 px-6"
      style={{
        background:
          'radial-gradient(ellipse at 20% 80%, rgba(234,170,0,0.08) 0%, transparent 50%), #002A3A',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '1100px' }}>
        <p
          className="font-sans font-medium mb-3"
          style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#EAAA00', textTransform: 'uppercase' }}
        >
          Herramienta viva
        </p>
        <h2
          className="font-sans font-bold text-white mb-3"
          style={{ fontSize: '40px', lineHeight: 1.1, letterSpacing: '-0.025em' }}
        >
          Un agente que crece con el despacho
        </h2>
        <p
          className="font-sans mb-12"
          style={{ fontSize: '16px', color: '#D7D2CB', maxWidth: '520px', lineHeight: 1.7 }}
        >
          Cada asesor que trabaja con él lo hace más preciso y útil para todo el equipo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {cards.map((card) => (
            <div
              key={card.label}
              className="knowledge-card p-6 rounded-xl"
              style={{
                border: '1px solid rgba(215,210,203,0.15)',
                backgroundColor: 'rgba(255,255,255,0.05)',
              }}
            >
              <p
                className="font-sans font-medium mb-3"
                style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#EAAA00' }}
              >
                {card.label}
              </p>
              <p className="font-sans text-white" style={{ fontSize: '14px', lineHeight: 1.65 }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            backgroundColor: 'rgba(215,210,203,0.12)',
            marginBottom: '36px',
          }}
        />

        {/* Flow steps */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-2 mb-8">
          {flow.map((step, idx) => (
            <div
              key={step.title}
              className="flex md:flex-row flex-col items-start md:items-center gap-2 flex-1"
            >
              <div
                className="flex-1 p-4 rounded-xl"
                style={{
                  border: '1px solid rgba(215,210,203,0.15)',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(234,170,0,0.2)',
                    }}
                  >
                    <span
                      className="font-sans font-bold"
                      style={{ fontSize: '9px', color: '#EAAA00' }}
                    >
                      {step.n}
                    </span>
                  </div>
                  <p
                    className="font-sans font-medium text-white"
                    style={{ fontSize: '13px' }}
                  >
                    {step.title}
                  </p>
                </div>
                <p className="font-sans" style={{ fontSize: '12px', color: '#D7D2CB', paddingLeft: '26px' }}>
                  {step.desc}
                </p>
              </div>
              {idx < flow.length - 1 && (
                <span
                  className="font-sans font-bold hidden md:block"
                  style={{ color: '#EAAA00', fontSize: '18px', flexShrink: 0 }}
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Note */}
        <div
          className="rounded-lg p-4 font-sans"
          style={{
            background: 'rgba(234,170,0,0.08)',
            border: '1px solid rgba(234,170,0,0.3)',
            fontSize: '13px',
            color: '#D7D2CB',
            lineHeight: 1.7,
          }}
        >
          El system prompt del agente se actualiza periódicamente con nuevas consultas vinculantes de la DGT, cambios
          normativos y criterios internos validados por el equipo. Cualquier asesor puede proponer mejoras al
          responsable del sistema.
        </div>
      </div>
    </section>
  );
}
