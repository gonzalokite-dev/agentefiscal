const examples = [
  '¿Un no residente alemán tiene que presentar Modelo 210 por su piso en Palma?',
  'Analiza esta factura intracomunitaria de servicios de software',
  'Calcula la retención en esta transmisión inmobiliaria de no residente',
  '¿Qué reducción aplica en ISD para un hijo residente en Baleares?',
  'Redacta las alegaciones para esta comprobación limitada de IVA',
  '¿Cuándo tributa el alquiler turístico como actividad económica en IRPF?',
];

export default function Examples() {
  return (
    <section className="py-18 px-6" style={{ backgroundColor: '#F7F6F4', paddingTop: '72px', paddingBottom: '72px' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif font-semibold mb-2" style={{ fontSize: '32px', color: '#002A3A' }}>
          Preguntas del día a día
        </h2>
        <p className="font-sans mb-8" style={{ fontSize: '15px', color: '#5F5E5A' }}>
          Consultas reales que el equipo hace al agente.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {examples.map((text) => (
            <div
              key={text}
              className="flex items-center gap-3 px-5 py-3 rounded-full font-sans bg-white"
              style={{ border: '1px solid #E2DED9', fontSize: '14px', color: '#002A3A' }}
            >
              <span
                className="flex-shrink-0 rounded-full"
                style={{ width: '6px', height: '6px', backgroundColor: '#EAAA00' }}
              />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
