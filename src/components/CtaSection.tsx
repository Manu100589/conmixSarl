import React from 'react';
import { ArrowRight, Hammer, PhoneCall, Mail } from 'lucide-react';

interface CtaSectionProps {
  onOpenQuoteModal: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenQuoteModal }) => {
  return (
    <section className="relative py-28 sm:py-36 bg-[#0B0D0F] text-white overflow-hidden border-b border-white/10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#A71D2A]/20 via-[#C82333]/15 to-[#8B0000]/20 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-metal-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="relative p-10 sm:p-16 md:p-20 rounded-3xl bg-gradient-to-b from-[#1A1D20]/90 to-[#0B0D0F]/90 border border-[#A71D2A]/40 backdrop-blur-xl shadow-2xl shadow-[#A71D2A]/15 overflow-hidden">
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#C82333] rounded-tl-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#C82333] rounded-br-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-8">
            <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#0B0D0F] border border-[#A71D2A]/50 text-[#C82333] text-xs font-space font-semibold uppercase tracking-widest">
              <Hammer className="w-3.5 h-3.5" />
              <span>Étude & Chiffrage Gratuit</span>
            </span>

            <h2 className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-[0.95]">
              VOUS AVEZ UN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4F4F0] to-[#C82333]">
                PROJET ?
              </span>
            </h2>

            <p className="text-base sm:text-xl text-[#9CA3AF] font-outfit font-light leading-relaxed max-w-2xl mx-auto">
              Parlons-en et transformons votre idée en un ouvrage métallique d'exception sur mesure. Réponse garantie sous 24 à 48h.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={onOpenQuoteModal}
                className="interactive group relative overflow-hidden px-10 py-5 rounded-2xl bg-gradient-to-r from-[#A71D2A] via-[#C82333] to-[#8B0000] text-white font-space font-extrabold text-sm sm:text-base tracking-widest uppercase shadow-2xl shadow-[#A71D2A]/50 hover:shadow-[#A71D2A]/80 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <span>DEMANDER UN DEVIS</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                </span>
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </button>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="interactive px-8 py-5 rounded-2xl bg-[#1A1D20] border border-white/20 hover:border-[#C82333]/60 text-white font-space font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-[#2A2E33]"
              >
                Nous Contacter
              </a>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs font-space text-[#9CA3AF]">
              <a href="tel:+33189204050" className="flex items-center space-x-2 hover:text-[#C82333] transition-colors">
                <PhoneCall className="w-4 h-4 text-[#C82333]" />
                <span>+33 1 89 20 40 50</span>
              </a>
              <a href="mailto:contact@conmix-metallerie.fr" className="flex items-center space-x-2 hover:text-[#C82333] transition-colors">
                <Mail className="w-4 h-4 text-[#C82333]" />
                <span>contact@conmix-metallerie.fr</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
