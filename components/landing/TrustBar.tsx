const items = [
  'IRPF · IVA · IS · IRNR · ITP · ISD',
  'Normativa Illes Balears',
  'BOE · DGT · AEAT en tiempo real',
  'Análisis de documentos PDF',
  'Borradores de escritos y recursos',
];

export default function TrustBar() {
  return (
    <div
      className="px-6 py-5"
      style={{
        backgroundColor: '#F7F6F4',
        borderTop: '1px solid #E2DED9',
        borderBottom: '1px solid #E2DED9',
      }}
    >
      <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
        {items.map((item, idx) => (
          <div key={item} className="flex items-center gap-2">
            {idx > 0 && (
              <span
                className="hidden md:block"
                style={{ color: 'rgba(0,0,0,0.15)', fontSize: '14px', marginRight: '8px' }}
              >
                |
              </span>
            )}
            <div
              className="flex-shrink-0"
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#EAAA00',
              }}
            />
            <span
              className="font-sans"
              style={{ fontSize: '13px', color: '#5F5E5A' }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
