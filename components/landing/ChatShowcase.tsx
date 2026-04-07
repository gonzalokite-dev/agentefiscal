'use client';

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
            style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#EAAA00', textTransform: 'uppercase' }}
          >
            En acción
          </p>
          <h2
            className="font-sans font-bold text-white mb-3"
            style={{ fontSize: '40px', lineHeight: 1.1, letterSpacing: '-0.025em' }}
          >
            Así trabaja el agente
          </h2>
          <p className="font-sans" style={{ fontSize: '16px', color: '#D7D2CB', maxWidth: '480px', margin: '0 auto' }}>
            Consultas reales, respuestas fundamentadas en normativa vigente.
          </p>
        </div>

        {/* Mockup */}
        <div
          className="mx-auto"
          style={{
            maxWidth: '900px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(0,0,0,0.55)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Browser bar */}
          <div className="flex items-center px-4 gap-2" style={{ backgroundColor: '#111111', height: '38px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF5F57', flexShrink: 0 }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFBD2E', flexShrink: 0 }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28CA41', flexShrink: 0 }} />
            <div
              className="flex-1 flex items-center justify-center mx-4"
              style={{ backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '5px', padding: '3px 12px', maxWidth: '280px', margin: '0 auto' }}
            >
              <span className="font-sans" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                asesoria.ia/chat
              </span>
            </div>
          </div>

          {/* App layout */}
          <div className="flex" style={{ height: '500px' }}>

            {/* ── Sidebar ── */}
            <div
              className="flex-shrink-0 flex flex-col"
              style={{ width: '200px', backgroundColor: '#161616', borderRight: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Brand */}
              <div className="px-4 pt-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-baseline">
                  <span className="font-sans font-bold" style={{ fontSize: '16px', color: 'white', letterSpacing: '-0.04em' }}>Asesor</span>
                  <span className="font-sans font-bold" style={{ fontSize: '16px', color: '#EAAA00', letterSpacing: '-0.04em', position: 'relative', top: '-3px' }}>IA</span>
                </div>
                <p className="font-sans" style={{ fontSize: '10px', color: 'rgba(215,210,203,0.45)', marginTop: '1px' }}>Asesoría fiscal con IA</p>
              </div>

              {/* New chat */}
              <div className="px-3 pt-3 pb-2">
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg"
                  style={{ border: '1px dashed rgba(255,255,255,0.15)', cursor: 'pointer' }}
                >
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>+</span>
                  <span className="font-sans" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Nueva consulta</span>
                </div>
              </div>

              {/* History */}
              <div className="flex flex-col gap-0.5 px-2 overflow-hidden">
                {[
                  { label: 'Pacto sucesorio · Pollença', active: true },
                  { label: 'Plusvalía herencia Palma', active: false },
                  { label: 'Mod. 720 criptomonedas 2025', active: false },
                  { label: 'IVA inversión sujeto pasivo', active: false },
                  { label: 'ERTE parcial IRPF trabajador', active: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="font-sans px-3 py-2 rounded-lg"
                    style={{
                      fontSize: '11px',
                      color: item.active ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.38)',
                      backgroundColor: item.active ? 'rgba(255,255,255,0.09)' : 'transparent',
                      lineHeight: 1.4,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Main chat ── */}
            <div className="flex flex-col flex-1 bg-white">

              {/* Chat header */}
              <div className="flex items-center gap-2 px-5 py-2.5" style={{ borderBottom: '1px solid #F0F0F0' }}>
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#002A3A' }}
                >
                  <span className="font-sans font-bold" style={{ fontSize: '7px', color: '#EAAA00' }}>AI</span>
                </div>
                <span className="font-sans font-semibold" style={{ fontSize: '13px', color: '#111' }}>AsesorIA</span>
                <div className="flex items-center gap-1 ml-1">
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                  <span className="font-sans" style={{ fontSize: '10px', color: '#6B7280' }}>Disponible</span>
                </div>
                {/* Source badges */}
                <div className="flex items-center gap-1 ml-auto">
                  {['BOE', 'DGT', 'AEAT'].map((s) => (
                    <span key={s} className="font-sans font-semibold" style={{ fontSize: '9px', color: 'rgba(0,42,58,0.5)', backgroundColor: 'rgba(0,42,58,0.07)', borderRadius: '4px', padding: '2px 5px' }}>{s}</span>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 px-5 py-4 flex flex-col gap-3 overflow-hidden">

                {/* User message 1 */}
                <div className="flex justify-end">
                  <div
                    className="font-sans"
                    style={{ background: '#F3F4F6', borderRadius: '14px 14px 4px 14px', padding: '8px 13px', fontSize: '12.5px', color: '#111', maxWidth: '72%', lineHeight: 1.5 }}
                  >
                    ¿Tributa en IRPF la transmisión por pacto sucesorio de una finca en Pollença bajo la CDCIB?
                  </div>
                </div>

                {/* Search completed */}
                <div className="flex items-center gap-2 pl-1">
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)' }}
                  >
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="font-sans" style={{ fontSize: '10px', color: '#16a34a' }}>BOE · boe.es — 4 resultados</span>
                  </div>
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)' }}
                  >
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="font-sans" style={{ fontSize: '10px', color: '#16a34a' }}>DGT V2631-21 — consultada</span>
                  </div>
                </div>

                {/* Agent response */}
                <div className="flex gap-2">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#002A3A', marginTop: '1px' }}
                  >
                    <span className="font-sans font-bold" style={{ fontSize: '6px', color: '#EAAA00' }}>AI</span>
                  </div>
                  <div className="flex flex-col gap-2" style={{ flex: 1 }}>
                    <p className="font-sans" style={{ fontSize: '12.5px', color: '#111', lineHeight: 1.55 }}>
                      <strong>No.</strong> Los pactos sucesorios de la <strong>Compilació de Dret Civil de les Illes Balears</strong> no generan ganancia patrimonial en IRPF para el transmitente (art. 33.3.b LIRPF). La DGT confirma este criterio en V2631-21.
                    </p>
                    {/* Reference chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {['Art. 33.3.b LIRPF', 'DGT V2631-21', 'CDCIB Arts. 50–63'].map((ref) => (
                        <span
                          key={ref}
                          className="font-sans"
                          style={{ fontSize: '10px', color: '#002A3A', backgroundColor: 'rgba(0,42,58,0.07)', border: '1px solid rgba(0,42,58,0.12)', borderRadius: '5px', padding: '2px 7px' }}
                        >
                          {ref}
                        </span>
                      ))}
                    </div>
                    {/* Warning */}
                    <div
                      className="flex items-start gap-2 rounded-lg px-3 py-2"
                      style={{ backgroundColor: 'rgba(234,170,0,0.08)', border: '1px solid rgba(234,170,0,0.25)' }}
                    >
                      <span style={{ fontSize: '11px', flexShrink: 0 }}>⚠️</span>
                      <span className="font-sans" style={{ fontSize: '11px', color: '#5F5E5A', lineHeight: 1.5 }}>
                        El <strong style={{ color: '#002A3A' }}>adquirente sí tributa en ISD</strong> al tipo balear (7–11% para descendientes residentes en Baleares).
                      </span>
                    </div>
                  </div>
                </div>

                {/* User message 2 */}
                <div className="flex justify-end">
                  <div
                    className="font-sans"
                    style={{ background: '#F3F4F6', borderRadius: '14px 14px 4px 14px', padding: '8px 13px', fontSize: '12.5px', color: '#111', maxWidth: '72%', lineHeight: 1.5 }}
                  >
                    ¿Qué reducciones aplican en ISD para hijo residente en Baleares?
                  </div>
                </div>

                {/* Live searches */}
                <div className="flex flex-col gap-1.5 pl-1">
                  {[
                    'Consultando DGT · hacienda.gob.es',
                    'Consultando BOE · boe.es',
                  ].map((label) => (
                    <div
                      key={label}
                      className="flex items-center gap-2"
                      style={{ width: 'fit-content', backgroundColor: 'rgba(234,170,0,0.07)', border: '1px solid rgba(234,170,0,0.22)', borderRadius: '20px', padding: '5px 12px' }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EAAA00" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 1.2s linear infinite', flexShrink: 0 }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      <span className="font-sans" style={{ fontSize: '10px', color: '#EAAA00' }}>{label}</span>
                    </div>
                  ))}
                  {/* Typing dots */}
                  <div className="flex items-center gap-1 pl-2 pt-1">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>

              </div>

              {/* Input */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderTop: '1px solid #F0F0F0', backgroundColor: '#FAFAFA' }}
              >
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgba(0,42,58,0.08)', flexShrink: 0 }} />
                <span className="font-sans flex-1" style={{ fontSize: '12px', color: '#9CA3AF' }}>Escribe tu consulta fiscal...</span>
                <div
                  className="flex items-center justify-center"
                  style={{ backgroundColor: '#002A3A', borderRadius: '8px', padding: '7px', flexShrink: 0 }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EAAA00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
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
