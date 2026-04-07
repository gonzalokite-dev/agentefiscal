const sources = [
  {
    code: 'BOE',
    name: 'Boletín Oficial del Estado',
    description:
      'Leyes, reglamentos y reales decretos tributarios vigentes. El agente consulta siempre la versión consolidada más reciente.',
    color: '#002A3A',
  },
  {
    code: 'DGT',
    name: 'Dirección General de Tributos',
    description:
      'Consultas vinculantes y doctrina administrativa. Miles de resoluciones accesibles en tiempo real para fundamentar cada respuesta.',
    color: '#003F5C',
  },
  {
    code: 'AEAT',
    name: 'Agencia Tributaria',
    description:
      'Modelos tributarios, instrucciones de cumplimentación, criterios de comprobación y procedimientos administrativos.',
    color: '#005073',
  },
  {
    code: 'IB',
    name: 'Normativa Autonómica Balear',
    description:
      'Compilació de Dret Civil, tipos propios de ITP e ISD, deducciones autonómicas, ecotasa y legislación específica de Illes Balears.',
    color: '#006080',
  },
];

export default function KnowledgeLoop() {
  return (
    <section
      className="py-20 px-6"
      style={{
        background:
          'radial-gradient(ellipse at 20% 80%, rgba(234,170,0,0.08) 0%, transparent 50%), #002A3A',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '1100px' }}>
        <p
          className="font-sans font-medium mb-3"
          style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#EAAA00', textTransform: 'uppercase' }}
        >
          Fuentes de conocimiento
        </p>
        <h2
          className="font-sans font-bold text-white mb-3"
          style={{ fontSize: '40px', lineHeight: 1.1, letterSpacing: '-0.025em' }}
        >
          Conocimiento fiscal en tiempo real
        </h2>
        <p
          className="font-sans mb-12"
          style={{ fontSize: '16px', color: '#D7D2CB', maxWidth: '540px', lineHeight: 1.7 }}
        >
          Cada respuesta se fundamenta en fuentes primarias consultadas en el momento de la pregunta,
          no en un modelo entrenado con datos estáticos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {sources.map((src) => (
            <div
              key={src.code}
              className="p-6 rounded-xl"
              style={{
                border: '1px solid rgba(215,210,203,0.15)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.05)';
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex items-center justify-center flex-shrink-0 rounded-lg"
                  style={{
                    width: '44px',
                    height: '44px',
                    backgroundColor: 'rgba(234,170,0,0.12)',
                    border: '1px solid rgba(234,170,0,0.25)',
                  }}
                >
                  <span
                    className="font-sans font-bold"
                    style={{ fontSize: '11px', color: '#EAAA00', letterSpacing: '0.02em' }}
                  >
                    {src.code}
                  </span>
                </div>
                <div>
                  <p
                    className="font-sans font-semibold text-white mb-1"
                    style={{ fontSize: '14px' }}
                  >
                    {src.name}
                  </p>
                  <p
                    className="font-sans"
                    style={{ fontSize: '13px', color: '#D7D2CB', lineHeight: 1.65 }}
                  >
                    {src.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real-time note */}
        <div
          className="flex items-start gap-3 rounded-lg p-4"
          style={{
            background: 'rgba(234,170,0,0.08)',
            border: '1px solid rgba(234,170,0,0.3)',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#EAAA00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0, marginTop: '2px' }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="font-sans" style={{ fontSize: '13px', color: '#D7D2CB', lineHeight: 1.7 }}>
            El agente busca en estas fuentes en el momento de cada consulta. Nunca genera normativa de memoria:
            si no encuentra una referencia fiable, lo indica explícitamente y recomienda contrastar con
            la fuente oficial.
          </p>
        </div>
      </div>
    </section>
  );
}
