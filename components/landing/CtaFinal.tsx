export default function CtaFinal() {
  return (
    <section
      className="flex flex-col items-center justify-center text-center px-6"
      style={{ backgroundColor: '#002A3A', paddingTop: '96px', paddingBottom: '96px' }}
    >
      <h2
        className="font-serif font-semibold text-white mb-4"
        style={{ fontSize: 'clamp(28px, 4vw, 36px)' }}
      >
        ¿Listo para empezar?
      </h2>
      <p
        className="font-sans mb-8"
        style={{ fontSize: '16px', color: '#D7D2CB', maxWidth: '480px', lineHeight: 1.7 }}
      >
        Accede al chat y formula tu primera consulta. El agente está disponible para todo el equipo
        en todo momento.
      </p>
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
        Iniciar chat con el Agente Fiscal →
      </a>
    </section>
  );
}
