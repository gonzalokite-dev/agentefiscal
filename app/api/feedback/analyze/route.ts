import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { SYSTEM_PROMPT } from '@/lib/systemPrompt';

const BASE_ID = 'appdYsXZSl6o2hnS5';
const TABLE_ID = 'tblF9cdOYmHSwAWnd';

export async function POST() {
  const airtableKey = process.env.AIRTABLE_API_KEY;
  if (!airtableKey) {
    return NextResponse.json({ error: 'AIRTABLE_API_KEY no configurada' }, { status: 500 });
  }

  // Fetch pending negative feedback
  const params = new URLSearchParams({
    'filterByFormula': `AND({Valoración} = '👎 Negativo', {Estado} = 'Pendiente')`,
    'sort[0][field]': 'Fecha',
    'sort[0][direction]': 'desc',
    pageSize: '20',
  });

  const res = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?${params}`,
    { headers: { Authorization: `Bearer ${airtableKey}` } }
  );

  if (!res.ok) {
    return NextResponse.json({ error: 'Error al obtener feedback' }, { status: 500 });
  }

  const data = await res.json();
  const records = data.records ?? [];

  if (records.length === 0) {
    return NextResponse.json({ suggestions: 'No hay feedback negativo pendiente de analizar.' });
  }

  // Build context for Claude
  const feedbackText = records
    .map((r: { fields: { 'Pregunta del usuario'?: string; 'Respuesta del agente'?: string } }, i: number) => {
      const f = r.fields;
      return `--- Caso ${i + 1} ---
PREGUNTA: ${f['Pregunta del usuario'] ?? '(sin texto)'}
RESPUESTA DEL AGENTE: ${(f['Respuesta del agente'] ?? '').slice(0, 600)}`;
    })
    .join('\n\n');

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const msg = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: `Eres un experto en diseño de system prompts para agentes de IA fiscales.

A continuación tienes ${records.length} caso(s) donde el agente Victoria recibió una valoración negativa (👎) del usuario.

SYSTEM PROMPT ACTUAL (fragmento relevante para contexto):
${SYSTEM_PROMPT.slice(0, 2000)}...

CASOS CON FEEDBACK NEGATIVO:
${feedbackText}

TAREA:
1. Identifica los patrones comunes de error (¿qué falla? ¿por qué?)
2. Para cada patrón, propón una mejora concreta y específica al system prompt
3. Redacta el texto exacto que debería añadirse o modificarse en el system prompt
4. Indica en qué sección del prompt iría cada mejora

Formato de respuesta:
## Patrones identificados
[lista de patrones]

## Mejoras propuestas

### Mejora 1: [título]
**Problema:** ...
**Dónde añadir:** Sección X del system prompt
**Texto sugerido:**
\`\`\`
[texto exacto a añadir al system prompt]
\`\`\`

[repetir para cada mejora]`,
      },
    ],
  });

  const suggestions = msg.content[0].type === 'text' ? msg.content[0].text : '';
  return NextResponse.json({ suggestions, count: records.length });
}
