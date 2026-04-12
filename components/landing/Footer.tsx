'use client';

import Logo from '@/components/ui/Logo';

const links = {
  Producto: [
    { label: 'Capacidades', href: '/#capacidades' },
    { label: 'Cómo funciona', href: '/#como-funciona' },
    { label: 'Blog fiscal', href: '/blog' },
    { label: 'Acceder', href: '/login' },
  ],
  Cobertura: [
    { label: 'BOE en tiempo real', href: '#' },
    { label: 'Consultas DGT', href: '#' },
    { label: 'Normativa AEAT', href: '#' },
    { label: 'Derecho balear', href: '#' },
  ],
  Legal: [
    { label: 'Privacidad', href: '#' },
    { label: 'Términos de uso', href: '#' },
    { label: 'Aviso legal', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0A2028', borderTop: '1px solid rgba(0,181,173,0.1)' }}>
      <div
        style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px 32px' }}
      >
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: '1 / span 1' }}>
            <Logo size="md" variant="light" />

            <p
              className="font-sans"
              style={{
                fontSize: '13px',
                color: 'rgba(215,210,203,0.55)',
                lineHeight: 1.7,
                marginTop: '14px',
                maxWidth: '200px',
              }}
            >
              Asistente fiscal con IA para despachos de toda España.
            </p>
            <div
              className="font-sans flex items-center gap-1.5 mt-4"
              style={{
                fontSize: '11px',
                color: 'rgba(34,197,94,0.8)',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
              Conectado · BOE · DGT · AEAT
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <p
                className="font-sans font-semibold"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#00B5AD',
                  marginBottom: '16px',
                }}
              >
                {section}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="font-sans"
                    style={{
                      fontSize: '13px',
                      color: 'rgba(215,210,203,0.55)',
                      textDecoration: 'none',
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(215,210,203,0.9)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(215,210,203,0.55)'; }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(215,210,203,0.08)',
            paddingTop: '24px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p className="font-sans" style={{ fontSize: '11px', color: 'rgba(215,210,203,0.3)' }}>
            © 2025 Victoria · Pollença, Illes Balears
          </p>
          <p className="font-sans" style={{ fontSize: '11px', color: 'rgba(215,210,203,0.25)' }}>
            Victoria v1.0
          </p>
        </div>
      </div>
    </footer>
  );
}
