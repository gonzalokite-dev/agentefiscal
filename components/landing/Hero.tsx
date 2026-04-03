'use client';

export default function Hero() {
  const scrollToCapabilities = () => {
    document.getElementById('capacidades')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="flex flex-col items-center justify-center text-center py-24 px-6"
      style={{ backgroundColor: '#002A3A' }}
    >
      <p
        className="font-sans font-medium mb-6"
        style={{
          fontSize: '11px',
          letterSpacing: '0.14em',
          color: '#EAAA00',
          textTransform: 'uppercase',
        }}
      >
        Agente Fiscal IA · Benavides Asociados
      </p>

      <h1
        className="font-serif font-semibold text-white mb-6"
        style={{ fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.2, maxWidth: '640px' }}
      >
        Tu asesor fiscal senior,
        <br />
        disponible al{' '}
        <span style={{ color: '#EAAA00' }}>instante</span>
      </h1>

      <p
        className="font-sans mb-9"
        style={{
          fontSize: '16px',
          color: '#D7D2CB',
          maxWidth: '520px',
          lineHeight: 1.7,
        }}
      >
        Consultas técnicas, análisis de documentos, cálculos fiscales y borradores de escritos.
        Especializado en fiscalidad española y normativa de Illes Balears.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <a
          href="/chat"
          className="font-sans font-medium transition-opacity hover:opacity-90"
          style={{
            backgroundColor: '#EAAA00',
            color: '#002A3A',
            padding: '14px 32px',
            borderRadius: '6px',
            fontSize: '15px',
            textDecoration: 'none',
          }}
        >
          Iniciar chat →
        </a>
        <button
          onClick={scrollToCapabilities}
          className="font-sans font-medium transition-opacity hover:opacity-80"
          style={{
            background: 'transparent',
            border: '1px solid rgba(215,210,203,0.4)',
            color: '#D7D2CB',
            padding: '14px 32px',
            borderRadius: '6px',
            fontSize: '15px',
            cursor: 'pointer',
          }}
        >
          Ver capacidades
        </button>
      </div>
    </section>
  );
}
