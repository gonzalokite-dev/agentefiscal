'use client';

export default function CtaFinal() {
  return (
    <section
      className="flex flex-col items-center justify-center text-center px-6"
      style={{
        background:
          'radial-gradient(ellipse at 30% 70%, rgba(0,181,173,0.18) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(0,70,90,0.3) 0%, transparent 50%), #0D2E35',
        paddingTop: '128px',
        paddingBottom: '128px',
      }}
    >
      <p
        className="font-sans font-medium mb-5"
        style={{
          fontSize: '11px',
          letterSpacing: '0.14em',
          color: '#00B5AD',
          textTransform: 'uppercase',
        }}
      >
        Disponible para todo el equipo
      </p>

      <h2
        className="font-serif font-bold text-white mb-5"
        style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1, maxWidth: '640px', letterSpacing: '-0.03em' }}
      >
        Trabaja mejor. Un mejor servicio.<br />Haz crecer tu asesoría.
      </h2>

      <p
        className="font-sans mb-10"
        style={{
          fontSize: '17px',
          color: 'rgba(255,255,255,0.7)',
          maxWidth: '520px',
          lineHeight: 1.75,
        }}
      >
        Accede al chat y formula tu primera consulta. Victoria está disponible
        para todo tu equipo, en cualquier momento.
      </p>

      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <a
          href="/login"
          className="font-sans font-bold"
          style={{
            color: '#0D2E35',
            backgroundColor: '#00B5AD',
            padding: '15px 40px',
            borderRadius: '10px',
            fontSize: '15px',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'opacity 0.2s, transform 0.15s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '0.9';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '1';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          }}
        >
          Hablar con Victoria →
        </a>
        <a
          href="#capacidades"
          className="font-sans font-medium"
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.25)',
            color: 'rgba(255,255,255,0.8)',
            padding: '15px 36px',
            borderRadius: '8px',
            fontSize: '15px',
            textDecoration: 'none',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,181,173,0.6)';
            (e.currentTarget as HTMLElement).style.color = '#00B5AD';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)';
            (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)';
          }}
        >
          Ver capacidades
        </a>
      </div>

      <p
        className="font-sans"
        style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}
      >
        Sin límite de consultas
        <span style={{ margin: '0 8px', color: '#00B5AD' }}>·</span>
        Responde en segundos
        <span style={{ margin: '0 8px', color: '#00B5AD' }}>·</span>
        Historial guardado
      </p>
    </section>
  );
}
