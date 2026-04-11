const items = [
  {
    task: 'Localizar la consulta vinculante DGT relevante para un caso',
    before: '45 min',
    after: '30 seg',
  },
  {
    task: 'Verificar el tipo autonómico de ITP vigente en Baleares',
    before: '20 min',
    after: '10 seg',
  },
  {
    task: 'Calcular la retención de una transmisión inmobiliaria de no residente',
    before: '30 min',
    after: '45 seg',
  },
  {
    task: 'Redactar un recurso de reposición estándar contra una liquidación',
    before: '2–3 h',
    after: '15 min',
  },
];

export default function PainPoints() {
  return (
    <section style={{ backgroundColor: '#002A3A', paddingTop: '96px', paddingBottom: '96px' }}>
      <div style={{ maxWidth: '920px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '52px' }}>
          <p
            className="font-sans"
            style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#EAAA00', textTransform: 'uppercase', fontWeight: 600, marginBottom: '14px' }}
          >
            El tiempo que consumes buscando
          </p>
          <h2
            className="font-sans"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.15, maxWidth: '580px' }}
          >
            Cada consulta que tardas horas en resolver,<br className="hidden md:inline" /> resuelta en segundos.
          </h2>
        </div>

        {/* Comparison rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 90px 90px',
                alignItems: 'center',
                gap: '16px',
                backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'transparent',
                borderRadius: '10px',
                padding: '16px 20px',
              }}
            >
              <p className="font-sans" style={{ fontSize: '14px', color: '#D7D2CB', lineHeight: 1.5 }}>
                {item.task}
              </p>
              <div style={{ textAlign: 'center' }}>
                <span
                  className="font-sans"
                  style={{ fontSize: '15px', fontWeight: 700, color: 'rgba(215,210,203,0.35)', textDecoration: 'line-through', textDecorationColor: 'rgba(215,210,203,0.3)' }}
                >
                  {item.before}
                </span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span
                  className="font-sans"
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#EAAA00',
                    backgroundColor: 'rgba(234,170,0,0.12)',
                    padding: '3px 10px',
                    borderRadius: '20px',
                  }}
                >
                  {item.after}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Column labels */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 90px 90px',
            gap: '16px',
            padding: '10px 20px 0',
          }}
        >
          <div />
          <p className="font-sans" style={{ fontSize: '11px', color: 'rgba(215,210,203,0.35)', textAlign: 'center', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Antes
          </p>
          <p className="font-sans" style={{ fontSize: '11px', color: 'rgba(234,170,0,0.6)', textAlign: 'center', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Con AsesorIA
          </p>
        </div>

      </div>
    </section>
  );
}
