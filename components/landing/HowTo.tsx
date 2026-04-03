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

export default function HowTo() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif font-semibold mb-2" style={{ fontSize: '32px', color: '#002A3A' }}>
          Cómo sacarle el máximo partido
        </h2>
        <p className="font-sans mb-10" style={{ fontSize: '15px', color: '#5F5E5A' }}>
          Tres buenas prácticas para obtener respuestas precisas.
        </p>

        <div className="flex flex-col gap-0">
          {steps.map((step, idx) => (
            <div key={step.n} className="flex gap-5">
              {/* Left: number + connector */}
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
                  <div style={{ width: '2px', flex: 1, backgroundColor: '#E2DED9', margin: '4px 0', minHeight: '40px' }} />
                )}
              </div>
              {/* Right: content */}
              <div className="pb-10">
                <h3 className="font-sans font-medium mb-1" style={{ fontSize: '16px', color: '#002A3A' }}>
                  {step.title}
                </h3>
                <p className="font-sans" style={{ fontSize: '14px', color: '#5F5E5A', lineHeight: 1.65 }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
