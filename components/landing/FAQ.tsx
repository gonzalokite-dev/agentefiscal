'use client';
import { useState } from 'react';

const faqs = [
  {
    q: '¿Puedo firmar un escrito basándome en la respuesta del agente?',
    a: 'Victoria genera orientación técnica fundamentada en fuentes primarias, no asesoramiento definitivo. Los escritos que redacta son borradores que el asesor debe revisar, adaptar al caso concreto y firmar bajo su responsabilidad profesional. Es una herramienta de apoyo, no un sustituto del criterio del asesor.',
  },
  {
    q: '¿Qué pasa si cambia la normativa o la DGT publica una consulta nueva?',
    a: 'Victoria está conectado en tiempo real al BOE, la DGT y la AEAT. No responde de memoria: consulta las fuentes en el momento de cada pregunta. Si hoy se publica una nueva consulta vinculante, mañana ya está disponible para fundamentar tus respuestas.',
  },
  {
    q: '¿Pueden usar Victoria todos los miembros de mi equipo?',
    a: 'Sí. Cada miembro del equipo accede con su propia cuenta individual. El historial de conversaciones es personal y no se comparte entre usuarios. Puedes dar acceso a tantos asesores como necesites.',
  },
  {
    q: '¿Funciona solo para Baleares o también para normativa estatal?',
    a: 'Las dos cosas. Victoria cubre toda la normativa fiscal estatal española — IRPF, IVA, IS, IRNR — más la normativa autonómica específica de Illes Balears: tipos propios de ITP e ISD, pactos sucesorios de la Compilació de Dret Civil, ecotasa y deducciones autonómicas.',
  },
  {
    q: '¿Qué hago si la respuesta es incorrecta o incompleta?',
    a: 'El agente siempre indica cuándo existe incertidumbre normativa y recomienda contrastar con la fuente oficial o solicitar consulta vinculante a la DGT. Si detectas un error, puedes valorar la respuesta con 👎 y el equipo lo revisa para mejorar el sistema.',
  },
  {
    q: '¿Mis consultas y documentos quedan almacenados?',
    a: 'Los documentos que adjuntas se procesan durante la sesión y no quedan almacenados en servidores externos. Tu historial de conversaciones se guarda localmente en tu navegador. Tus datos no se usan para entrenar modelos de IA.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ backgroundColor: 'white', paddingTop: '80px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p
            className="font-sans"
            style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#00B5AD', textTransform: 'uppercase', fontWeight: 600, marginBottom: '12px' }}
          >
            Preguntas frecuentes
          </p>
          <h2
            className="font-sans"
            style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 800, color: '#0D2E35', letterSpacing: '-0.03em', lineHeight: 1.2 }}
          >
            Lo que los despachos preguntan antes de empezar
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  border: '1px solid',
                  borderColor: isOpen ? 'rgba(0,42,58,0.2)' : '#E5E7EB',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'border-color 0.15s',
                  backgroundColor: isOpen ? 'rgba(0,42,58,0.02)' : 'white',
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    padding: '18px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span
                    className="font-sans"
                    style={{ fontSize: '15px', fontWeight: 600, color: '#111827', lineHeight: 1.4 }}
                  >
                    {faq.q}
                  </span>
                  <svg
                    width="16" height="16" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"
                    style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 20px 18px' }}>
                    <p className="font-sans" style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.75 }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
