const limits = [
  'No emite asesoramiento definitivo — sus respuestas son orientación técnica sujeta a revisión y criterio profesional',
  'No inventa normativa — cuando hay incertidumbre lo indica explícitamente y recomienda solicitar consulta vinculante a la DGT',
  'No sustituye al asesor — es una herramienta de apoyo que multiplica la capacidad del equipo, no que la reemplaza',
];

export default function Limits() {
  return (
    <section
      className="px-6"
      style={{
        backgroundColor: 'rgba(0,181,173,0.06)',
        borderTop: '1px solid rgba(0,181,173,0.2)',
        paddingTop: '56px',
        paddingBottom: '56px',
      }}
    >
      <div className="max-w-3xl mx-auto">
        <p
          className="font-sans font-medium mb-6"
          style={{ fontSize: '14px', color: '#0D2E35' }}
        >
          Recuerda: lo que el agente no hace
        </p>
        <div className="flex flex-col gap-4">
          {limits.map((text) => (
            <div key={text} className="flex items-start gap-4">
              <div
                className="flex-shrink-0 rounded-full mt-1"
                style={{
                  width: '18px',
                  height: '18px',
                  border: '1.5px solid #00B5AD',
                  minWidth: '18px',
                }}
              />
              <p className="font-sans" style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.65 }}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
