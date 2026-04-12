import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/airtableBlog';
import PostContent from '@/components/blog/PostContent';

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug).catch(() => null);

  if (!post) notFound();

  return (
    <div className="px-6 py-12" style={{ maxWidth: '760px', margin: '0 auto' }}>
      {/* Back link */}
      <a
        href="/blog"
        className="font-sans inline-flex items-center gap-2 mb-10 transition-opacity hover:opacity-70"
        style={{ fontSize: '13px', color: '#5F5E5A', textDecoration: 'none' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        Volver al blog
      </a>

      {/* Article header */}
      <header className="mb-10">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-sans font-semibold"
              style={{
                fontSize: '10px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#00B5AD',
                backgroundColor: 'rgba(234,170,0,0.1)',
                padding: '3px 8px',
                borderRadius: '4px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1
          className="font-sans font-bold mb-4"
          style={{
            fontSize: 'clamp(24px, 4vw, 36px)',
            color: '#0D2E35',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}
        >
          {post.title}
        </h1>

        {/* Excerpt */}
        <p
          className="font-sans mb-6"
          style={{ fontSize: '17px', color: '#5F5E5A', lineHeight: 1.7 }}
        >
          {post.excerpt}
        </p>

        {/* Meta row */}
        <div
          className="flex flex-wrap items-center gap-3 py-4"
          style={{ borderTop: '1px solid #E2DED9', borderBottom: '1px solid #E2DED9' }}
        >
          {/* Source chips */}
          <div className="flex items-center gap-2 flex-1">
            {['BOE', 'DGT', 'AEAT'].map((src) => (
              <span
                key={src}
                className="font-sans font-semibold"
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.06em',
                  color: '#0D2E35',
                  backgroundColor: 'rgba(0,42,58,0.07)',
                  padding: '3px 8px',
                  borderRadius: '20px',
                }}
              >
                {src}
              </span>
            ))}
          </div>
          <span className="font-sans" style={{ fontSize: '12px', color: 'rgba(0,42,58,0.4)' }}>
            {formatDate(post.publishedAt)}
          </span>
          <span style={{ color: 'rgba(0,42,58,0.2)' }}>·</span>
          <span className="font-sans" style={{ fontSize: '12px', color: 'rgba(0,42,58,0.4)' }}>
            {post.readTime} min de lectura
          </span>
        </div>
      </header>

      {/* Article content */}
      <div
        className="mb-12 rounded-2xl bg-white p-8 md:p-10"
        style={{ border: '1px solid #E2DED9' }}
      >
        <PostContent content={post.content} />
      </div>

      {/* Sources */}
      {post.sources.length > 0 && (
        <section className="mb-12">
          <h2
            className="font-sans font-bold mb-4"
            style={{ fontSize: '15px', color: '#0D2E35', letterSpacing: '-0.01em' }}
          >
            Fuentes consultadas
          </h2>
          <div className="flex flex-col gap-2">
            {post.sources.map((source, i) => (
              <a
                key={i}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans flex items-center gap-3 p-3 rounded-xl transition-all hover:border-amber-300"
                style={{
                  border: '1px solid #E2DED9',
                  backgroundColor: 'white',
                  textDecoration: 'none',
                  fontSize: '13px',
                  color: '#0D2E35',
                }}
              >
                <span
                  className="font-sans font-bold flex-shrink-0"
                  style={{ fontSize: '11px', color: '#00B5AD' }}
                >
                  ↗
                </span>
                <span style={{ flex: 1 }}>{source.title}</span>
                <span
                  className="font-sans hidden sm:block"
                  style={{ fontSize: '11px', color: 'rgba(0,42,58,0.35)', flexShrink: 0, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >
                  {source.url}
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-4 p-7 rounded-2xl"
        style={{ backgroundColor: '#0D2E35' }}
      >
        <div>
          <p className="font-sans font-semibold text-white mb-1" style={{ fontSize: '16px' }}>
            ¿Necesitas analizar un caso concreto?
          </p>
          <p className="font-sans" style={{ fontSize: '13px', color: '#D7D2CB' }}>
            El agente te responde con la misma normativa, en tiempo real.
          </p>
        </div>
        <a
          href="/login"
          className="font-sans font-semibold flex-shrink-0 transition-opacity hover:opacity-90"
          style={{
            backgroundColor: '#00B5AD',
            color: '#0D2E35',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '14px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Consultar ahora →
        </a>
      </div>
    </div>
  );
}
