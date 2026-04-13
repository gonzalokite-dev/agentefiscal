'use client';

const plans = [
  {
    name: 'Starter',
    price: '49',
    description: 'Para profesionales que empiezan a trabajar con IA fiscal.',
    features: [
      'Chat fiscal ilimitado',
      'Consultas DGT · BOE · AEAT',
      'Historial de 30 días',
      'Subida de documentos PDF',
      'Soporte por email',
    ],
    missing: [
      'Normativa autonómica avanzada',
      'Múltiples usuarios',
    ],
    cta: 'Empezar gratis 14 días',
    highlight: false,
  },
  {
    name: 'Profesional',
    price: '89',
    description: 'El plan más completo para asesores y gestores activos.',
    features: [
      'Chat fiscal ilimitado',
      'Consultas DGT · BOE · AEAT',
      'Historial completo',
      'Subida de documentos PDF',
      'Normativa autonómica balear',
      'Redacción de recursos y alegaciones',
      'Soporte prioritario',
    ],
    missing: [],
    cta: 'Empezar gratis 14 días',
    highlight: true,
  },
  {
    name: 'Equipo',
    price: '149',
    description: 'Para despachos con varios asesores trabajando a la vez.',
    features: [
      'Todo lo incluido en Profesional',
      'Hasta 5 usuarios simultáneos',
      'Historial compartido del equipo',
      'Panel de administración',
      'Incorporación guiada',
      'Soporte dedicado',
    ],
    missing: [],
    cta: 'Hablar con ventas',
    highlight: false,
  },
];

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CrossIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function Pricing() {
  return (
    <section id="planes" style={{ backgroundColor: '#F9FAFB', paddingTop: '96px', paddingBottom: '96px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p
            className="font-sans font-semibold"
            style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#00B5AD', textTransform: 'uppercase', marginBottom: '14px' }}
          >
            Planes
          </p>
          <h2
            className="font-serif font-bold"
            style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: '#0D2E35', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px' }}
          >
            Precios claros, sin sorpresas
          </h2>
          <p
            className="font-sans"
            style={{ fontSize: '16px', color: '#6B7280', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}
          >
            14 días de prueba gratis en todos los planes. Sin tarjeta de crédito.
          </p>
        </div>

        {/* Plans grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            alignItems: 'start',
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="cap-card"
              style={{
                backgroundColor: plan.highlight ? '#0D2E35' : '#FFFFFF',
                borderRadius: '20px',
                padding: '36px 32px',
                border: plan.highlight ? 'none' : '1px solid #E5E7EB',
                position: 'relative',
                boxShadow: plan.highlight ? '0 24px 64px rgba(13,46,53,0.25)' : 'none',
              }}
            >
              {/* Popular badge */}
              {plan.highlight && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#00B5AD',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '4px 14px',
                    borderRadius: '9999px',
                    whiteSpace: 'nowrap',
                    fontFamily: 'var(--font-inter), sans-serif',
                  }}
                >
                  Más popular
                </div>
              )}

              {/* Plan name */}
              <p
                className="font-sans font-semibold"
                style={{ fontSize: '13px', color: plan.highlight ? 'rgba(255,255,255,0.6)' : '#6B7280', marginBottom: '8px' }}
              >
                {plan.name}
              </p>

              {/* Price */}
              <div className="flex items-end gap-1" style={{ marginBottom: '12px' }}>
                <span
                  className="font-serif font-bold"
                  style={{ fontSize: '48px', lineHeight: 1, color: plan.highlight ? '#FFFFFF' : '#0D2E35', letterSpacing: '-0.04em' }}
                >
                  {plan.price}€
                </span>
                <span
                  className="font-sans"
                  style={{ fontSize: '13px', color: plan.highlight ? 'rgba(255,255,255,0.45)' : '#9CA3AF', marginBottom: '8px' }}
                >
                  /mes
                </span>
              </div>

              {/* Description */}
              <p
                className="font-sans"
                style={{ fontSize: '13px', color: plan.highlight ? 'rgba(255,255,255,0.6)' : '#6B7280', lineHeight: 1.6, marginBottom: '28px' }}
              >
                {plan.description}
              </p>

              {/* CTA */}
              <a
                href="/login"
                className="font-sans font-bold"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  textDecoration: 'none',
                  marginBottom: '28px',
                  transition: 'opacity 0.2s, transform 0.15s',
                  backgroundColor: plan.highlight ? '#00B5AD' : 'transparent',
                  color: plan.highlight ? '#FFFFFF' : '#0D2E35',
                  border: plan.highlight ? 'none' : '1.5px solid #E5E7EB',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
              >
                {plan.cta}
              </a>

              {/* Separator */}
              <div style={{ borderTop: `1px solid ${plan.highlight ? 'rgba(255,255,255,0.1)' : '#F3F4F6'}`, marginBottom: '20px' }} />

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <CheckIcon />
                    <span
                      className="font-sans"
                      style={{ fontSize: '13px', color: plan.highlight ? 'rgba(255,255,255,0.8)' : '#374151', lineHeight: 1.4 }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
                {plan.missing.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <CrossIcon />
                    <span
                      className="font-sans"
                      style={{ fontSize: '13px', color: '#C4C4C4', lineHeight: 1.4 }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p
          className="font-sans"
          style={{ textAlign: 'center', marginTop: '40px', fontSize: '13px', color: '#9CA3AF' }}
        >
          Todos los planes incluyen actualizaciones automáticas de normativa · Cancela cuando quieras
        </p>

      </div>
    </section>
  );
}
