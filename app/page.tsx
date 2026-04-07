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
        <div className="flex items-baseline gap-0">
          <span className="font-sans font-bold" style={{ fontSize: '14px', color: 'rgba(215,210,203,0.45)', letterSpacing: '-0.03em' }}>Asesor</span>
          <span className="font-sans font-bold" style={{ fontSize: '14px', color: 'rgba(234,170,0,0.45)', letterSpacing: '-0.03em', position: 'relative', top: '-3px' }}>IA</span>
          <span style={{ fontSize: '11px', color: 'rgba(215,210,203,0.4)', marginLeft: '10px' }}>
            Pollença, Illes Balears
          </span>
        </div>
        <p style={{ fontSize: '11px', color: 'rgba(215,210,203,0.4)' }}>AsesorIA v2.0</p>
      </footer>
    </main>
  );
}
