'use client';
import { useState } from 'react';

const FEATURES = [
  'Chat fiscal ilimitado',
  'Consultas DGT · BOE · AEAT en tiempo real',
  'Normativa de todas las CCAA',
  'Subida y análisis de documentos PDF',
  'Redacción de recursos y alegaciones',
  'Historial completo de conversaciones',
  'Actualizaciones automáticas de normativa',
  'Soporte prioritario',
];

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00B5AD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  // Monthly launch price → regular
  const monthlyOffer = 9.99;
  const monthlyRegular = 24.99;

  // Annual: 20% off on each
  const annualOfferMonthly = parseFloat((monthlyOffer * 12 * 0.8 / 12).toFixed(2)); // 7.99
  const annualOfferTotal = parseFloat((monthlyOffer * 12 * 0.8).toFixed(2));         // 95.90
  const annualRegularMonthly = parseFloat((monthlyRegular * 12 * 0.8 / 12).toFixed(2)); // 19.99
  const annualRegularTotal = parseFloat((monthlyRegular * 12 * 0.8).toFixed(2));         // 239.88

  const displayPrice = annual ? annualOfferMonthly : monthlyOffer;
  const strikePrice  = annual ? annualRegularMonthly : monthlyRegular;
  const annualTotal  = annual ? annualOfferTotal : null;

  return (
    <section id="planes" style={{ backgroundColor: '#F9FAFB', paddingTop: '96px', paddingBottom: '96px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
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
            Precio único, todo incluido
          </h2>
          <p
            className="font-sans"
            style={{ fontSize: '16px', color: '#6B7280', maxWidth: '440px', margin: '0 auto', lineHeight: 1.7 }}
          >
            14 días de prueba gratis. Sin tarjeta de crédito.
          </p>
        </div>

        {/* Billing toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div
            style={{
              display: 'inline-flex',
              backgroundColor: '#E5E7EB',
              borderRadius: '9999px',
              padding: '4px',
              gap: '2px',
            }}
          >
            {(['Mensual', 'Anual'] as const).map((label) => {
              const isActive = label === 'Anual' ? annual : !annual;
              return (
                <button
                  key={label}
                  onClick={() => setAnnual(label === 'Anual')}
                  className="font-sans font-semibold"
                  style={{
                    padding: '7px 20px',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '13px',
                    transition: 'background-color 0.2s, color 0.2s',
                    backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                    color: isActive ? '#0D2E35' : '#6B7280',
                    boxShadow: isActive ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {label}
                  {label === 'Anual' && (
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        backgroundColor: isActive ? '#00B5AD' : '#D1FAF8',
                        color: isActive ? '#FFFFFF' : '#00817C',
                        padding: '2px 7px',
                        borderRadius: '9999px',
                      }}
                    >
                      −20%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Single plan card */}
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <div
            style={{
              backgroundColor: '#0D2E35',
              borderRadius: '24px',
              padding: '44px 40px',
              boxShadow: '0 32px 80px rgba(13,46,53,0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle background glow */}
            <div style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,181,173,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Launch badge */}
            <div style={{ marginBottom: '24px' }}>
              <span
                className="font-sans font-semibold"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#00B5AD',
                  backgroundColor: 'rgba(0,181,173,0.12)',
                  border: '1px solid rgba(0,181,173,0.3)',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                }}
              >
                Precio de lanzamiento
              </span>
            </div>

            {/* Price */}
            <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
              <span
                className="font-serif font-bold"
                style={{ fontSize: '64px', lineHeight: 1, color: '#FFFFFF', letterSpacing: '-0.04em' }}
              >
                {displayPrice.toFixed(2).replace('.', ',')}€
              </span>
              <div style={{ marginBottom: '10px' }}>
                <div
                  className="font-sans"
                  style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through', lineHeight: 1.2 }}
                >
                  {strikePrice.toFixed(2).replace('.', ',')}€
                </div>
                <div
                  className="font-sans"
                  style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}
                >
                  /mes
                </div>
              </div>
            </div>

            {/* Annual total */}
            {annualTotal && (
              <p
                className="font-sans"
                style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginBottom: '28px' }}
              >
                Facturado anualmente · {annualTotal.toFixed(2).replace('.', ',')}€/año
              </p>
            )}
            {!annualTotal && (
              <p
                className="font-sans"
                style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginBottom: '28px' }}
              >
                Facturado mensualmente
              </p>
            )}

            {/* CTA */}
            <a
              href="/login"
              className="font-sans font-bold"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '14px 20px',
                borderRadius: '12px',
                fontSize: '15px',
                textDecoration: 'none',
                marginBottom: '32px',
                backgroundColor: '#00B5AD',
                color: '#FFFFFF',
                boxShadow: '0 4px 20px rgba(0,181,173,0.4)',
                transition: 'opacity 0.2s, transform 0.15s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '0.88';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '1';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              Empieza gratis 14 días
            </a>

            {/* Divider */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: '24px' }} />

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {FEATURES.map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckIcon />
                  <span
                    className="font-sans"
                    style={{ fontSize: '14px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.4 }}
                  >
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p
          className="font-sans"
          style={{ textAlign: 'center', marginTop: '32px', fontSize: '13px', color: '#9CA3AF' }}
        >
          Sin tarjeta de crédito · Cancela cuando quieras · Actualizaciones incluidas
        </p>

      </div>
    </section>
  );
}
