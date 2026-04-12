const capabilities = [
  {
    title: 'Respuesta completa al instante',
    description:
      'IRPF, IVA, IS, IRNR, ITP, ISD. Respuesta técnica fundamentada en DGT en tiempo real, lista en segundos. Sin esperas, sin páginas de búsqueda.',
    tag: 'Consultas',
    iconBg: 'rgba(0,181,173,0.1)',
    iconColor: '#00B5AD',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Interpreta normativa compleja',
    description:
      'Analiza y explica normativa en lenguaje claro: circulares, resoluciones, consultas vinculantes DGT y legislación autonómica de Baleares.',
    tag: 'Normativa',
    iconBg: 'rgba(59,130,246,0.1)',
    iconColor: '#3b82f6',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Alertas y novedades a tiempo',
    description:
      'Victoria monitoriza cambios normativos en el BOE y la DGT. Recibe avisos cuando cambia algo relevante para tus clientes.',
    tag: 'Alertas',
    iconBg: 'rgba(249,115,22,0.1)',
    iconColor: '#f97316',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    title: 'Siempre actualizada',
    description:
      'La normativa cambia. Victoria se conecta en tiempo real al BOE, la AEAT y la DGT para que nunca trabajes con información desactualizada.',
    tag: 'Actualización',
    iconBg: 'rgba(168,85,247,0.1)',
    iconColor: '#a855f7',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: 'Cálculos auditables paso a paso',
    description:
      'Cuotas IRPF, plusvalías, retenciones, ITP. Cada operación desglosada y justificada, revisable por el asesor con su fuente normativa.',
    tag: 'Cálculo',
    iconBg: 'rgba(34,197,94,0.1)',
    iconColor: '#22c55e',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Analiza documentos al instante',
    description:
      'Sube facturas, escrituras, liquidaciones o modelos tributarios. Victoria extrae los datos relevantes y detecta errores o incumplimientos.',
    tag: 'Documentos',
    iconBg: 'rgba(234,179,8,0.1)',
    iconColor: '#ca8a04',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Recursos redactados en minutos',
    description:
      'Recursos de reposición, alegaciones y comunicaciones con la AEAT listos para revisar y firmar. Victoria redacta, tú decides.',
    tag: 'Redacción',
    iconBg: 'rgba(236,72,153,0.1)',
    iconColor: '#ec4899',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
];

export default function Capabilities() {
  return (
    <section id="capacidades" className="py-20 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <p
            className="font-sans font-semibold mb-3"
            style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#00B5AD', textTransform: 'uppercase' }}
          >
            Capacidades
          </p>
          <h2
            className="font-sans font-bold mb-3"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: '#0D2E35', lineHeight: 1.1, letterSpacing: '-0.03em' }}
          >
            Todo lo que tu asesoría necesita,<br />en un solo copiloto
          </h2>
          <p className="font-sans" style={{ fontSize: '16px', color: '#6B7280', maxWidth: '480px', margin: '0 auto' }}>
            Especializado en las operaciones más frecuentes del despacho, disponible en todo momento.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="cap-card p-6 rounded-2xl bg-white"
              style={{ border: '1px solid #E5E7EB' }}
            >
              {/* Tag + Icon row */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: cap.iconBg,
                    color: cap.iconColor,
                  }}
                >
                  {cap.icon}
                </div>
                <span
                  className="font-sans font-semibold"
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: cap.iconColor,
                    backgroundColor: cap.iconBg,
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    border: `1px solid ${cap.iconColor}30`,
                  }}
                >
                  {cap.tag}
                </span>
              </div>
              <h3
                className="font-sans font-semibold mb-2"
                style={{ fontSize: '15px', color: '#0D2E35', lineHeight: 1.35 }}
              >
                {cap.title}
              </h3>
              <p
                className="font-sans"
                style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.65 }}
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
