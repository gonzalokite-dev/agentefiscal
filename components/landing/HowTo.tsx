const scenarios = [
  {
    n: 1,
    tag: 'Consulta urgente',
    title: 'Un cliente llama con una duda que no puedes dejar para mañana',
    description:
      'Indicas al agente quién es el contribuyente (residente, tipo de operación, comunidad). En segundos tienes la respuesta fundamentada con la consulta vinculante DGT relevante. Atiendes al cliente con criterio antes de colgar.',
    detail: 'IRPF · IVA · IRNR · ITP · ISD',
  },
  {
    n: 2,
    tag: 'Expediente AEAT',
    title: 'Recibes una liquidación o requerimiento de la AEAT',
    description:
      'Subes el PDF directamente al chat. El agente lee el expediente, identifica el fundamento legal de la liquidación y detecta los motivos de recurso. Genera un borrador de alegaciones o recurso de reposición listo para revisar y firmar.',
    detail: 'Recursos · Alegaciones · Comprobaciones limitadas',
  },
  {
    n: 3,
    tag: 'Cierre de operación',
    title: 'Preparas una escritura de compraventa o una operación compleja',
    description:
      'El agente calcula ITP/AJD, verifica retenciones de no residentes, alerta sobre plusvalía municipal y revisa requisitos formales. Toda la fiscalidad de la operación en un solo análisis, con normativa balear incluida.',
    detail: 'ITP · Plusvalía · No residentes · Normativa balear',
  },
];

const docTypes = [
  'Facturas (PDF, imagen)',
  'Escrituras de compraventa',
  'Contratos de arrendamiento',
  'Liquidaciones de la AEAT',
  'Nóminas y certificados',
  'Modelos tributarios presentados',
];

export default function HowTo() {
  return (
    <section id="como-funciona" className="py-24 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="mx-auto" style={{ maxWidth: '1100px' }}>

        {/* Header */}
        <div className="mb-14">
          <p
            className="font-sans font-medium mb-3"
            style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#00B5AD', textTransform: 'uppercase' }}
          >
            Casos de uso reales
          </p>
          <h2
            className="font-sans font-bold mb-3"
            style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: '#0D2E35', lineHeight: 1.1, letterSpacing: '-0.03em' }}
          >
            Cómo lo usan los despachos cada día
          </h2>
          <p className="font-sans" style={{ fontSize: '15px', color: '#6B7280', maxWidth: '520px', lineHeight: 1.7 }}>
            Tres situaciones habituales del despacho donde Victoria multiplica la capacidad del equipo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* LEFT — scenarios */}
          <div className="flex flex-col gap-0">
            {scenarios.map((s, idx) => (
              <div key={s.n} className="flex gap-5">
                {/* Number + connector */}
                <div className="flex flex-col items-center">
                  <div
                    className="flex items-center justify-center rounded-full font-sans font-semibold flex-shrink-0"
                    style={{
                      width: '36px',
                      height: '36px',
                      backgroundColor: s.n === 1 ? '#00B5AD' : '#0D2E35',
                      color: '#FFFFFF',
                      fontSize: '14px',
                    }}
                  >
                    {s.n}
                  </div>
                  {idx < scenarios.length - 1 && (
                    <div style={{ width: '2px', flex: 1, borderLeft: '2px dashed rgba(13,46,53,0.15)', margin: '4px 0', minHeight: '48px' }} />
                  )}
                </div>

                {/* Content */}
                <div className="pb-10">
                  <span
                    className="font-sans inline-block mb-2"
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#00B5AD',
                      backgroundColor: 'rgba(0,181,173,0.1)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {s.tag}
                  </span>
                  <h3 className="font-serif font-semibold mb-2" style={{ fontSize: '16px', color: '#0D2E35', lineHeight: 1.4 }}>
                    {s.title}
                  </h3>
                  <p className="font-sans mb-3" style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.7 }}>
                    {s.description}
                  </p>
                  <span className="font-sans" style={{ fontSize: '12px', color: 'rgba(13,46,53,0.45)' }}>
                    {s.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — doc card sticky */}
          <div className="hidden lg:block">
            <div className="rounded-2xl p-6" style={{ backgroundColor: '#F7F6F4', border: '1px solid #E2DED9', position: 'sticky', top: '88px' }}>
              <p className="font-sans font-semibold mb-4" style={{ fontSize: '13px', color: '#0D2E35' }}>
                Documentos que puedes adjuntar
              </p>
              <div className="flex flex-col gap-3 mb-6">
                {docTypes.map((doc) => (
                  <div key={doc} className="flex items-center gap-3">
                    <span className="font-sans font-semibold flex-shrink-0" style={{ fontSize: '14px', color: '#00B5AD' }}>✓</span>
                    <span className="font-sans" style={{ fontSize: '14px', color: '#0D2E35' }}>{doc}</span>
                  </div>
                ))}
              </div>
              <div
                className="rounded-lg p-3 font-sans"
                style={{ backgroundColor: 'rgba(0,181,173,0.07)', border: '1px solid rgba(0,181,173,0.2)', fontSize: '12px', color: '#6B7280', lineHeight: 1.65 }}
              >
                El agente extrae automáticamente los datos fiscalmente relevantes y alerta sobre posibles errores o incumplimientos.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
