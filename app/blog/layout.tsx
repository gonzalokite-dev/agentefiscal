import Navbar from '@/components/landing/Navbar';
import Logo from '@/components/ui/Logo';

export const metadata = {
  title: 'Blog fiscal — AsesorIA',
  description:
    'Novedades fiscales, consultas DGT, cambios normativos y análisis prácticos para despachos asesores en España y Baleares.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: '#F7F6F4' }}>{children}</main>
      <footer
        className="flex flex-col md:flex-row items-center justify-between px-12 py-5 font-sans"
        style={{ backgroundColor: '#001824' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.45 }}>
          <Logo size="xs" variant="light" />
          <span style={{ fontSize: '11px', color: 'rgba(215,210,203,0.9)' }}>
            Pollença, Illes Balears
          </span>
        </div>
        <p style={{ fontSize: '11px', color: 'rgba(215,210,203,0.4)' }}>AsesorIA v2.0</p>
      </footer>
    </>
  );
}
