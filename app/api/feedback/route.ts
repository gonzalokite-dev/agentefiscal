import { NextResponse } from 'next/server';

const BASE_ID = 'appdYsXZSl6o2hnS5';
const TABLE_ID = 'tblF9cdOYmHSwAWnd';

export async function POST(req: Request) {
  try {
    const { rating, messageId, conversationId, userQuestion, agentResponse, conversationContext } =
      await req.json();

    const apiKey = process.env.AIRTABLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'AIRTABLE_API_KEY no configurada' }, { status: 500 });
    }

    const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          Consulta: (userQuestion ?? '').slice(0, 100),
          'Valoración': rating === 'up' ? '👍 Positivo' : '👎 Negativo',
          Estado: 'Pendiente',
          'Pregunta del usuario': userQuestion ?? '',
          'Respuesta del agente': agentResponse ?? '',
          'Contexto completo': conversationContext ?? '',
          Fecha: new Date().toISOString(),
          'ID conversación': conversationId ?? '',
          'ID mensaje': messageId ?? '',
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error('Airtable error:', err);
      return NextResponse.json({ error: err }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Feedback error:', e);
    return NextResponse.json({ error: 'Error al guardar feedback' }, { status: 500 });
  }
}
