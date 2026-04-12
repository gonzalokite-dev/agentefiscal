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
      'Lo usamos sobre todo para ITP balear y pactos sucesorios. La normativa autonómica siempre fue el punto débil de los genéricos. Victoria la tiene integrada y con referencias.',
    name: 'Despacho Jurídico Menorca',
    role: 'Gestor fiscal · Maó',
    initial: 'M',
  },
  {
    quote:
      'Un cliente nos envió una liquidación de la AEAT por WhatsApp un viernes a las 7pm. Subimos el PDF, el agente detectó el error de cálculo y tuvimos el borrador de recurso listo en 12 minutos.',
    name: 'Bufete Eivissa & Associats',
    role: 'Socio fundador · Eivissa',
    initial: 'E',
  },
];

export default function Testimonials() {
  return (
    <section style={{ backgroundColor: '#F7F9FA', paddingTop: '96px', paddingBottom: '96px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '52px' }}>
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
            Despachos en Baleares
          </p>
          <h2
            className="font-sans"
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800,
              color: '#0D2E35',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              maxWidth: '560px',
            }}
          >
            Lo que dicen los asesores que lo usan cada día
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
                padding: '32px',
                border: '1px solid #E5E7EB',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {/* Quote mark */}
              <div
                style={{
                  fontSize: '42px',
                  lineHeight: 1,
                  color: '#00B5AD',
                  fontFamily: 'Georgia, serif',
                  opacity: 0.6,
                  marginTop: '-8px',
                }}
              >
                "
              </div>

              {/* Quote text */}
              <p
                className="font-sans"
                style={{
                  fontSize: '15px',
                  color: '#0D2E35',
                  lineHeight: 1.75,
                  flex: 1,
                  marginTop: '-16px',
                }}
              >
                {t.quote}
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                  <p className="font-sans" style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>
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
            color: 'rgba(95,94,90,0.6)',
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
