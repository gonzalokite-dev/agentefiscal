'use client';

export default function Hero() {
  const scrollToCapabilities = () => {
    document.getElementById('capacidades')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="py-14 px-5 md:py-24 md:px-6"
      style={{
        background:
          'radial-gradient(ellipse at 75% 25%, rgba(234,170,0,0.13) 0%, transparent 55%), linear-gradient(160deg, #002A3A 0%, #001520 100%)',
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        style={{ maxWidth: '1200px' }}
      >
        {/* LEFT COLUMN */}
        <div>
          {/* Social proof badge */}
          <div
            className="font-sans inline-flex items-center gap-2 mb-6"
            style={{
              fontSize: '12px',
              color: 'rgba(234,170,0,0.9)',
              border: '1px solid rgba(234,170,0,0.25)',
              borderRadius: '9999px',
              padding: '5px 14px',
              backgroundColor: 'rgba(234,170,0,0.07)',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block', flexShrink: 0 }} />
            4 despachos de Baleares · 20 asesores activos
          </div>

          <h1
            className="font-sans font-bold text-white mb-6"
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
            }}
          >
            El despacho fiscal<br />
            que responde <span className="gradient-text">antes</span><br />
            que la competencia
          </h1>

          <p
            className="font-sans mb-8"
            style={{
              fontSize: '16px',
              color: '#D7D2CB',
              maxWidth: '480px',
              lineHeight: 1.75,
            }}
          >
            Asistente fiscal técnico conectado en tiempo real al BOE, la DGT y la AEAT.
            Consultas fundamentadas, análisis de documentos y escritos redactados —
            con normativa estatal y balear.
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {[
              {
                label: 'BOE · DGT · AEAT en tiempo real',
                icon: (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                ),
              },
              {
                label: 'Normativa estatal + balear',
                icon: (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                ),
              },
              {
                label: 'Analiza PDFs y documentos',
                icon: (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                ),
              },
            ].map((pill) => (
              <span
                key={pill.label}
                className="font-sans flex items-center gap-1.5"
                style={{
                  fontSize: '12px',
                  color: 'rgba(215,210,203,0.75)',
                  border: '1px solid rgba(215,210,203,0.2)',
                  borderRadius: '9999px',
                  padding: '4px 12px',
                }}
              >
                {pill.icon}
                {pill.label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="/login"
              className="font-sans font-bold transition-opacity hover:opacity-90"
              style={{
                backgroundColor: '#EAAA00',
                color: '#002A3A',
                padding: '14px 32px',
                borderRadius: '10px',
                fontSize: '15px',
                textDecoration: 'none',
              }}
            >
              Acceder al despacho →
            </a>
            <button
              onClick={scrollToCapabilities}
              className="font-sans font-semibold transition-opacity hover:opacity-80"
              style={{
                background: 'transparent',
                border: '1px solid rgba(215,210,203,0.4)',
                color: '#D7D2CB',
                padding: '14px 32px',
                borderRadius: '10px',
                fontSize: '15px',
                cursor: 'pointer',
              }}
            >
              Ver capacidades
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN — chat mockup */}
        <div className="flex justify-center lg:justify-end pb-2 lg:pb-0">
          <div
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.1)',
              maxWidth: '460px',
              width: '100%',
            }}
          >
            {/* Browser top bar */}
            <div
              className="flex items-center px-3 gap-1.5 relative"
              style={{ backgroundColor: '#1a1a1a', height: '36px' }}
            >
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF5F57', flexShrink: 0 }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFBD2E', flexShrink: 0 }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28CA41', flexShrink: 0 }} />
              <span
                className="absolute left-1/2 font-sans"
                style={{
                  transform: 'translateX(-50%)',
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.6)',
                  letterSpacing: '0.02em',
                }}
              >
                AsesorIA
              </span>
            </div>

            {/* Chat area */}
            <div
              className="bg-white"
              style={{ height: 'clamp(240px, 45vw, 340px)', overflow: 'hidden', padding: '16px' }}
            >
              {/* User message */}
              <div className="flex justify-end">
                <div
                  className="font-sans"
                  style={{
                    background: '#F4F4F4',
                    borderRadius: '16px',
                    padding: '10px 16px',
                    fontSize: '13px',
                    color: '#1a1a1a',
                    maxWidth: '80%',
                    lineHeight: 1.5,
                  }}
                >
                  ¿Tributa en IRPF el pacto sucesorio de una finca en Pollença?
                </div>
              </div>

              {/* Agent message */}
              <div className="flex gap-2 mt-4">
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#002A3A',
                    marginTop: '2px',
                  }}
                >
                  <span className="font-sans font-bold" style={{ fontSize: '7px', color: '#EAAA00' }}>BA</span>
                </div>
                <div
                  className="font-sans"
                  style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.6, flex: 1 }}
                >
                  No. Los pactos sucesorios regulados en la{' '}
                  <strong>Compilació de Dret Civil de les Illes Balears</strong>{' '}
                  no generan ganancia patrimonial en IRPF para el transmitente...
                </div>
              </div>

              {/* Search indicator */}
              <div
                className="flex items-center gap-2 mt-3"
                style={{
                  background: 'rgba(234,170,0,0.08)',
                  border: '1px solid rgba(234,170,0,0.25)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#EAAA00"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ flexShrink: 0, animation: 'spin 1.5s linear infinite' }}
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                <span
                  className="font-sans"
                  style={{ fontSize: '11px', color: '#EAAA00' }}
                >
                  Consultando DGT · hacienda.gob.es
                </span>
              </div>
            </div>

            {/* Input bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{
                backgroundColor: '#F9F9F9',
                borderTop: '1px solid #E5E7EB',
              }}
            >
              <span
                className="font-sans flex-1"
                style={{ fontSize: '14px', color: '#9CA3AF' }}
              >
                Escribe tu consulta...
              </span>
              <div
                className="flex items-center justify-center"
                style={{
                  backgroundColor: '#002A3A',
                  borderRadius: '8px',
                  padding: '6px',
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EAAA00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
