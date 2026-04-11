const points = [
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Tus consultas no entrenan ningún modelo',
    description: 'Las preguntas que haces y los documentos que adjuntas nunca se usan para reentrenar ni mejorar modelos de IA de terceros.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Sin almacenamiento de datos del contribuyente',
    description: 'Los documentos adjuntos se procesan en memoria durante la sesión. No quedan almacenados en ningún servidor externo una vez finalizada la consulta.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: 'Acceso individual por cuenta verificada',
    description: 'Cada miembro del equipo accede con su propia cuenta. Sin sesiones compartidas, sin acceso anónimo.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Fuentes oficiales verificables',
    description: 'Cada respuesta cita su fuente: BOE, DGT o AEAT. Puedes contrastar cualquier afirmación directamente en el organismo oficial.',
  },
];

export default function Seguridad() {
  return (
    <section style={{ backgroundColor: '#F7F6F4', paddingTop: '80px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <p
              className="font-sans"
              style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#EAAA00', textTransform: 'uppercase', fontWeight: 600, marginBottom: '14px' }}
            >
              Privacidad y seguridad
            </p>
            <h2
              className="font-sans"
              style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 800, color: '#002A3A', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '16px' }}
            >
              Los datos de tus clientes,<br />solo en tus manos.
            </h2>
            <p
              className="font-sans"
              style={{ fontSize: '15px', color: '#5F5E5A', lineHeight: 1.75, maxWidth: '420px' }}
            >
              Un despacho trabaja con información fiscal sensible. AsesorIA está diseñado
              para que esa información nunca salga de tu control.
            </p>
          </div>

          {/* Right — 4 points */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {points.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    border: '1px solid #E2DED9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#002A3A',
                  }}
                >
                  {p.icon}
                </div>
                <div>
                  <p className="font-sans" style={{ fontSize: '14px', fontWeight: 600, color: '#002A3A', marginBottom: '3px' }}>
                    {p.title}
                  </p>
                  <p className="font-sans" style={{ fontSize: '13px', color: '#5F5E5A', lineHeight: 1.65 }}>
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
