import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import TrustBar from '@/components/landing/TrustBar';
import Capabilities from '@/components/landing/Capabilities';
import ChatShowcase from '@/components/landing/ChatShowcase';
import Segmentos from '@/components/landing/Segmentos';
import Testimonials from '@/components/landing/Testimonials';
import Pricing from '@/components/landing/Pricing';
import Nosotros from '@/components/landing/Nosotros';
import CtaFinal from '@/components/landing/CtaFinal';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <Capabilities />
      <ChatShowcase />
      <Segmentos />
      <Testimonials />
      <Pricing />
      <Nosotros />
      <CtaFinal />
      <Footer />
    </main>
  );
}
