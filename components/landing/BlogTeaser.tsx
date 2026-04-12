import { getAllPosts, BlogPost } from '@/lib/airtableBlog';

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  } catch {
    return '';
  }
}

function TeaserCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group block"
      style={{ textDecoration: 'none' }}
    >
      <div
        className="h-full rounded-xl bg-white transition-all duration-200 group-hover:shadow-md"
        style={{ border: '1px solid #E2DED9', padding: '22px' }}
      >
        {/* Top tag */}
        <span
          className="font-sans font-semibold inline-block mb-3"
          style={{
            fontSize: '10px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#EAAA00',
            backgroundColor: 'rgba(234,170,0,0.1)',
            padding: '2px 8px',
            borderRadius: '4px',
          }}
        >
          {post.tags[0] ?? 'Fiscal'}
        </span>

        <h3
          className="font-sans font-semibold mb-2 group-hover:text-amber-600 transition-colors"
          style={{ fontSize: '15px', color: '#002A3A', lineHeight: 1.4 }}
        >
          {post.title}
        </h3>

        <p
          className="font-sans mb-4"
          style={{
            fontSize: '13px',
            color: '#5F5E5A',
            lineHeight: 1.65,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden',
          }}
        >
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-sans" style={{ fontSize: '11px', color: 'rgba(0,42,58,0.4)' }}>
            {formatDate(post.publishedAt)} · {post.readTime} min
          </span>
          <span
            className="font-sans font-semibold"
            style={{ fontSize: '12px', color: '#EAAA00' }}
          >
            Leer →
          </span>
        </div>
      </div>
    </a>
  );
}

export default async function BlogTeaser() {
  let posts: BlogPost[] = [];
  try {
    posts = await getAllPosts();
  } catch {
    return null;
  }

  if (posts.length === 0) return null;

  const featured = posts.slice(0, 3);

  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#F7F6F4' }}>
      <div className="mx-auto" style={{ maxWidth: '1100px' }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p
              className="font-sans font-medium mb-3"
              style={{
                fontSize: '11px',
                letterSpacing: '0.14em',
                color: '#EAAA00',
                textTransform: 'uppercase',
              }}
            >
              Actualidad fiscal
            </p>
            <h2
              className="font-sans font-bold mb-2"
              style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', color: '#002A3A', lineHeight: 1.15, letterSpacing: '-0.02em' }}
            >
              Lo último del BOE, DGT y AEAT
            </h2>
            <p className="font-sans" style={{ fontSize: '14px', color: '#5F5E5A' }}>
              Análisis semanales extraídos directamente de las fuentes oficiales.
            </p>
          </div>
          <a
            href="/blog"
            className="font-sans font-semibold flex-shrink-0 transition-opacity hover:opacity-80"
            style={{
              fontSize: '13px',
              color: '#002A3A',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            Ver todos los artículos
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.map((post) => (
            <TeaserCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
