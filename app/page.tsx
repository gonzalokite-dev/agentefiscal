import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import TrustBar from '@/components/landing/TrustBar';
import Capabilities from '@/components/landing/Capabilities';
import ChatShowcase from '@/components/landing/ChatShowcase';
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
      <TrustBar />
      <Capabilities />
      <ChatShowcase />
      <Examples />
      <HowTo />
      <KnowledgeLoop />
      <Limits />
      <CtaFinal />
      <footer
        className="flex flex-col md:flex-row items-center justify-between px-12 py-5 font-sans"
        style={{ backgroundColor: '#001824' }}
      >
        <div className="flex items-center gap-3">
          <img src="/logo-blanco.svg" alt="Benavides Asociados" style={{ height: '18px', width: 'auto', opacity: 0.45 }} />
          <span style={{ fontSize: '11px', color: 'rgba(215,210,203,0.5)' }}>
            Uso interno
            <span style={{ color: '#EAAA00', margin: '0 6px' }}>·</span>
            Pollença, Illes Balears
          </span>
        </div>
        <p style={{ fontSize: '11px', color: 'rgba(215,210,203,0.5)' }}>Agente Fiscal BA v2.0</p>
      </footer>
    </main>
  );
}
