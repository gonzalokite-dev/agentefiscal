/* Barra de fuentes oficiales */
export default function TrustBar() {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #F0F0F0',
        borderBottom: '1px solid #F0F0F0',
        padding: '28px 24px',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p
          className="font-sans text-center"
          style={{
            fontSize: '11px',
            color: '#9CA3AF',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '20px',
            fontWeight: 500,
          }}
        >
          Conectado en tiempo real con las fuentes oficiales
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
            flexWrap: 'wrap',
          }}
        >
          {/* BOE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.75 }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                backgroundColor: '#1B1464',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span className="font-sans" style={{ fontSize: '9px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.08em' }}>BOE</span>
            </div>
            <div>
              <p className="font-sans" style={{ fontSize: '11px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2 }}>BOE</p>
              <p className="font-sans" style={{ fontSize: '10px', color: '#9CA3AF', lineHeight: 1.2 }}>Boletín Oficial del Estado</p>
            </div>
          </div>

          <div style={{ width: '1px', height: '36px', backgroundColor: '#E5E7EB', flexShrink: 0 }} />

          {/* Agencia Tributaria */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.75 }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                backgroundColor: '#C00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" fillOpacity="0.9" />
                <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <div>
              <p className="font-sans" style={{ fontSize: '11px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2 }}>Agencia Tributaria</p>
              <p className="font-sans" style={{ fontSize: '10px', color: '#9CA3AF', lineHeight: 1.2 }}>AEAT · Sede electrónica</p>
            </div>
          </div>

          <div style={{ width: '1px', height: '36px', backgroundColor: '#E5E7EB', flexShrink: 0 }} />

          {/* DGT */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.75 }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                backgroundColor: '#0D2E35',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span className="font-sans" style={{ fontSize: '9px', fontWeight: 800, color: '#00B5AD', letterSpacing: '0.05em' }}>DGT</span>
            </div>
            <div>
              <p className="font-sans" style={{ fontSize: '11px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2 }}>DGT</p>
              <p className="font-sans" style={{ fontSize: '10px', color: '#9CA3AF', lineHeight: 1.2 }}>Consultas vinculantes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
