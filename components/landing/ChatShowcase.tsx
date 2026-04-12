'use client';
import { useState, useEffect } from 'react';

const CHATS = [
  {
    query: '¿Tributa en IRPF el pacto sucesorio de una finca en Pollença?',
    answer: 'No. Los pactos sucesorios regulados en la Compilació de Dret Civil de les Illes Balears no generan ganancia patrimonial en IRPF para el transmitente. Así lo confirma la DGT en V0021-24.',
    source: 'Consultando DGT · hacienda.gob.es',
    ref: 'V0021-24 · Art. 33 LIRPF',
  },
  {
    query: '¿Cuál es el tipo de ITP en Illes Balears para una vivienda de 350.000€?',
    answer: 'El tipo aplicable es del 8%. Para inmuebles hasta 400.000€ la escala balear aplica el tipo reducido del 8%, según la Ley 11/2023 de Illes Balears.',
    source: 'Consultando BOE · boe.es',
    ref: 'Ley 11/2023 · Escala ITP Baleares',
  },
];

const FEATURES = [
  'Respuesta fundamentada con fuente jurídica citada',
  'Normativa autonómica balear integrada',
  'Análisis de PDFs: escrituras, liquidaciones, modelos',
  'Redacción de recursos y alegaciones',
  'Disponible las 24 horas, sin esperas',
];

export default function ChatShowcase() {
  const [chatIdx, setChatIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setChatIdx((i) => (i + 1) % CHATS.length);
        setVisible(true);
      }, 350);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const chat = CHATS[chatIdx];

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: '#F9FAFB' }}
      id="como-funciona"
    >
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" style={{ maxWidth: '1100px' }}>

        {/* LEFT — chat mockup */}
        <div className="flex justify-center lg:justify-start">
          <div
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(13,46,53,0.15), 0 0 0 1px rgba(0,0,0,0.06)',
              maxWidth: '440px',
              width: '100%',
            }}
          >
            {/* Browser bar */}
            <div
              className="flex items-center px-3 gap-1.5 relative"
              style={{ backgroundColor: '#F3F4F6', height: '36px', borderBottom: '1px solid #E5E7EB' }}
            >
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF5F57' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28CA41' }} />
              <img
                src="/logo-victoria-transparent.png"
                alt="victoria"
                className="absolute left-1/2"
                style={{ transform: 'translateX(-50%)', height: '16px', width: 'auto' }}
              />
            </div>

            {/* Chat body */}
            <div
              className="bg-white"
              style={{
                height: 'clamp(260px, 42vw, 340px)',
                overflow: 'hidden',
                padding: '16px',
                transition: 'opacity 0.35s ease',
                opacity: visible ? 1 : 0,
              }}
            >
              {/* User message */}
              <div className="flex justify-end chat-msg">
                <div
                  className="font-sans"
                  style={{
                    background: '#F3F4F6',
                    borderRadius: '16px 16px 4px 16px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    color: '#111',
                    maxWidth: '82%',
                    lineHeight: 1.5,
                  }}
                >
                  {chat.query}
                </div>
              </div>

              {/* Search indicator */}
              <div
                className="flex items-center gap-2 mt-3 chat-msg"
                style={{
                  background: 'rgba(0,181,173,0.07)',
                  border: '1px solid rgba(0,181,173,0.2)',
                  borderRadius: '8px',
                  padding: '7px 11px',
                  width: 'fit-content',
                  animationDelay: '0.1s',
                }}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00B5AD"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ flexShrink: 0, animation: 'spin 1.5s linear infinite' }}
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                <span className="font-sans" style={{ fontSize: '11px', color: '#00B5AD' }}>
                  {chat.source}
                </span>
              </div>

              {/* Agent message */}
              <div className="flex gap-2 mt-3 chat-msg" style={{ animationDelay: '0.2s' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#0D2E35',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span className="font-sans font-bold italic" style={{ fontSize: '7px', color: '#00B5AD' }}>vi</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p className="font-sans" style={{ fontSize: '13px', color: '#111', lineHeight: 1.6, marginBottom: '8px' }}>
                    {chat.answer}
                  </p>
                  <span
                    className="font-sans"
                    style={{
                      display: 'inline-block',
                      fontSize: '10px',
                      color: '#0D2E35',
                      backgroundColor: 'rgba(13,46,53,0.07)',
                      border: '1px solid rgba(13,46,53,0.12)',
                      borderRadius: '5px',
                      padding: '2px 8px',
                    }}
                  >
                    {chat.ref}
                  </span>
                </div>
              </div>
            </div>

            {/* Input bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ backgroundColor: '#F9FAFB', borderTop: '1px solid #E5E7EB' }}
            >
              <span className="font-sans flex-1" style={{ fontSize: '13px', color: '#9CA3AF' }}>Escribe tu consulta...</span>
              <div
                style={{ backgroundColor: '#00B5AD', borderRadius: '8px', padding: '6px', flexShrink: 0 }}
                className="flex items-center justify-center"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — features */}
        <div>
          <p
            className="font-sans font-semibold mb-3"
            style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#00B5AD', textTransform: 'uppercase' }}
          >
            Respuestas verificadas
          </p>
          <h2
            className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', color: '#0D2E35', lineHeight: 1.15, letterSpacing: '-0.03em' }}
          >
            Respuestas fiables, conectadas a la normativa en tiempo real
          </h2>
          <p className="font-sans mb-8" style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.7, maxWidth: '440px' }}>
            Cada respuesta de Victoria cita la fuente oficial. Sin alucinaciones, sin normativa desactualizada.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {FEATURES.map((f) => (
              <div key={f} className="flex items-start gap-3">
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,181,173,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00B5AD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="font-sans" style={{ fontSize: '14px', color: '#374151', lineHeight: 1.6 }}>
                  {f}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            <a
              href="/login"
              className="font-sans font-bold"
              style={{
                color: '#FFFFFF',
                backgroundColor: '#00B5AD',
                padding: '12px 28px',
                borderRadius: '10px',
                fontSize: '14px',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
            >
              Hablar con Victoria →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
