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
  { title: 'Asesor consulta', desc: 'Formula una consulta o sube un documento' },
  { title: 'Agente responde', desc: 'Aplica normativa y criterio acumulado' },
  { title: 'Equipo corrige', desc: 'Valida, ajusta o enriquece la respuesta' },
  { title: 'Agente mejora', desc: 'El criterio se incorpora al conocimiento base' },
];

export default function KnowledgeLoop() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#002A3A' }}>
      <div className="max-w-5xl mx-auto">
        <p
          className="font-sans font-medium mb-3"
          style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#EAAA00', textTransform: 'uppercase' }}
        >
          Herramienta viva
        </p>
        <h2 className="font-serif font-semibold text-white mb-2" style={{ fontSize: '32px' }}>
          Un agente que crece con el despacho
        </h2>
        <p className="font-sans mb-10" style={{ fontSize: '15px', color: '#D7D2CB' }}>
          Cada asesor que trabaja con él lo hace más preciso y útil para todo el equipo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {cards.map((card) => (
            <div
              key={card.label}
              className="p-6 rounded-lg"
              style={{ border: '1px solid rgba(215,210,203,0.2)' }}
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

        {/* Flow */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-2 mb-8">
          {flow.map((step, idx) => (
            <div key={step.title} className="flex md:flex-row flex-col items-start md:items-center gap-2 flex-1">
              <div className="flex-1 p-4 rounded-lg" style={{ border: '1px solid rgba(215,210,203,0.15)', background: 'rgba(255,255,255,0.04)' }}>
                <p className="font-sans font-medium text-white" style={{ fontSize: '13px', marginBottom: '4px' }}>
                  {step.title}
                </p>
                <p className="font-sans" style={{ fontSize: '12px', color: '#D7D2CB' }}>
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
          className="rounded-md p-4 font-sans"
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
