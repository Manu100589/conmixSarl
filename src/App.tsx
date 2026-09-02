import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MetalInMotion } from './components/MetalInMotion';
import { Introduction } from './components/Introduction';
import { Services } from './components/Services';
import type { ServiceItem } from './components/Services';
import { Showcase } from './components/Showcase';
import { RealizedProjects } from './components/RealizedProjects';
import { ParallaxSection } from './components/ParallaxSection';
import { Process } from './components/Process';
import { KeyMetrics } from './components/KeyMetrics';
import { Commitments } from './components/Commitments';
import { BeforeAfter } from './components/BeforeAfter';
import { CtaSection } from './components/CtaSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { ServiceModal } from './components/ServiceModal';

export const App: React.FC = () => {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0B0D0F] text-[#F4F4F0] font-outfit selection:bg-[#D87932] selection:text-white overflow-x-hidden">
      {/* Custom follower magnet cursor */}
      <CustomCursor />

      {/* Header */}
      <Navbar onOpenQuoteModal={() => setQuoteModalOpen(true)} />

      <main>
        {/* 1. Hero Section */}
        <Hero onOpenQuoteModal={() => setQuoteModalOpen(true)} />

        {/* Concept Banner: Le Métal en Mouvement */}
        <MetalInMotion />

        {/* 2. Introduction Section */}
        <Introduction />

        {/* 3. Nos Services / Notre Savoir-faire */}
        <Services onSelectService={(service) => setSelectedService(service)} />

        {/* 4. Nos Projets Réalisés (Usines p1, p2, p3) */}
        <RealizedProjects />

        {/* 5. Showcase Section */}
        <Showcase />

        {/* 5. Parallax Section */}
        <ParallaxSection />

        {/* 6. Processus de Travail */}
        <Process />

        {/* 7. Chiffres Clés */}
        <KeyMetrics />

        {/* 8. Engagements / Qualité */}
        <Commitments />

        {/* 9. Section Avant / Après */}
        <BeforeAfter />

        {/* 10. CTA Premium Section */}
        <CtaSection onOpenQuoteModal={() => setQuoteModalOpen(true)} />

        {/* 11. Contact */}
        <Contact />
      </main>

      {/* 12. Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenQuoteModal={() => setQuoteModalOpen(true)}
      />
    </div>
  );
};

export default App;
