'use client';

import { useState, useEffect } from 'react';

const CHATS = [
  {
    query: '¿Tributa en IRPF el pacto sucesorio de una finca en Pollença?',
    answer: 'No. Los pactos sucesorios de la Compilació de Dret Civil de les Illes Balears no generan ganancia patrimonial en IRPF para el transmitente. Confirmado en V0021-24.',
    source: 'Consultando DGT · hacienda.gob.es',
  },
  {
    query: '¿Cuál es el tipo de ITP en Illes Balears para 350.000€?',
    answer: 'El tipo aplicable es del 8%. Para inmuebles hasta 400.000€ la escala balear aplica el tipo reducido del 8%, según la Ley 11/2023 de Illes Balears.',
    source: 'Consultando BOE · boe.es',
  },
  {
    query: '¿Cómo calculo la retención de un no residente en venta de inmueble?',
    answer: 'La retención es del 3% sobre el precio de transmisión. El comprador debe ingresar el importe en el modelo 211, conforme al art. 25.2 TRLIRNR.',
    source: 'Consultando AEAT · agenciatributaria.gob.es',
  },
];

const TRUST_ITEMS = [
  'Resolución en el momento',
  'Interpretaciones complejas',
  'Seguro y confiable',
];

export default function Hero() {
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
    <section className="py-16 px-5 md:py-28 md:px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        style={{ maxWidth: '1200px' }}
      >
        {/* LEFT */}
        <div>
          {/* Badge */}
          <div
            className="font-sans inline-flex items-center gap-2 mb-6"
            style={{
              fontSize: '12px',
              color: '#374151',
              border: '1px solid #E5E7EB',
              borderRadius: '9999px',
              padding: '5px 14px',
              backgroundColor: '#F9FAFB',
            }}
          >
            <span style={{ position: 'relative', display: 'inline-flex', width: '8px', height: '8px', flexShrink: 0 }}>
              <span style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                backgroundColor: '#22c55e',
                animation: 'ping 1.8s cubic-bezier(0,0,0.2,1) infinite', opacity: 0.5,
              }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
            </span>
            4 despachos de Baleares · 20 asesores activos
          </div>

          {/* Headline */}
          <h1
            className="font-sans font-bold mb-5"
            style={{ fontSize: 'clamp(36px, 5.5vw, 60px)', lineHeight: 1.06, letterSpacing: '-0.03em', color: '#0D2E35' }}
          >
            El copiloto fiscal<br />
            para asesorías<br />
            <span style={{ color: '#00B5AD' }}>y gestorías</span>
          </h1>

          <p
            className="font-sans mb-8"
            style={{ fontSize: '17px', color: '#6B7280', maxWidth: '460px', lineHeight: 1.7 }}
          >
            Victoria es tu asistente fiscal inteligente. Resuelve consultas,
            interpreta normativa y te ayuda a tomar mejores decisiones para tus clientes.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href="/login"
              className="font-sans font-bold"
              style={{
                color: '#FFFFFF',
                backgroundColor: '#00B5AD',
                padding: '14px 32px',
                borderRadius: '10px',
                fontSize: '15px',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'opacity 0.2s, transform 0.15s',
                boxShadow: '0 4px 14px rgba(0,181,173,0.3)',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Hablar con Victoria →
            </a>
            <button
              onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-sans font-medium"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#6B7280',
                padding: '14px 20px',
                fontSize: '15px',
                cursor: 'pointer',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              Ver cómo funciona
            </button>
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-2">
            {TRUST_ITEMS.map((label) => (
              <span
                key={label}
                className="font-sans flex items-center gap-1.5"
                style={{
                  fontSize: '12px',
                  color: '#374151',
                  border: '1px solid #E5E7EB',
                  borderRadius: '9999px',
                  padding: '4px 12px',
                  backgroundColor: '#F9FAFB',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — chat mockup */}
        <div className="flex justify-center lg:justify-end">
          <div
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(13,46,53,0.12), 0 0 0 1px rgba(0,0,0,0.06)',
              maxWidth: '460px',
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
              <span
                className="absolute left-1/2 font-sans italic font-bold"
                style={{ transform: 'translateX(-50%)', fontSize: '11px', color: '#374151' }}
              >
                <span style={{ color: '#0D2E35' }}>victor</span><span style={{ color: '#00B5AD' }}>ia</span>
              </span>
              <div
                className="absolute right-3 flex items-center gap-1"
                style={{ fontSize: '10px', color: '#22c55e', fontFamily: 'Sora, sans-serif' }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
                En línea
              </div>
            </div>

            {/* Chat area */}
            <div
              style={{
                height: 'clamp(260px, 42vw, 360px)',
                overflow: 'hidden',
                padding: '18px',
                backgroundColor: '#fff',
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
                  padding: '6px 10px',
                  width: 'fit-content',
                  animationDelay: '0.1s',
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00B5AD" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, animation: 'spin 1.5s linear infinite' }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                <span className="font-sans" style={{ fontSize: '11px', color: '#00B5AD' }}>{chat.source}</span>
              </div>

              {/* Response */}
              <div className="flex gap-2 mt-3 chat-msg" style={{ animationDelay: '0.2s' }}>
                <div
                  style={{
                    width: '22px', height: '22px', borderRadius: '50%',
                    backgroundColor: '#0D2E35', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', flexShrink: 0, marginTop: '2px',
                  }}
                >
                  <span className="font-sans font-bold italic" style={{ fontSize: '7px', color: '#00B5AD' }}>vi</span>
                </div>
                <div className="font-sans" style={{ fontSize: '13px', color: '#111', lineHeight: 1.6, flex: 1 }}>
                  {chat.answer}
                </div>
              </div>
            </div>

            {/* Input bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ backgroundColor: '#F9FAFB', borderTop: '1px solid #E5E7EB' }}
            >
              <span className="font-sans flex-1" style={{ fontSize: '13px', color: '#9CA3AF' }}>
                Escribe tu consulta...
              </span>
              <div
                className="flex items-center justify-center"
                style={{ backgroundColor: '#00B5AD', borderRadius: '8px', padding: '6px', flexShrink: 0 }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
