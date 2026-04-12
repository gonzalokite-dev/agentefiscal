'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/Logo';

const NAV_LINKS = [
  { label: 'Capacidades', href: '/#capacidades' },
  { label: 'Blog', href: '/blog' },
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

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        backgroundColor: scrolled ? 'rgba(0,42,58,0.92)' : '#002A3A',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid rgba(234,170,0,0.15)',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div className="flex items-center justify-between px-6 lg:px-12 h-16">
        <a href="/" style={{ textDecoration: 'none' }}>
          <Logo size="md" variant="light" />
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
                  color: isActive ? '#EAAA00' : 'rgba(215,210,203,0.75)',
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(215,210,203,1)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(215,210,203,0.75)';
                }}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="font-sans font-semibold transition-opacity hover:opacity-90"
            style={{
              fontSize: '12px',
              letterSpacing: '0.02em',
              color: '#002A3A',
              backgroundColor: '#EAAA00',
              padding: '6px 16px',
              borderRadius: '9999px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Acceder →
          </a>

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
                backgroundColor: 'rgba(215,210,203,0.8)',
                transform: menuOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none',
              }}
            />
            <span
              className="block transition-all duration-200"
              style={{
                width: '18px',
                height: '1.5px',
                backgroundColor: 'rgba(215,210,203,0.8)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block transition-all duration-200"
              style={{
                width: '18px',
                height: '1.5px',
                backgroundColor: 'rgba(215,210,203,0.8)',
                transform: menuOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-5 flex flex-col gap-4"
          style={{ borderTop: '1px solid rgba(234,170,0,0.1)' }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans"
              style={{
                fontSize: '15px',
                fontWeight: 500,
                color: 'rgba(215,210,203,0.85)',
                textDecoration: 'none',
                paddingTop: '10px',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
