'use client';
import { useEffect, useRef, useState } from 'react';

const CONSULTAS = [
  { id: 'V0540-25', desc: 'Reducción del 90%: exige que en cada nuevo contrato la renta baje más de un 5% respecto al contrato anterior sobre la misma vivienda' },
  { id: 'V0297-25', desc: 'Exención por reinversión en vivienda habitual: el plazo de 2 años computa desde la transmisión; cancelar hipoteca no reduce el importe a reinvertir' },
  { id: 'V1130-24', desc: 'Alquiler turístico: tributa como actividad económica si se prestan servicios hoteleros o hay empleado a jornada completa; si no, es capital inmobiliario' },
];

// ms to wait at each step before advancing to step+1
const TIMINGS = [700, 1000, 350, 1800, 450, 650, 320, 320, 480, 520, 1600, 850, 3200];
// step meanings:
// 0  → wait, then show Q1
// 1  → Q1 shown, start spinner 1
// 2  → spinner 1, add spinner 2
// 3  → both spinners, replace with ✓ chips
// 4  → ✓ chips, show AI text
// 5  → AI text, show consulta 1
// 6  → consulta 1, show consulta 2
// 7  → consulta 2, show consulta 3
// 8  → consulta 3, show ref chips
// 9  → ref chips, show warning
// 10 → warning, show Q2
// 11 → Q2, show searching spinner
// 12 → spinner, pause then fade+reset

const SIDEBAR_ITEMS = [
  { label: 'Reducción alquiler · Pollença', active: true },
  { label: 'Plusvalía herencia Palma', active: false },
  { label: 'IVA inversión sujeto pasivo', active: false },
  { label: 'Mod. 720 criptomonedas 2025', active: false },
];

