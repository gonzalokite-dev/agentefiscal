const values = [
  {
    title: 'Nacida en Baleares',
    body: 'Victoria surgió de la necesidad real de un despacho fiscal balear. Conocemos de primera mano la complejidad de la normativa autonómica y la presión diaria de los asesores.',
    icon: (
      <svg width="22" height="22" fill="none" stroke="#00B5AD" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'IA con criterio jurídico',
    body: 'No somos un chatbot genérico. Victoria está entrenada sobre fuentes oficiales — DGT, BOE, AEAT — y responde con la precisión que exige el trabajo de un asesor fiscal.',
    icon: (
      <svg width="22" height="22" fill="none" stroke="#00B5AD" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Comprometidos con la privacidad',
    body: 'Tus datos y los de tus clientes no se usan para entrenar modelos. Cumplimos RGPD y alojamos en infraestructura europea. Tu información es tuya.',
    icon: (
      <svg width="22" height="22" fill="none" stroke="#00B5AD" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
];

export default function Nosotros() {
  return (
    <section id="nosotros" style={{ backgroundColor: '#0D2E35', paddingTop: '96px', paddingBottom: '96px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* Two-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Left: copy */}
          <div>
            <p
              className="font-sans font-semibold"
              style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#00B5AD', textTransform: 'uppercase', marginBottom: '16px' }}
            >
              Nosotros
            </p>
            <h2
              className="font-serif font-bold"
              style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                color: '#FFFFFF',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '20px',
              }}
            >
              Construida por asesores,<br />para asesores.
            </h2>
            <p
              className="font-sans"
              style={{ fontSize: '16px', color: 'rgba(215,210,203,0.75)', lineHeight: 1.8, marginBottom: '32px', maxWidth: '440px' }}
            >
              El equipo detrás de Victoria combina experiencia en fiscalidad española con ingeniería de IA de última generación.
              Nuestra misión es devolver tiempo a los profesionales para que se centren en lo que realmente importa: asesorar a sus clientes.
            </p>

            <a
              href="/login"
              className="font-sans font-bold"
              style={{
                display: 'inline-block',
                padding: '13px 28px',
                backgroundColor: '#00B5AD',
                color: '#FFFFFF',
                borderRadius: '10px',
                textDecoration: 'none',
                fontSize: '14px',
                letterSpacing: '0.01em',
                boxShadow: '0 4px 20px rgba(0,181,173,0.35)',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
            >
              Prueba Victoria gratis
            </a>
          </div>

          {/* Right: value cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {values.map((v) => (
              <div
                key={v.title}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '24px 28px',
                  display: 'flex',
                  gap: '18px',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(0,181,173,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {v.icon}
                </div>
                <div>
                  <p
                    className="font-sans font-semibold"
                    style={{ fontSize: '14px', color: '#FFFFFF', marginBottom: '6px' }}
                  >
                    {v.title}
                  </p>
                  <p
                    className="font-sans"
                    style={{ fontSize: '13px', color: 'rgba(215,210,203,0.65)', lineHeight: 1.65 }}
                  >
                    {v.body}
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
