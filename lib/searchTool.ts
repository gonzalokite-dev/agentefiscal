import Anthropic from '@anthropic-ai/sdk';

// ─── Tool definition for Claude ───────────────────────────────────────────────

export const FISCAL_TOOLS: Anthropic.Tool[] = [
  {
    name: 'buscar_normativa',
    description:
      'Busca normativa fiscal española actualizada en el BOE, la AEAT y la DGT. ' +
      'Úsalo cuando necesites verificar legislación vigente, localizar consultas vinculantes ' +
      'de la DGT, comprobar tipos impositivos actuales, plazos, modelos tributarios o ' +
      'cualquier información que pueda haber cambiado recientemente.',
    input_schema: {
      type: 'object' as const,
      properties: {
        query: {
          type: 'string',
          description:
            'Consulta de búsqueda en español. Sé específico: incluye el impuesto, ' +
            'el artículo, el número de modelo o el tema concreto.',
        },
        fuente: {
          type: 'string',
          enum: ['boe', 'dgt', 'aeat', 'teac', 'cendoj', 'todas'],
          description:
            '"boe" para legislación y normas publicadas en el BOE. ' +
            '"dgt" para consultas vinculantes y criterios de la Dirección General de Tributos. ' +
            '"aeat" para instrucciones, modelos y procedimientos de la Agencia Tributaria. ' +
            '"teac" para resoluciones del Tribunal Económico-Administrativo Central (DYCTEA). ' +
            '"cendoj" para sentencias y jurisprudencia del poder judicial español (Audiencia Nacional, Tribunal Supremo, TSJ). ' +
            '"todas" para buscar en todas las fuentes simultáneamente.',
        },
      },
      required: ['query'],
    },
  },
];

// ─── Source labels for the UI ──────────────────────────────────────────────────

export function getSourceLabel(fuente?: string): string {
  const labels: Record<string, string> = {
    boe: 'BOE',
    dgt: 'DGT',
    aeat: 'AEAT',
    teac: 'TEAC · DYCTEA',
    cendoj: 'CENDOJ',
    todas: 'BOE · DGT · AEAT · TEAC · CENDOJ',
  };
  return labels[fuente ?? ''] ?? 'fuentes oficiales';
}

// ─── Domain mapping ────────────────────────────────────────────────────────────

const DOMAIN_MAP: Record<string, string[]> = {
  boe: ['boe.es'],
  dgt: ['hacienda.gob.es', 'petete.tributos.hacienda.gob.es'],
  aeat: ['agenciatributaria.gob.es'],
  teac: ['serviciostelematicosext.hacienda.gob.es'],
  cendoj: ['poderjudicial.es'],
  todas: ['boe.es', 'hacienda.gob.es', 'agenciatributaria.gob.es', 'petete.tributos.hacienda.gob.es', 'serviciostelematicosext.hacienda.gob.es', 'poderjudicial.es'],
};

// ─── Tavily search executor ────────────────────────────────────────────────────

export async function executeSearch(
  query: string,
  fuente?: string
): Promise<{ text: string; count: number; urls: Array<{ title: string; url: string }> }> {
  const apiKey = process.env.TAVILY_API_KEY;

  if (!apiKey) {
    return {
      text: '[Búsqueda no disponible: TAVILY_API_KEY no configurada]',
      count: 0,
      urls: [],
    };
  }

  const includeDomains =
    fuente && DOMAIN_MAP[fuente]
      ? DOMAIN_MAP[fuente]
      : DOMAIN_MAP['todas'];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  let res: Response;
  try {
    res = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        query,
        search_depth: 'basic',
        include_answer: true,
        include_domains: includeDomains,
        max_results: 4,
      }),
      signal: controller.signal,
    });
  } catch (err: unknown) {
    clearTimeout(timeout);
    const isAbort = err instanceof Error && err.name === 'AbortError';
    return {
      text: isAbort
        ? '[La búsqueda tardó demasiado. Respondo con conocimiento base.]'
        : `[Error de red en la búsqueda: ${String(err)}]`,
      count: 0,
      urls: [],
    };
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    return { text: `[Error en la búsqueda: ${res.statusText}]`, count: 0, urls: [] };
  }

  const data = await res.json();
  const results: Array<{ title: string; url: string; content: string }> = data.results ?? [];
  const answer: string = data.answer ?? '';

  let text = '';
  if (answer) text += `RESUMEN: ${answer}\n\n`;

  for (const r of results) {
    text += `FUENTE: ${r.title}\nURL: ${r.url}\nCONTENIDO: ${r.content}\n\n---\n\n`;
  }

  return {
    text: text.trim() || 'No se encontraron resultados relevantes en las fuentes oficiales.',
    count: results.length,
    urls: results.slice(0, 3).map((r) => ({ title: r.title, url: r.url })),
  };
}