export default function ChatShowcase() {
  const [step, setStep] = useState(0);
  const [fading, setFading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // advance the step machine
  useEffect(() => {
    if (step < TIMINGS.length) {
      const t = setTimeout(() => setStep((s) => s + 1), TIMINGS[step]);
      return () => clearTimeout(t);
    }
    // end of loop: fade out, reset
    const t1 = setTimeout(() => setFading(true), 600);
    const t2 = setTimeout(() => { setStep(0); setFading(false); }, 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [step]);

  // auto-scroll messages area
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [step]);

  const s = (n: number) => step >= n; // visibility helper

  return (
    <section
      className="py-16 px-4 md:py-24 md:px-6"
      style={{
        background: 'radial-gradient(ellipse at 80% 90%, rgba(0,181,173,0.1) 0%, transparent 50%), #0D2E35',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '1100px' }}>

        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <p className="font-sans font-medium mb-3" style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#00B5AD', textTransform: 'uppercase' }}>
            El agente en acción
          </p>
          <h2 className="font-sans font-bold text-white mb-3" style={{ fontSize: 'clamp(26px, 5vw, 40px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
            Cada respuesta, con su fuente jurídica.
          </h2>
          <p className="font-sans" style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: '#D1D5DB', maxWidth: '520px', margin: '0 auto' }}>
            Victoria localiza las consultas vinculantes de la DGT relevantes para su caso y las presenta con contexto aplicable directo.
          </p>
        </div>

        {/* Mockup shell */}
        <div
          className="mx-auto"
          style={{
            maxWidth: '900px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(0,0,0,0.55)',
            border: '1px solid rgba(255,255,255,0.08)',
            opacity: fading ? 0 : 1,
            transition: 'opacity 0.6s ease',
          }}
        >
          {/* Browser bar */}
          <div className="flex items-center px-4 gap-2" style={{ backgroundColor: '#111', height: '36px', flexShrink: 0 }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF5F57', flexShrink: 0 }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFBD2E', flexShrink: 0 }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28CA41', flexShrink: 0 }} />
            <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '5px', padding: '3px 12px', maxWidth: '260px', margin: '0 auto' }}>
              <span className="font-sans" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>victoria.ai/chat</span>
            </div>
          </div>

          {/* App layout */}
          <div className="flex" style={{ height: '480px' }}>

            {/* Sidebar — hidden on mobile */}
            <div className="hidden md:flex flex-shrink-0 flex-col" style={{ width: '192px', backgroundColor: '#161616', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="px-4 pt-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-baseline">
                  <span className="font-sans font-bold italic" style={{ fontSize: '15px', color: 'white', letterSpacing: '-0.02em' }}>victor</span>
                  <span className="font-sans font-bold italic" style={{ fontSize: '15px', color: '#00B5AD', letterSpacing: '-0.02em' }}>ia</span>
                </div>
                <p className="font-sans" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '1px' }}>Copiloto fiscal con IA</p>
              </div>
              <div className="px-3 pt-3 pb-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ border: '1px dashed rgba(255,255,255,0.13)' }}>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>+</span>
                  <span className="font-sans" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>Nueva consulta</span>
                </div>
              </div>
              <div className="flex flex-col gap-0.5 px-2">
                {SIDEBAR_ITEMS.map((item) => (
                  <div key={item.label} className="font-sans px-3 py-2 rounded-lg" style={{ fontSize: '11px', color: item.active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)', backgroundColor: item.active ? 'rgba(255,255,255,0.09)' : 'transparent', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Main chat */}
            <div className="flex flex-col flex-1 bg-white min-w-0">

              {/* Chat header */}
              <div className="flex items-center gap-2 px-4 py-2" style={{ borderBottom: '1px solid #F0F0F0', flexShrink: 0 }}>
                <div className="flex items-center justify-center flex-shrink-0" style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#0D2E35' }}>
                  <span className="font-sans font-bold italic" style={{ fontSize: '7px', color: '#00B5AD' }}>vi</span>
                </div>
                <span className="font-sans font-semibold italic" style={{ fontSize: '13px', color: '#111' }}>victoria</span>
                <div className="flex items-center gap-1 ml-1">
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                  <span className="font-sans" style={{ fontSize: '10px', color: '#6B7280' }}>Disponible</span>
                </div>
                <div className="flex items-center gap-1 ml-auto">
                  {['DGT', 'BOE', 'CDI'].map((badge, i) => (
                    <span key={badge} className={i === 2 ? 'hidden sm:inline' : ''}>
                      <span className="font-sans font-semibold" style={{ fontSize: '9px', color: 'rgba(13,46,53,0.5)', backgroundColor: 'rgba(13,46,53,0.07)', borderRadius: '4px', padding: '2px 5px' }}>{badge}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Messages — scrollable, hidden scrollbar */}
              <div
                ref={scrollRef}
                className="flex-1 flex flex-col gap-2 px-4 py-3"
                style={{ overflowY: 'scroll', scrollbarWidth: 'none' }}
              >

                {/* Q1 */}
                {s(1) && (
                  <div className="flex justify-end anim-slide-right">
                    <div className="font-sans" style={{ background: '#F3F4F6', borderRadius: '14px 14px 4px 14px', padding: '8px 12px', fontSize: '12px', color: '#111', maxWidth: '80%', lineHeight: 1.5 }}>
                      ¿Qué reducción aplica en IRPF al alquiler de mi piso en Pollença? Acabo de firmar contrato nuevo con rebaja de renta.
                    </div>
                  </div>
                )}

                {/* Searching spinners */}
                {s(2) && !s(4) && (
                  <div className="flex flex-col gap-1.5 pl-1 anim-fade-up">
                    {[
                      s(2) && 'Consultando DGT · hacienda.gob.es',
                      s(3) && 'Consultando Convenio España-NL · boe.es',
                    ].filter(Boolean).map((label) => (
                      <div key={label as string} className="flex items-center gap-2" style={{ width: 'fit-content', backgroundColor: 'rgba(0,181,173,0.07)', border: '1px solid rgba(0,181,173,0.22)', borderRadius: '20px', padding: '4px 11px' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00B5AD" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 1.1s linear infinite', flexShrink: 0 }}>
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        <span className="font-sans" style={{ fontSize: '10px', color: '#00B5AD' }}>{label as string}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* ✓ Search done chips */}
                {s(4) && (
                  <div className="flex flex-wrap items-center gap-2 pl-1 anim-fade-up">
                    {['DGT · hacienda.gob.es — 3 consultas vinculantes', 'BOE · Ley 12/2023 — art. 23.2 LIRPF'].map((label) => (
                      <div key={label} className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.25)' }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        <span className="font-sans" style={{ fontSize: '10px', color: '#16a34a' }}>{label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* AI response */}
                {s(5) && (
                  <div className="flex gap-2 anim-fade-up">
                    <div className="flex items-center justify-center flex-shrink-0" style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#0D2E35', marginTop: '2px' }}>
                      <span className="font-sans font-bold" style={{ fontSize: '6px', color: '#00B5AD' }}>AI</span>
                    </div>
                    <div className="flex flex-col gap-2" style={{ flex: 1, minWidth: 0 }}>
                      <p className="font-sans" style={{ fontSize: '12px', color: '#111', lineHeight: 1.6 }}>
                        He localizado <strong>3 consultas vinculantes</strong> de la DGT aplicables. La reducción depende del tipo de contrato y la zona:
                        {s(5) && !s(6) && <span className="typing-cursor" />}
                      </p>

                      {/* Consultas — appear one by one */}
                      {(s(6) || s(7) || s(8)) && (
                        <div className="flex flex-col gap-1.5">
                          {CONSULTAS.map((c, i) => s(6 + i) && (
                            <div key={c.id} className="flex items-start gap-2 anim-fade-up" style={{ borderLeft: '2px solid rgba(0,181,173,0.5)', paddingLeft: '8px' }}>
                              <span className="font-sans font-bold flex-shrink-0" style={{ fontSize: '10px', color: '#0D2E35', backgroundColor: 'rgba(13,46,53,0.08)', border: '1px solid rgba(13,46,53,0.14)', borderRadius: '4px', padding: '1px 5px', fontFamily: 'monospace' }}>
                                {c.id}
                              </span>
                              <span className="font-sans" style={{ fontSize: '11px', color: '#374151', lineHeight: 1.45 }}>{c.desc}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Ref chips */}
                      {s(9) && (
                        <div className="flex flex-wrap gap-1.5 anim-fade-up">
                          {['Art. 23.2 LIRPF', 'Ley 12/2023', 'D.Foral Baleares'].map((ref) => (
                            <span key={ref} className="font-sans" style={{ fontSize: '10px', color: '#0D2E35', backgroundColor: 'rgba(13,46,53,0.07)', border: '1px solid rgba(13,46,53,0.12)', borderRadius: '5px', padding: '2px 6px' }}>{ref}</span>
                          ))}
                        </div>
                      )}

                      {/* Warning */}
                      {s(10) && (
                        <div className="flex items-start gap-2 rounded-lg px-3 py-2 anim-fade-up" style={{ backgroundColor: 'rgba(0,181,173,0.08)', border: '1px solid rgba(0,181,173,0.25)' }}>
                          <span style={{ fontSize: '11px', flexShrink: 0 }}>⚠️</span>
                          <span className="font-sans" style={{ fontSize: '11px', color: '#6B7280', lineHeight: 1.5 }}>
                            La reducción del <strong style={{ color: '#0D2E35' }}>90% exige nuevo contrato</strong> con renta ≥5% inferior a la anterior (V0540-25). Si Pollença no está declarada zona tensionada, el máximo aplicable es el <strong style={{ color: '#0D2E35' }}>50% general</strong>.
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Q2 */}
                {s(11) && (
                  <div className="flex justify-end anim-slide-right">
                    <div className="font-sans" style={{ background: '#F3F4F6', borderRadius: '14px 14px 4px 14px', padding: '8px 12px', fontSize: '12px', color: '#111', maxWidth: '75%', lineHeight: 1.5 }}>
                      ¿Y si en vez de alquiler de vivienda lo pongo como apartamento turístico?
                    </div>
                  </div>
                )}

                {/* Searching 2 */}
                {s(12) && (
                  <div className="flex items-center gap-2 pl-1 anim-fade-up" style={{ width: 'fit-content', backgroundColor: 'rgba(0,181,173,0.07)', border: '1px solid rgba(0,181,173,0.22)', borderRadius: '20px', padding: '4px 11px' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00B5AD" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 1.1s linear infinite', flexShrink: 0 }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    <span className="font-sans" style={{ fontSize: '10px', color: '#00B5AD' }}>Consultando DGT · hacienda.gob.es</span>
                  </div>
                )}

                {/* Typing dots when searching */}
                {s(12) && (
                  <div className="flex gap-1 pl-7 anim-fade-up">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                )}

                <div style={{ height: '4px', flexShrink: 0 }} />
              </div>

              {/* Input bar */}
              <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderTop: '1px solid #F0F0F0', backgroundColor: '#FAFAFA', flexShrink: 0 }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'rgba(0,42,58,0.07)', flexShrink: 0 }} />
                <span className="font-sans flex-1" style={{ fontSize: '12px', color: '#9CA3AF' }}>Escribe tu consulta fiscal...</span>
                <div className="flex items-center justify-center" style={{ backgroundColor: '#00B5AD', borderRadius: '7px', padding: '6px', flexShrink: 0 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#00B5AD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
          to   { transform: rotate(360deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(7px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .anim-fade-up   { animation: fadeUp   0.35s ease both; }
        .anim-slide-right { animation: slideRight 0.3s ease both; }
        .typing-cursor {
          display: inline-block;
          width: 2px;
          height: 13px;
          background: #0D2E35;
          margin-left: 2px;
          vertical-align: middle;
          animation: cursorBlink 0.75s step-end infinite;
        }
        /* hide scrollbar */
        div[style*="scroll"] { scrollbar-width: none; }
        div[style*="scroll"]::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
