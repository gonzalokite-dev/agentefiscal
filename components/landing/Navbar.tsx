'use client';
import { useEffect, useState } from 'react';
import Logo from '@/components/ui/Logo';

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
      <Logo size="md" variant="light" />

      <a
        href="/chat"
        className="font-sans font-semibold transition-opacity hover:opacity-90"
        style={{
          fontSize: '12px',
          letterSpacing: '0.02em',
          color: '#002A3A',
          backgroundColor: '#EAAA00',
          padding: '6px 16px',
          borderRadius: '9999px',
        }}
      >
        Abrir el agente →
      </a>
    </nav>
  );
}
