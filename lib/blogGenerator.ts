import Anthropic from '@anthropic-ai/sdk';
import { executeSearch } from './searchTool';
import { upsertPost, BlogPost } from './airtableBlog';

interface BlogTopic {
  key: string;
  label: string;
  query: string;
  fuente: string;
  tags: string[];
}

const BLOG_TOPICS: BlogTopic[] = [
  {
    key: 'irpf-novedades-campana-2025',
    label: 'Campaña de la Renta 2025',
    query: 'novedades IRPF declaracion renta 2024 2025 DGT consultas vinculantes cambios',
    fuente: 'todas',
    tags: ['IRPF', 'Renta', 'DGT'],
  },
  {
    key: 'alquiler-turistico-baleares-tributacion',
    label: 'Alquiler turístico en Baleares',
    query: 'alquiler turistico Mallorca Baleares IVA IRPF tributacion plataformas Airbnb 2025',
    fuente: 'todas',
    tags: ['IVA', 'IRPF', 'Alquiler', 'Baleares'],
  },
  {
    key: 'irnr-no-residentes-inmuebles-espana',
    label: 'No residentes con inmuebles en España',
    query: 'IRNR no residentes inmuebles España Modelo 210 retencion transmision 2025',
    fuente: 'todas',
    tags: ['IRNR', 'No residentes', 'Inmuebles'],
  },
  {
    key: 'sucesiones-donaciones-baleares-2025',
    label: 'Sucesiones y Donaciones en Baleares',
    query: 'impuesto sucesiones donaciones Baleares bonificaciones reducciones pactos sucesorios 2025',
    fuente: 'todas',
    tags: ['ISD', 'Sucesiones', 'Baleares'],
  },
  {
    key: 'iva-plataformas-digitales-2025',
    label: 'IVA en plataformas digitales',
    query: 'IVA plataformas digitales economía colaborativa España OSS vendedor ficticio 2025',
    fuente: 'todas',
    tags: ['IVA', 'Digital', 'Plataformas'],
  },
];

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function generateFromSearch(
  topic: BlogTopic,
  searchText: string
): Promise<Omit<BlogPost, 'id'> & { tema: string }> {
  const today = new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

  const prompt = `Eres un experto en fiscalidad española especializado en asesoría fiscal profesional. A partir de las siguientes fuentes oficiales (BOE, DGT, AEAT), redacta un artículo de blog en español para asesores fiscales sobre: "${topic.label}".

FUENTES OFICIALES ENCONTRADAS:
${searchText}

REQUISITOS DEL ARTÍCULO:
- Idioma: español profesional y directo
- Extensión: 650-850 palabras en el contenido markdown
- Formato: Markdown con ## para secciones, **negrita** para términos clave, listas donde ayude
- Enfoque: implicaciones prácticas para el asesor fiscal, no académico
- Cita artículos, números de modelo o consultas vinculantes cuando aparezcan en las fuentes
- Fecha de referencia: ${today}
- Incluye una sección "## Puntos clave para el despacho" al final con 4-5 bullets accionables

Usa la herramienta publish_article para entregar el resultado estructurado.`;

  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 2500,
    tools: [
      {
        name: 'publish_article',
        description: 'Publica el artículo generado en el blog de Victoria',
        input_schema: {
          type: 'object' as const,
          properties: {
            title: { type: 'string', description: 'Título del artículo' },
            excerpt: { type: 'string', description: 'Resumen de 2-3 frases' },
            content: { type: 'string', description: 'Artículo completo en Markdown' },
            tags: { type: 'array', items: { type: 'string' } },
            readTime: { type: 'number', description: 'Minutos de lectura estimados' },
            sources: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  url: { type: 'string' },
                },
                required: ['title', 'url'],
              },
            },
          },
          required: ['title', 'excerpt', 'content', 'tags', 'readTime', 'sources'],
        },
      },
    ],
    tool_choice: { type: 'tool', name: 'publish_article' },
    messages: [{ role: 'user', content: prompt }],
  });

  const toolBlock = response.content.find((b) => b.type === 'tool_use');
  if (!toolBlock || toolBlock.type !== 'tool_use') {
    throw new Error(`tool_use block no encontrado para: ${topic.key}`);
  }
  const parsed = toolBlock.input as {
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
    readTime: number;
    sources: Array<{ title: string; url: string }>;
  };

  // Merge topic base tags with Claude's generated tags, deduplicate
  const allTags = [...topic.tags, ...(parsed.tags || [])].filter(
    (t, i, arr) => arr.indexOf(t) === i
  );

  return {
    slug: topic.key,
    title: parsed.title || topic.label,
    excerpt: parsed.excerpt || '',
    content: parsed.content || '',
    tags: allTags,
    sources: (parsed.sources || []).filter(
      (s: { title?: string; url?: string }) => s.title && s.url
    ),
    publishedAt: new Date().toISOString(),
    readTime: typeof parsed.readTime === 'number' ? parsed.readTime : 5,
    tema: topic.key,
  };
}

export async function generateAllPosts(): Promise<{ success: number; errors: string[] }> {
  // Run all Tavily searches in parallel for speed
  const searchResults = await Promise.all(
    BLOG_TOPICS.map((topic) => executeSearch(topic.query, topic.fuente))
  );

  let success = 0;
  const errors: string[] = [];

  // Generate articles sequentially to be gentle on the API
  for (let i = 0; i < BLOG_TOPICS.length; i++) {
    const topic = BLOG_TOPICS[i];
    try {
      const post = await generateFromSearch(topic, searchResults[i].text);
      await upsertPost(post);
      success++;
      console.log(`[blog] Generated: ${topic.key}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${topic.key}: ${msg}`);
      console.error(`[blog] Error generating ${topic.key}:`, msg);
    }
  }

  return { success, errors };
}

export { BLOG_TOPICS };
