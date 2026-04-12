import { getAllPosts, BlogPost } from '@/lib/airtableBlog';

export const revalidate = 3600;

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

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      style={{ textDecoration: 'none' }}
      className="group block"
    >
      <article
        className="flex flex-col h-full rounded-2xl bg-white transition-all duration-200"
        style={{
          border: '1px solid #E2DED9',
          padding: '28px',
          cursor: 'pointer',
        }}
      >
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
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
        <h2
          className="font-sans font-bold mb-3 group-hover:text-amber-600 transition-colors"
          style={{ fontSize: '18px', color: '#0D2E35', lineHeight: 1.35 }}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p
          className="font-sans flex-1 mb-6"
          style={{ fontSize: '14px', color: '#5F5E5A', lineHeight: 1.7 }}
        >
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-sans" style={{ fontSize: '12px', color: 'rgba(0,42,58,0.4)' }}>
              {formatDate(post.publishedAt)}
            </span>
            <span style={{ color: 'rgba(0,42,58,0.2)', fontSize: '10px' }}>·</span>
            <span className="font-sans" style={{ fontSize: '12px', color: 'rgba(0,42,58,0.4)' }}>
              {post.readTime} min
            </span>
          </div>
          <span
            className="font-sans font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1"
            style={{ fontSize: '13px', color: '#00B5AD' }}
          >
            Leer
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </article>
    </a>
  );
}

function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center py-24 rounded-2xl"
      style={{ backgroundColor: 'white', border: '1px solid #E2DED9' }}
    >
      <div
        className="flex items-center justify-center mb-5"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          backgroundColor: 'rgba(234,170,0,0.12)',
        }}
      >
        <svg width="24" height="24" fill="none" stroke="#00B5AD" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="font-sans font-bold mb-2" style={{ fontSize: '18px', color: '#0D2E35' }}>
        Contenido en preparación
      </h3>
      <p className="font-sans mb-6 max-w-sm" style={{ fontSize: '14px', color: '#5F5E5A', lineHeight: 1.65 }}>
        Los artículos se generan consultando en tiempo real el BOE, la DGT y la AEAT. Vuelve en unos minutos.
      </p>
      <div
        className="flex items-center gap-2 rounded-full px-4 py-2"
        style={{ backgroundColor: 'rgba(0,42,58,0.06)', fontSize: '12px', color: '#5F5E5A' }}
      >
        <span style={{ color: '#00B5AD' }}>●</span>
        <span className="font-sans">BOE · DGT · AEAT</span>
      </div>
    </div>
  );
}

export default async function BlogPage() {
  const posts = await getAllPosts().catch(() => [] as BlogPost[]);

  return (
    <div className="px-6 py-16" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div className="mb-14">
        <p
          className="font-sans font-medium mb-3"
          style={{
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: '#00B5AD',
            textTransform: 'uppercase',
          }}
        >
          Actualidad fiscal
        </p>
        <h1
          className="font-sans font-bold mb-4"
          style={{
            fontSize: 'clamp(28px, 5vw, 44px)',
            color: '#0D2E35',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
          }}
        >
          Blog Victoria
        </h1>
        <p className="font-sans" style={{ fontSize: '16px', color: '#5F5E5A', maxWidth: '520px', lineHeight: 1.7 }}>
          Novedades fiscales extraídas directamente del BOE, la DGT y la AEAT. Análisis prácticos para el despacho asesor.
        </p>

        {/* Source badges */}
        <div className="flex flex-wrap gap-2 mt-5">
          {['BOE', 'DGT', 'AEAT'].map((src) => (
            <span
              key={src}
              className="font-sans font-semibold"
              style={{
                fontSize: '11px',
                letterSpacing: '0.06em',
                color: '#0D2E35',
                backgroundColor: 'rgba(0,42,58,0.07)',
                padding: '4px 10px',
                borderRadius: '20px',
              }}
            >
              {src}
            </span>
          ))}
        </div>
      </div>

      {/* Posts grid */}
      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* CTA bottom */}
      {posts.length > 0 && (
        <div
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 p-7 rounded-2xl"
          style={{ backgroundColor: '#0D2E35' }}
        >
          <div>
            <p className="font-sans font-semibold text-white mb-1" style={{ fontSize: '16px' }}>
              ¿Tienes una consulta concreta?
            </p>
            <p className="font-sans" style={{ fontSize: '14px', color: '#D7D2CB' }}>
              El agente responde en tiempo real con las mismas fuentes del blog.
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
      )}
    </div>
  );
}
