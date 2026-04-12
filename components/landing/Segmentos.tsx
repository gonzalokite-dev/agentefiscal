const segments = [
  {
    tag: 'Despacho Fiscal',
    title: 'Responde al cliente antes de que cuelgue el teléfono.',
    description:
      'Consultas vinculantes DGT al instante, cálculos de ITP y IRPF desglosados, y recursos de reposición redactados en minutos.',
    bg: 'linear-gradient(145deg, #0A2028 0%, #003050 60%, #0A2028 100%)',
    accent: '#00B5AD',
    features: ['Consultas DGT en tiempo real', 'IRPF · ITP · ISD · IS', 'Recursos y alegaciones'],
  },
  {
    tag: 'Gestoría',
    title: 'Gestiona más expedientes con el mismo equipo.',
    description:
      'Analiza facturas y contratos en segundos, verifica tipos impositivos de cualquier comunidad autónoma y genera comunicaciones con la AEAT sin salir del chat.',
    bg: 'linear-gradient(145deg, #001E20 0%, #00404A 60%, #001E20 100%)',
    accent: '#14b8a6',
    features: ['Análisis de documentos PDF', 'IVA · Retenciones · Modelos', 'Comunicaciones AEAT'],
  },
  {
    tag: 'Asesoría Tributaria',
    title: 'Normativa estatal y autonómica, sin excepciones.',
    description:
      'Deducciones autonómicas, impuestos propios de cada comunidad y normativa estatal integrados en cada respuesta. Toda España cubierta.',
    bg: 'linear-gradient(145deg, #001428 0%, #002A5E 60%, #001428 100%)',
    accent: '#3b82f6',
    features: ['Normativa de todas las CCAA', 'Deducciones autonómicas', 'Impuestos propios autonómicos'],
  },
];

export default function Segmentos() {
  return (
    <section style={{ backgroundColor: '#FFFFFF', paddingTop: '96px', paddingBottom: '96px' }}>
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
            Para quién
          </p>
          <h2
            className="font-sans font-bold"
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              color: '#0D2E35',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              maxWidth: '560px',
            }}
          >
            Diseñado para Asesorías fiscales y Gestorías.
          </h2>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {segments.map((seg, idx) => (
            <div
              key={idx}
              className="cap-card"
              style={{
                background: seg.bg,
                borderRadius: '20px',
                padding: '36px 32px',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                minHeight: '320px',
              }}
            >
              {/* Tag */}
              <span
                className="font-sans font-semibold"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: seg.accent,
                  backgroundColor: `${seg.accent}18`,
                  border: `1px solid ${seg.accent}35`,
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  alignSelf: 'flex-start',
                }}
              >
                {seg.tag}
              </span>

              {/* Title */}
              <h3
                className="serif"
                style={{
                  fontSize: 'clamp(20px, 2.5vw, 24px)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  lineHeight: 1.25,
                  letterSpacing: '-0.01em',
                }}
              >
                {seg.title}
              </h3>

              {/* Description */}
              <p
                className="font-sans"
                style={{
                  fontSize: '14px',
                  color: 'rgba(215,210,203,0.75)',
                  lineHeight: 1.7,
                  flex: 1,
                }}
              >
                {seg.description}
              </p>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {seg.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: seg.accent, flexShrink: 0 }} />
                    <span className="font-sans" style={{ fontSize: '12px', color: 'rgba(215,210,203,0.65)', letterSpacing: '0.01em' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
