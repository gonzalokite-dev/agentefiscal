import { generateAllPosts } from '@/lib/blogGenerator';

export const maxDuration = 300;

export async function POST(req: Request) {
  const secret = req.headers.get('x-blog-secret');
  const expected = process.env.NEXTAUTH_SECRET;

  if (!secret || secret !== expected) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const result = await generateAllPosts();
    return Response.json({
      ok: true,
      generados: result.success,
      errores: result.errors,
    });
  } catch (err) {
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : 'Error desconocido' },
      { status: 500 }
    );
  }
}
