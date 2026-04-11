const capabilities = [
  {
    title: 'Analiza una factura en 10 segundos',
    description:
      'Sube la factura y el agente extrae los datos fiscalmente relevantes, verifica su corrección formal y alerta sobre posibles errores.',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Responde al cliente antes de colgar',
    description:
      'IRPF, IVA, IS, IRNR, ITP, Sucesiones. Respuesta técnica fundamentada en DGT en tiempo real, lista en segundos.',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Cálculos auditables paso a paso',
    description:
      'Cuotas IRPF, plusvalías, retenciones, ITP. Cada operación desglosada y justificada, revisable por el asesor.',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Recurso redactado, tú solo firmas',
    description:
      'Recursos de reposición, alegaciones, consultas a la DGT y comunicaciones con la AEAT listos para revisar.',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    title: 'Plazos y modelos sin buscar',
    description:
      'Referencia inmediata de plazos de presentación, obligaciones derivadas y modelos aplicables a cada operación.',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Derecho balear incluido',
    description:
      'ITP, ISD, pactos sucesorios de la Compilació, ecotasa y deducciones autonómicas de Illes Balears.',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
];

export default function Capabilities() {
  return (
    <section id="capacidades" className="py-24 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p
            className="font-sans font-medium mb-3"
            style={{
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: '#EAAA00',
              textTransform: 'uppercase',
            }}
          >
            Capacidades
          </p>
          <h2
            className="font-sans font-bold mb-3"
            style={{ fontSize: '40px', color: '#002A3A', lineHeight: 1.1, letterSpacing: '-0.025em' }}
          >
            Lo que el agente hace por ti
          </h2>
          <p className="font-sans" style={{ fontSize: '16px', color: '#5F5E5A', maxWidth: '480px' }}>
            Especializado en las operaciones más frecuentes del despacho, disponible en todo momento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="card-hover p-7 rounded-2xl bg-white"
              style={{ border: '1px solid #E2DED9' }}
            >
              {/* Icon container */}
              <div
                className="flex items-center justify-center mb-4 flex-shrink-0"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(0,42,58,0.08) 0%, rgba(234,170,0,0.12) 100%)',
                  color: '#002A3A',
                }}
              >
                {cap.icon}
              </div>
              <h3
                className="font-sans font-medium mb-2"
                style={{ fontSize: '16px', color: '#002A3A' }}
              >
                {cap.title}
              </h3>
              <p
                className="font-sans"
                style={{ fontSize: '14px', color: '#5F5E5A', lineHeight: 1.65 }}
              >
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
