const steps = [
  {
    n: 1,
    title: 'Aporta contexto del contribuyente',
    description:
      'Indica si es persona física o jurídica, residente o no residente, y en qué comunidad autónoma tributa. Cuanto más contexto, más precisa y útil será la respuesta.',
  },
  {
    n: 2,
    title: 'Sube el documento directamente',
    description:
      'Arrastra facturas, contratos o escrituras al chat. El agente los analizará, extraerá los datos relevantes y verificará su corrección fiscal.',
  },
  {
    n: 3,
    title: 'Valida siempre antes de presentar',
    description:
      'Las respuestas son orientación técnica para profesionales. Todos los escritos generados son borradores que deben ser revisados y firmados por el asesor responsable.',
  },
];

const docTypes = [
  'Facturas (PDF, imagen)',
  'Escrituras de compraventa',
  'Contratos de arrendamiento',
  'Nóminas y certificados',
  'Modelos tributarios presentados',
  'Liquidaciones de la AEAT',
];

export default function HowTo() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
        style={{ maxWidth: '1100px' }}
      >
        {/* LEFT — steps */}
        <div>
          <p
            className="font-sans font-medium mb-3"
            style={{
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: '#EAAA00',
              textTransform: 'uppercase',
            }}
          >
            Cómo usarlo
          </p>
          <h2
            className="font-sans font-bold mb-3"
            style={{ fontSize: '40px', color: '#002A3A', lineHeight: 1.1, letterSpacing: '-0.025em' }}
          >
            Tres pasos para una respuesta perfecta
          </h2>
          <p
            className="font-sans mb-10"
            style={{ fontSize: '15px', color: '#5F5E5A', lineHeight: 1.7 }}
          >
            Buenas prácticas para obtener el máximo partido de cada consulta.
          </p>

          <div className="flex flex-col gap-0">
            {steps.map((step, idx) => (
              <div key={step.n} className="flex gap-5">
                {/* Number + connector */}
                <div className="flex flex-col items-center">
                  <div
                    className="flex items-center justify-center rounded-full font-sans font-semibold flex-shrink-0"
                    style={{
                      width: '36px',
                      height: '36px',
                      backgroundColor: step.n === 1 ? '#EAAA00' : '#002A3A',
                      color: step.n === 1 ? '#002A3A' : '#FFFFFF',
                      fontSize: '14px',
                    }}
                  >
                    {step.n}
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      style={{
                        width: '2px',
                        flex: 1,
                        borderLeft: '2px dashed rgba(0,42,58,0.15)',
                        margin: '4px 0',
                        minHeight: '48px',
                      }}
                    />
                  )}
                </div>
                {/* Content */}
                <div className="pb-10">
                  <h3
                    className="font-sans font-medium mb-1"
                    style={{ fontSize: '16px', color: '#002A3A' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-sans"
                    style={{ fontSize: '14px', color: '#5F5E5A', lineHeight: 1.65 }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — decorative card */}
        <div className="hidden lg:block">
          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: '#F7F6F4', border: '1px solid #E2DED9' }}
          >
            <p
              className="font-sans font-medium mb-4"
              style={{ fontSize: '13px', color: '#002A3A' }}
            >
              Tipos de documento admitidos
            </p>
            <div className="flex flex-col gap-3 mb-6">
              {docTypes.map((doc) => (
                <div key={doc} className="flex items-center gap-3">
                  <span
                    className="font-sans font-semibold flex-shrink-0"
                    style={{ fontSize: '14px', color: '#EAAA00' }}
                  >
                    ✓
                  </span>
                  <span
                    className="font-sans"
                    style={{ fontSize: '14px', color: '#002A3A' }}
                  >
                    {doc}
                  </span>
                </div>
              ))}
            </div>

            {/* Note box */}
            <div
              className="rounded-lg p-3 font-sans"
              style={{
                backgroundColor: 'rgba(234,170,0,0.08)',
                border: '1px solid rgba(234,170,0,0.2)',
                fontSize: '12px',
                color: '#5F5E5A',
                lineHeight: 1.65,
              }}
            >
              El agente extrae automáticamente todos los datos fiscalmente relevantes y alerta
              sobre posibles errores o incumplimientos.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
