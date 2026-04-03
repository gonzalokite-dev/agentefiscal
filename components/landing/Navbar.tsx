'use client';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-12 h-16"
      style={{
        backgroundColor: scrolled ? 'rgba(0,42,58,0.85)' : '#002A3A',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid rgba(234,170,0,0.15)',
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
      }}
    >
      <span
        className="font-serif font-semibold text-white"
        style={{ fontSize: '16px', letterSpacing: '0.01em' }}
      >
        Benavides Asociados
      </span>

      <div
        className="font-sans font-medium"
        style={{
          fontSize: '11px',
          letterSpacing: '0.08em',
          color: '#EAAA00',
          border: '1px solid rgba(234,170,0,0.5)',
          padding: '5px 14px',
          borderRadius: '9999px',
          background: 'transparent',
        }}
      >
        Uso interno
      </div>
    </nav>
  );
}
