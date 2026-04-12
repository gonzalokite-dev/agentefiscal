import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import TrustBar from '@/components/landing/TrustBar';
import Capabilities from '@/components/landing/Capabilities';
import ChatShowcase from '@/components/landing/ChatShowcase';
import Testimonials from '@/components/landing/Testimonials';
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
      <Testimonials />
      <CtaFinal />
      <Footer />
    </main>
  );
}