// ─── System prompt addendum ────────────────────────────────────────────────────

export const TOOLS_ADDENDUM = `

## HERRAMIENTA DE BÚSQUEDA WEB

Tienes acceso a la herramienta \`buscar_normativa\` que te permite consultar en tiempo real:
- **BOE** (boe.es) — Legislación vigente, reales decretos, leyes.
- **DGT** (hacienda.gob.es) — Consultas vinculantes, criterios interpretativos.
- **AEAT** (agenciatributaria.gob.es) — Modelos, instrucciones, plazos actualizados.
- **TEAC** (serviciostelematicosext.hacienda.gob.es/TEAC/DYCTEA/) — Resoluciones del Tribunal Económico-Administrativo Central. Base de datos DYCTEA con doctrina administrativa vinculante.
- **CENDOJ** (poderjudicial.es) — Jurisprudencia del poder judicial español: sentencias del Tribunal Supremo, Audiencia Nacional, Tribunales Superiores de Justicia y Audiencias Provinciales.

**Cuándo usarla:**
- Cuando el usuario pregunte por normativa que pueda haber cambiado después de agosto de 2025.
- Cuando necesites localizar una consulta vinculante específica de la DGT.
- Cuando debas confirmar tipos impositivos, plazos o importes actuales.
- Cuando el usuario mencione una norma concreta y quieras verificar su vigencia.
- Cuando la consulta implique un conflicto interpretativo o un recurso económico-administrativo — usa "teac" para buscar doctrina del TEAC sobre ese criterio.
- Cuando el usuario pregunte por sentencias, jurisprudencia, criterios judiciales o quiera saber cómo han fallado los tribunales sobre una cuestión fiscal — usa "cendoj".
- Cuando necesites contrastar la doctrina administrativa del TEAC con la jurisprudencia judicial — combina "teac" y "cendoj".

**Cómo usarla bien:**
- Formula queries específicas: "consulta vinculante DGT alquiler turístico IVA 2025" mejor que "IVA alquiler".
- Elige la fuente correcta: usa "dgt" para consultas vinculantes, "boe" para textos legales, "aeat" para modelos y plazos, "teac" para doctrina administrativa del TEAC, "cendoj" para sentencias judiciales.
- Puedes hacer varias búsquedas seguidas si necesitas contrastar información de distintas fuentes.
- Para resolver reclamaciones o recursos, combina "dgt" (criterio interpretativo) con "teac" (doctrina administrativa) y "cendoj" (jurisprudencia judicial).
- Para CENDOJ, incluye el tribunal en la query cuando sea relevante: "Audiencia Nacional IRPF simulación negocio jurídico" o "Tribunal Supremo IVA operaciones vinculadas".

**Después de buscar:**
- **Siempre incluye las fuentes como links markdown clicables** con este formato exacto: \`[Título descriptivo](URL)\`.
  - Ejemplo DGT: \`[Consulta Vinculante V1234-23, DGT](https://petete.tributos.hacienda.gob.es/...)\`
  - Ejemplo BOE: \`[Ley 35/2006, de 28 de noviembre, del IRPF](https://www.boe.es/...)\`
  - Ejemplo TEAC: \`[Resolución TEAC 00/1234/2023](https://serviciostelematicosext.hacienda.gob.es/TEAC/DYCTEA/...)\`
  - Ejemplo CENDOJ: \`[SAN 1234/2024, Audiencia Nacional — Sala de lo Contencioso](https://www.poderjudicial.es/...)\`
- Coloca los links al final de la respuesta en una sección **"Fuentes"** o dentro del texto junto a la afirmación que fundamentan.
- Si el resultado no es concluyente, indícalo y recomienda verificar directamente en la sede electrónica.
`;
