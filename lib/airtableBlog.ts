const BASE_ID = 'appdYsXZSl6o2hnS5';
let cachedBlogTableId: string | null = null;

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  sources: Array<{ title: string; url: string }>;
  publishedAt: string;
  readTime: number;
}

function apiKey(): string {
  const key = process.env.AIRTABLE_API_KEY;
  if (!key) throw new Error('AIRTABLE_API_KEY no configurada');
  return key;
}

async function getBlogTableId(): Promise<string> {
  if (cachedBlogTableId) return cachedBlogTableId;

  const key = apiKey();

  const metaRes = await fetch(`https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`, {
    headers: { Authorization: `Bearer ${key}` },
  });

  if (metaRes.ok) {
    const meta = await metaRes.json();
    const table = meta.tables?.find((t: { name: string; id: string }) => t.name === 'Blog');
    if (table) {
      cachedBlogTableId = table.id;
      return table.id;
    }
  }

  const createRes = await fetch(`https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Blog',
      fields: [
        { name: 'Slug', type: 'singleLineText' },
        { name: 'Titulo', type: 'singleLineText' },
        { name: 'Extracto', type: 'multilineText' },
        { name: 'Contenido', type: 'multilineText' },
        { name: 'Tags', type: 'singleLineText' },
        { name: 'Fuentes', type: 'multilineText' },
        { name: 'FechaPublicacion', type: 'singleLineText' },
        { name: 'TiempoLectura', type: 'number', options: { precision: 0 } },
        { name: 'Tema', type: 'singleLineText' },
      ],
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.json().catch(() => ({}));
    throw new Error(`No se pudo crear la tabla Blog en Airtable: ${JSON.stringify(err)}`);
  }

  const newTable = await createRes.json();
  cachedBlogTableId = newTable.id;
  return newTable.id;
}

function recordToPost(record: { id: string; fields: Record<string, unknown> }): BlogPost {
  const f = record.fields;
  let sources: Array<{ title: string; url: string }> = [];
  try {
    sources = JSON.parse((f.Fuentes as string) || '[]');
  } catch {}

  return {
    id: record.id,
    slug: (f.Slug as string) || '',
    title: (f.Titulo as string) || '',
    excerpt: (f.Extracto as string) || '',
    content: (f.Contenido as string) || '',
    tags: ((f.Tags as string) || '').split(',').map((t) => t.trim()).filter(Boolean),
    sources,
    publishedAt: (f.FechaPublicacion as string) || new Date().toISOString(),
    readTime: (f.TiempoLectura as number) || 5,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const key = apiKey();
  const tableId = await getBlogTableId();

  const params = new URLSearchParams();
  params.append('sort[0][field]', 'FechaPublicacion');
  params.append('sort[0][direction]', 'desc');
  params.append('maxRecords', '20');

  const res = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${tableId}?${params}`,
    {
      headers: { Authorization: `Bearer ${key}` },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) return [];

  const data = await res.json();
  return (data.records || []).map(recordToPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const key = apiKey();
  const tableId = await getBlogTableId();

  const params = new URLSearchParams({
    filterByFormula: `{Slug} = '${slug.replace(/'/g, "\\'")}'`,
    maxRecords: '1',
  });

  const res = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${tableId}?${params}`,
    {
      headers: { Authorization: `Bearer ${key}` },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  const record = data.records?.[0];
  if (!record) return null;

  return recordToPost(record);
}

export async function upsertPost(
  post: Omit<BlogPost, 'id'> & { tema: string }
): Promise<void> {
  const key = apiKey();
  const tableId = await getBlogTableId();

  const params = new URLSearchParams({
    filterByFormula: `{Slug} = '${post.slug.replace(/'/g, "\\'")}'`,
    maxRecords: '1',
  });

  const checkRes = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${tableId}?${params}`,
    { headers: { Authorization: `Bearer ${key}` } }
  );

  const fields: Record<string, unknown> = {
    Slug: post.slug,
    Titulo: post.title,
    Extracto: post.excerpt,
    Contenido: post.content,
    Tags: post.tags.join(', '),
    Fuentes: JSON.stringify(post.sources),
    FechaPublicacion: post.publishedAt,
    TiempoLectura: post.readTime,
    Tema: post.tema,
  };

  if (checkRes.ok) {
    const existing = await checkRes.json();
    const record = existing.records?.[0];

    if (record) {
      await fetch(`https://api.airtable.com/v0/${BASE_ID}/${tableId}/${record.id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields }),
      });
      return;
    }
  }

  await fetch(`https://api.airtable.com/v0/${BASE_ID}/${tableId}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields }),
  });
}
