'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/Logo';

const NAV_LINKS = [
  { label: 'Producto',      href: '/#capacidades' },
  { label: 'Tutoriales',    href: '/#como-funciona' },
  { label: 'Casos de uso',  href: '/#casos' },
  { label: 'Planes',        href: '/#planes' },
  { label: 'Nosotros',      href: '/#nosotros' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isBlog = pathname.startsWith('/blog');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        backgroundColor: 'rgba(255,255,255,0.97)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid #E5E7EB',
        boxShadow: scrolled ? '0 1px 12px rgba(13,46,53,0.08)' : 'none',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <div className="flex items-center justify-between px-6 lg:px-12 h-16">
        <a href="/" style={{ textDecoration: 'none' }}>
          <Logo size="md" variant="dark" />
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === '/blog' && isBlog;
            return (
              <a
                key={link.label}
                href={link.href}
                className="font-sans transition-all duration-150"
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: isActive ? '#00B5AD' : '#374151',
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = '#0D2E35';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = '#374151';
                }}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            className="font-sans font-medium transition-colors"
            style={{
              fontSize: '13px',
              color: '#374151',
              textDecoration: 'none',
              padding: '6px 14px',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#0D2E35'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#374151'; }}
          >
            Iniciar sesión
          </a>
          <a
            href="/login"
            className="font-sans font-semibold transition-opacity hover:opacity-90"
            style={{
              fontSize: '13px',
              letterSpacing: '0.01em',
              color: '#FFFFFF',
              backgroundColor: '#00B5AD',
              padding: '7px 18px',
              borderRadius: '9999px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Crea tu cuenta
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menú"
        >
          <span
            className="block transition-all duration-200"
            style={{
              width: '18px',
              height: '1.5px',
              backgroundColor: '#374151',
              transform: menuOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none',
            }}
          />
          <span
            className="block transition-all duration-200"
            style={{
              width: '18px',
              height: '1.5px',
              backgroundColor: '#374151',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block transition-all duration-200"
            style={{
              width: '18px',
              height: '1.5px',
              backgroundColor: '#374151',
              transform: menuOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-5 flex flex-col gap-4"
          style={{ borderTop: '1px solid #E5E7EB' }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans"
              style={{
                fontSize: '15px',
                fontWeight: 500,
                color: '#374151',
                textDecoration: 'none',
                paddingTop: '10px',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/login"
            className="font-sans font-semibold text-center"
            style={{
              fontSize: '14px',
              color: '#FFFFFF',
              backgroundColor: '#00B5AD',
              padding: '10px 20px',
              borderRadius: '9999px',
              textDecoration: 'none',
              marginTop: '4px',
            }}
          >
            Crea tu cuenta
          </a>
        </div>
      )}
    </nav>
  );
}
