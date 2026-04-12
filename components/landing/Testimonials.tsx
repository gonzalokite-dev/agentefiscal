const testimonials = [
  {
    quote:
      'Antes tardaba 40 minutos en localizar la consulta DGT relevante para cada caso. Ahora tengo la referencia exacta en 30 segundos. El tiempo que ahorro en una semana es brutal.',
    name: 'Asesoría Palma Centro',
    role: 'Asesor tributario senior · Palma de Mallorca',
    initial: 'P',
  },
  {
    quote:
      'Lo usamos para ITP balear y pactos sucesorios. La normativa autonómica siempre fue el punto débil de los genéricos. Victoria la tiene integrada y con referencias exactas.',
    name: 'Despacho Jurídico Menorca',
    role: 'Gestor fiscal · Maó',
    initial: 'M',
  },
  {
    quote:
      'Un cliente nos envió una liquidación de la AEAT un viernes a las 7pm. Subimos el PDF, Victoria detectó el error y tuvimos el borrador de recurso listo en 12 minutos.',
    name: 'Bufete Eivissa & Associats',
    role: 'Socio fundador · Eivissa',
    initial: 'E',
  },
];

const Stars = () => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="#F59E0B">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function Testimonials() {
  return (
    <section style={{ backgroundColor: '#FFFFFF', paddingTop: '96px', paddingBottom: '96px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '52px', textAlign: 'center' }}>
          <p
            className="font-sans"
            style={{
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: '#00B5AD',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '14px',
            }}
          >
            Testimonios
          </p>
          <h2
            className="font-sans"
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800,
              color: '#0D2E35',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
            }}
          >
            Asesores que ya trabajan con Victoria
          </h2>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="testimonial-card"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '28px',
                border: '1px solid #E5E7EB',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {/* Stars */}
              <Stars />

              {/* Quote text */}
              <p
                className="font-sans"
                style={{
                  fontSize: '14px',
                  color: '#374151',
                  lineHeight: 1.75,
                  flex: 1,
                }}
              >
                "{t.quote}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
                <div
                  className="font-sans font-bold flex items-center justify-center flex-shrink-0"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#0D2E35',
                    color: '#00B5AD',
                    fontSize: '13px',
                  }}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="font-sans font-semibold" style={{ fontSize: '13px', color: '#0D2E35' }}>
                    {t.name}
                  </p>
                  <p className="font-sans" style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p
          className="font-sans"
          style={{
            fontSize: '12px',
            color: '#9CA3AF',
            textAlign: 'center',
            marginTop: '36px',
          }}
        >
          4 despachos activos en Baleares · 20 asesores · Disponible 24/7
        </p>
      </div>
    </section>
  );
}
