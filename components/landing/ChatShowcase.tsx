export default function ChatShowcase() {
  return (
    <section
      className="py-24 px-6"
      style={{
        background:
          'radial-gradient(ellipse at 80% 90%, rgba(234,170,0,0.1) 0%, transparent 50%), #002A3A',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '1100px' }}>
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="font-sans font-medium mb-3"
            style={{
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: '#EAAA00',
              textTransform: 'uppercase',
            }}
          >
            En acción
          </p>
          <h2
            className="font-serif font-semibold text-white mb-3"
            style={{ fontSize: '40px', lineHeight: 1.2 }}
          >
            Así trabaja el agente
          </h2>
          <p className="font-sans" style={{ fontSize: '16px', color: '#D7D2CB', maxWidth: '480px', margin: '0 auto' }}>
            Consultas reales, respuestas fundamentadas en normativa vigente.
          </p>
        </div>

        {/* Large mockup */}
        <div
          className="mx-auto"
          style={{
            maxWidth: '860px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Browser bar */}
          <div
            className="flex items-center px-4 gap-2"
            style={{ backgroundColor: '#1a1a1a', height: '40px' }}
          >
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF5F57', flexShrink: 0 }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFBD2E', flexShrink: 0 }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28CA41', flexShrink: 0 }} />
            <div
              className="flex-1 flex items-center justify-center mx-4"
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: '4px',
                padding: '3px 12px',
                maxWidth: '320px',
                margin: '0 auto',
              }}
            >
              <span className="font-sans" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                agentefiscal.benavides.es/chat
              </span>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="flex" style={{ height: '420px' }}>
            {/* Sidebar */}
            <div
              className="flex-shrink-0 p-4 flex flex-col"
              style={{ width: '208px', backgroundColor: '#171717', borderRight: '1px solid rgba(255,255,255,0.06)' }}
            >
              <p className="font-serif text-white mb-0.5" style={{ fontSize: '12px' }}>
                Benavides Asociados
              </p>
              <p className="font-sans mb-4" style={{ fontSize: '10px', color: '#EAAA00' }}>
                Agente Fiscal BA
              </p>
              <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.08)', marginBottom: '12px' }} />

              {/* Conversation items */}
              <div className="flex flex-col gap-1">
                <div
                  className="font-sans rounded px-3 py-2"
                  style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.9)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    lineHeight: 1.4,
                  }}
                >
                  Pacto sucesorio finca Pollença
                </div>
                <div
                  className="font-sans rounded px-3 py-2"
                  style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.4,
                  }}
                >
                  Retención no residente alem...
                </div>
                <div
                  className="font-sans rounded px-3 py-2"
                  style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.4,
                  }}
                >
                  Modelo 210 trimestre Q1
                </div>
              </div>
            </div>

            {/* Chat area */}
            <div className="flex flex-col flex-1 bg-white">
              {/* Header */}
              <div
                className="flex items-center gap-2 px-6 py-3"
                style={{ borderBottom: '1px solid #E5E7EB' }}
              >
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#002A3A',
                  }}
                >
                  <span className="font-sans font-bold" style={{ fontSize: '8px', color: '#EAAA00' }}>BA</span>
                </div>
                <span className="font-sans font-medium" style={{ fontSize: '13px', color: '#1a1a1a' }}>
                  Agente Fiscal BA
                </span>
                <div className="flex items-center gap-1 ml-2">
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#28CA41' }} />
                  <span className="font-sans" style={{ fontSize: '11px', color: '#6B7280' }}>Disponible</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 px-6 py-5 overflow-hidden">
                {/* Exchange 1 */}
                <div className="flex justify-end">
                  <div
                    className="font-sans"
                    style={{
                      background: '#F4F4F4',
                      borderRadius: '16px',
                      padding: '8px 16px',
                      fontSize: '13px',
                      color: '#1a1a1a',
                      maxWidth: '75%',
                      lineHeight: 1.5,
                    }}
                  >
                    ¿La venta de un inmueble por un no residente alemán con convenio aplicado tributa al 19%?
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: '#002A3A',
                      marginTop: '2px',
                    }}
                  >
                    <span className="font-sans font-bold" style={{ fontSize: '6px', color: '#EAAA00' }}>BA</span>
                  </div>
                  <div
                    className="font-sans"
                    style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.6, flex: 1 }}
                  >
                    Sí. El tipo aplicable para residentes en la UE/EEE, incluida Alemania, es el{' '}
                    <strong>19%</strong> sobre la ganancia patrimonial obtenida en España (art. 25 LIRNR).
                    El comprador debe retener el <strong>3%</strong> del precio (Mod. 211).
                  </div>
                </div>

                {/* Exchange 2 — search indicator */}
                <div className="mt-5 flex justify-end">
                  <div
                    className="flex items-center gap-2 font-sans"
                    style={{
                      fontSize: '11px',
                      color: '#EAAA00',
                      backgroundColor: 'rgba(234,170,0,0.08)',
                      border: '1px solid rgba(234,170,0,0.2)',
                      borderRadius: '6px',
                      padding: '6px 12px',
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#EAAA00"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{ animation: 'spin 1.5s linear infinite', flexShrink: 0 }}
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Consultando AEAT · agenciatributaria.gob.es
                  </div>
                </div>
              </div>

              {/* Input */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderTop: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }}
              >
                <span className="font-sans flex-1" style={{ fontSize: '13px', color: '#9CA3AF' }}>
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
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EAAA00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </div>
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
