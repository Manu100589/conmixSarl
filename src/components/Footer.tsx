import React from 'react';
import { ArrowUp, ShieldCheck, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0D0F] text-[#9CA3AF] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-2 space-y-4">
            <a href="#hero" className="flex items-center space-x-3 text-white">
              <div className="p-1 rounded-xl bg-[#1A1D20]/80 border border-white/10 flex items-center justify-center">
                <img src="/images/logo-dark.png" alt="CONMIX SARL Logo" className="h-10 w-auto object-contain" />
              </div>
              <span className="font-syne font-extrabold text-2xl tracking-wider text-white">
                CONMIX <span className="text-[#C82333] text-xs font-space font-bold uppercase tracking-widest">SARL</span>
              </span>
            </a>

            <p className="font-outfit text-sm text-[#9CA3AF] max-w-sm leading-relaxed">
              « Donner forme au métal. Construire durablement. »<br />
              Entreprise spécialisée dans la menuiserie métallique, la chaudronnerie d'art et la réalisation d'ouvrages sur-mesure pour particuliers, professionnels et maîtres d'ouvrage.
            </p>

            <div className="flex items-center space-x-4 text-xs font-space pt-2 text-white/80">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C82333]" />
                <span>Garantie Décennale</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Award className="w-4 h-4 text-[#C82333]" />
                <span>Norme Eurocode 3</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 font-space text-xs">
            <h4 className="font-syne font-bold text-sm text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#hero" className="hover:text-[#C82333] transition-colors">Accueil</a></li>
              <li><a href="#introduction" className="hover:text-[#C82333] transition-colors">À propos</a></li>
              <li><a href="#services" className="hover:text-[#C82333] transition-colors">Nos services</a></li>
              <li><a href="#showcase" className="hover:text-[#C82333] transition-colors">Nos réalisations</a></li>
              <li><a href="#commitments" className="hover:text-[#C82333] transition-colors">Notre savoir-faire</a></li>
              <li><a href="#process" className="hover:text-[#C82333] transition-colors">Processus</a></li>
              <li><a href="#contact" className="hover:text-[#C82333] transition-colors">Contact & Devis</a></li>
            </ul>
          </div>

          <div className="space-y-3 font-space text-xs">
            <h4 className="font-syne font-bold text-sm text-white uppercase tracking-wider mb-4">
              Ouvrages & Expertise
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#services" className="hover:text-white transition-colors">Étude de projet</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Construction métallique</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Menuiserie métallique</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Génie civil</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Formation professionnelle</a></li>
            </ul>
          </div>

          <div className="space-y-3 font-space text-xs">
            <h4 className="font-syne font-bold text-sm text-white uppercase tracking-wider mb-4">
              Siège & Contact
            </h4>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Babenga, Région du Littoral, Cameroun<br />
              Atelier de Fabrication & Construction Mixte
            </p>
            <div className="pt-2 space-y-1 text-xs text-white/90 font-medium">
              <p>📞 <a href="tel:+237679285276" className="hover:text-[#C82333] transition-colors">+237 6 79 28 52 76</a></p>
              <p>✉️ <a href="mailto:contact@conmix-sarl.cm" className="hover:text-[#C82333] transition-colors">contact@conmix-sarl.cm</a></p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-space">
          <p>© 2026 CONMIX SARL. Tous droits réservés. Menuiserie Métallique Sur-Mesure.</p>

          <div className="flex items-center space-x-6">
            <a href="#legal" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Politique de confidentialité</a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-[#1A1D20] text-white hover:bg-[#A71D2A] transition-colors border border-white/10"
              aria-label="Retour en haut"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
