/* Barra de fuentes oficiales */
export default function TrustBar() {
  const sources = [
    {
      id: 'boe',
      logo: '/logo-boe.svg',
      alt: 'BOE – Boletín Oficial del Estado',
      label: 'Boletín Oficial del Estado',
      height: 28,
    },
    {
      id: 'aeat',
      logo: '/logo-aeat.svg',
      alt: 'Agencia Tributaria – AEAT',
      label: 'Sede electrónica',
      height: 36,
    },
    {
      id: 'hacienda',
      logo: '/logo-hacienda.svg',
      alt: 'Ministerio de Hacienda – DGT',
      label: 'Consultas vinculantes DGT',
      height: 28,
    },
  ];

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
            marginBottom: '24px',
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
            gap: '48px',
            flexWrap: 'wrap',
          }}
        >
          {sources.map((src, i) => (
            <div key={src.id} style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <img
                  src={src.logo}
                  alt={src.alt}
                  style={{
                    height: `${src.height}px`,
                    width: 'auto',
                    maxWidth: '140px',
                    objectFit: 'contain',
                    filter: 'grayscale(20%)',
                    opacity: 0.82,
                  }}
                />
                <span
                  className="font-sans"
                  style={{ fontSize: '10px', color: '#B0B8C4', letterSpacing: '0.03em' }}
                >
                  {src.label}
                </span>
              </div>

              {i < sources.length - 1 && (
                <div style={{ width: '1px', height: '40px', backgroundColor: '#E5E7EB', flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
