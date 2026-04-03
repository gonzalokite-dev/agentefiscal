export default function CtaFinal() {
  return (
    <section
      className="flex flex-col items-center justify-center text-center px-6"
      style={{
        background:
          'radial-gradient(ellipse at 30% 70%, rgba(234,170,0,0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(0,80,120,0.3) 0%, transparent 50%), #001824',
        paddingTop: '128px',
        paddingBottom: '128px',
      }}
    >
      <p
        className="font-sans font-medium mb-5"
        style={{
          fontSize: '11px',
          letterSpacing: '0.14em',
          color: '#EAAA00',
          textTransform: 'uppercase',
        }}
      >
        Disponible para todo el equipo
      </p>

      <h2
        className="font-serif font-semibold text-white mb-5"
        style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.15, maxWidth: '640px' }}
      >
        El despacho que trabaja con inteligencia
      </h2>

      <p
        className="font-sans mb-10"
        style={{
          fontSize: '17px',
          color: '#D7D2CB',
          maxWidth: '520px',
          lineHeight: 1.75,
        }}
      >
        Accede al chat y formula tu primera consulta. El agente está disponible en todo momento
        para todo el equipo de Benavides Asociados.
      </p>

      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <a
          href="/chat"
          className="font-sans font-medium transition-opacity hover:opacity-90"
          style={{
            backgroundColor: '#EAAA00',
            color: '#002A3A',
            padding: '15px 36px',
            borderRadius: '8px',
            fontSize: '15px',
            textDecoration: 'none',
          }}
        >
          Abrir el agente →
        </a>
        <a
          href="#capacidades"
          className="font-sans font-medium transition-opacity hover:opacity-80"
          style={{
            background: 'transparent',
            border: '1px solid rgba(215,210,203,0.35)',
            color: '#D7D2CB',
            padding: '15px 36px',
            borderRadius: '8px',
            fontSize: '15px',
            textDecoration: 'none',
          }}
        >
          Ver capacidades
        </a>
      </div>

      <p
        className="font-sans"
        style={{ fontSize: '13px', color: 'rgba(215,210,203,0.5)' }}
      >
        Sin límite de consultas
        <span style={{ margin: '0 8px', color: '#EAAA00' }}>·</span>
        Responde en segundos
        <span style={{ margin: '0 8px', color: '#EAAA00' }}>·</span>
        Historial guardado
      </p>
    </section>
  );
}
