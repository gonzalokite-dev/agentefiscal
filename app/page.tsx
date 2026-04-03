import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Capabilities from '@/components/landing/Capabilities';
import Examples from '@/components/landing/Examples';
import HowTo from '@/components/landing/HowTo';
import KnowledgeLoop from '@/components/landing/KnowledgeLoop';
import Limits from '@/components/landing/Limits';
import CtaFinal from '@/components/landing/CtaFinal';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Capabilities />
      <Examples />
      <HowTo />
      <KnowledgeLoop />
      <Limits />
      <CtaFinal />
      <footer
        className="flex flex-col md:flex-row items-center justify-between px-12 py-5 font-sans"
        style={{ backgroundColor: '#001824' }}
      >
        <p style={{ fontSize: '11px', color: 'rgba(215,210,203,0.5)' }}>
          Benavides Asociados
          <span style={{ color: '#EAAA00', margin: '0 6px' }}>·</span>
          Uso interno
          <span style={{ color: '#EAAA00', margin: '0 6px' }}>·</span>
          Pollença, Illes Balears
        </p>
        <p style={{ fontSize: '11px', color: 'rgba(215,210,203,0.5)' }}>Agente Fiscal BA v2.0</p>
      </footer>
    </main>
  );
}
