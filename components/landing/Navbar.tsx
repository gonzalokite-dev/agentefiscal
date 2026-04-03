'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-12 h-16"
      style={{ backgroundColor: '#002A3A' }}
    >
      <div className="flex items-center gap-3">
        <span className="font-serif font-semibold text-white text-base tracking-wide">
          Benavides Asociados
        </span>
      </div>
      <div
        className="text-xs px-4 py-1.5 rounded-full border font-sans font-medium"
        style={{
          borderColor: '#EAAA00',
          color: '#EAAA00',
          background: 'transparent',
          letterSpacing: '0.05em',
        }}
      >
        Uso interno
      </div>
    </nav>
  );
}
