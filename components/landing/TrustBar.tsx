const stats = [
  { value: '4', label: 'Despachos en Baleares', sub: '20 asesores activos' },
  { value: '3', label: 'Fuentes en tiempo real', sub: 'BOE · DGT · AEAT' },
  { value: '6', label: 'Impuestos cubiertos', sub: 'IRPF · IVA · IS · IRNR · ITP · ISD' },
  { value: '24/7', label: 'Siempre disponible', sub: 'Sin colas ni esperas' },
];

export default function TrustBar() {
  return (
    <div
      className="px-6 py-8"
      style={{
        backgroundColor: '#F7F9FA',
        borderTop: '1px solid #E5E7EB',
        borderBottom: '1px solid #E5E7EB',
      }}
    >
      <div
        className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-6"
        style={{ maxWidth: '900px' }}
      >
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <span
              className="font-sans font-bold"
              style={{ fontSize: '32px', color: '#0D2E35', lineHeight: 1, letterSpacing: '-0.03em' }}
            >
              {stat.value}
            </span>
            <span
              className="font-sans font-semibold mt-1"
              style={{ fontSize: '13px', color: '#0D2E35' }}
            >
              {stat.label}
            </span>
            <span
              className="font-sans mt-0.5"
              style={{ fontSize: '11px', color: '#6B7280' }}
            >
              {stat.sub}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
