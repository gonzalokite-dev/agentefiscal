const capabilities = [
  {
    title: 'Análisis documental',
    description:
      'Facturas, contratos, escrituras y nóminas. Extrae datos fiscalmente relevantes y verifica su corrección formal y material.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Consultas técnicas',
    description:
      'IRPF, IVA, IS, IRNR, ITP, Sucesiones. Respuestas técnicas fundamentadas en normativa y doctrina de la DGT.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    ),
  },
  {
    title: 'Cálculos fiscales',
    description:
      'Cuotas IRPF, plusvalías, retenciones, ITP. Proceso desglosado paso a paso, auditable por el asesor.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Borradores de escritos',
    description:
      'Recursos de reposición, alegaciones, consultas a la DGT y comunicaciones con la AEAT.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    title: 'Modelos tributarios',
    description:
      'Referencia inmediata de plazos, obligaciones derivadas y modelos para cada operación.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Normativa balear',
    description:
      'ITP, ISD, pactos sucesorios baleares, ecotasa y deducciones autonómicas de Illes Balears.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
];

export default function Capabilities() {
  return (
    <section id="capacidades" className="py-20 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <p
              className="font-sans font-medium"
              style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#EAAA00', textTransform: 'uppercase' }}
            >
              Capacidades
            </p>
            <div style={{ width: '40px', height: '4px', backgroundColor: '#EAAA00', borderRadius: '2px' }} />
          </div>
          <h2 className="font-serif font-semibold mb-2" style={{ fontSize: '32px', color: '#002A3A' }}>
            ¿Qué puede hacer el agente?
          </h2>
          <p className="font-sans" style={{ fontSize: '15px', color: '#5F5E5A' }}>
            Especializado en las operaciones más frecuentes del despacho.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="p-6 rounded-xl"
              style={{ border: '1px solid #E2DED9' }}
            >
              <div className="mb-3" style={{ color: '#002A3A' }}>
                {cap.icon}
              </div>
              <h3 className="font-sans font-medium mb-2" style={{ fontSize: '15px', color: '#002A3A' }}>
                {cap.title}
              </h3>
              <p className="font-sans" style={{ fontSize: '14px', color: '#5F5E5A', lineHeight: 1.6 }}>
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
