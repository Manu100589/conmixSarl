import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Shield, PhoneCall } from 'lucide-react';

interface NavbarProps {
  onOpenQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#hero' },
    { name: 'À propos', href: '#introduction' },
    { name: 'Nos services', href: '#services' },
    { name: 'Nos réalisations', href: '#showcase' },
    { name: 'Savoir-faire', href: '#commitments' },
    { name: 'Processus', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-2.5 bg-[#0B0D0F]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/80'
          : 'py-5 bg-gradient-to-b from-[#0B0D0F]/95 via-[#0B0D0F]/50 to-transparent'
      }`}
    >
      {/* Scroll Progress Bar in Brand Crimson Red */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#A71D2A] via-[#C82333] to-[#7A121C] transition-all duration-150 shadow-[0_0_10px_#A71D2A]"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand Component */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center space-x-3 text-white transition-opacity hover:opacity-95"
          >
            {/* Real Logo Image Insertion */}
            <div className="relative p-1 rounded-xl bg-[#1A1D20]/80 border border-white/10 group-hover:border-[#A71D2A]/60 transition-colors duration-300 shadow-md flex items-center justify-center">
              <img
                src="/images/logo-dark.png"
                alt="CONMIX SARL Logo"
                className="h-9 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-syne font-extrabold text-xl sm:text-2xl tracking-wider text-white flex items-center">
                CONMIX <span className="text-[#C82333] ml-1 text-xs font-space font-bold tracking-widest uppercase">SARL</span>
              </span>
              <span className="text-[10px] font-space tracking-widest text-[#9CA3AF] uppercase group-hover:text-[#F4F4F0] transition-colors">
                Construction Mixte & Métal
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 rounded-full bg-white/[0.03] border border-white/10 px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3.5 py-1.5 text-xs font-medium font-outfit text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 tracking-wide uppercase"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Area */}
          <div className="hidden sm:flex items-center space-x-4">
            <a
              href="tel:+33189204050"
              className="hidden xl:flex items-center space-x-2 text-xs font-space text-[#9CA3AF] hover:text-[#C82333] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#C82333]" />
              <span>+33 1 89 20 40 50</span>
            </a>

            <button
              onClick={onOpenQuoteModal}
              className="interactive relative group overflow-hidden rounded-full bg-gradient-to-r from-[#A71D2A] via-[#C82333] to-[#8B0000] px-5 py-2.5 text-xs font-semibold font-space tracking-wider uppercase text-white shadow-lg shadow-[#A71D2A]/30 hover:shadow-[#A71D2A]/60 transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Demander un devis</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center space-x-3">
            <button
              onClick={onOpenQuoteModal}
              className="px-3 py-1.5 text-[11px] font-space font-semibold uppercase bg-[#A71D2A] text-white rounded-full"
            >
              Devis
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#1A1D20] text-white/90 hover:text-white border border-white/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 top-[60px] bg-[#0B0D0F]/95 backdrop-blur-2xl transition-all duration-500 z-40 lg:hidden flex flex-col justify-between px-6 py-8 border-t border-white/10 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3 mb-2">
            <img src="/images/logo-dark.png" alt="CONMIX" className="h-8 w-auto" />
            <span className="text-xs font-space uppercase text-[#C82333] tracking-widest font-semibold">
              CONMIX SARL — Menuiserie
            </span>
          </div>

          <div className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-2xl font-syne font-bold text-white/90 hover:text-[#C82333] hover:pl-2 transition-all duration-300 border-b border-white/5 pb-2"
                style={{ transitionDelay: `${idx * 40}ms` }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-4 pt-6 border-t border-white/10">
          <div className="flex items-center space-x-2 text-xs text-[#9CA3AF] font-space">
            <Shield className="w-4 h-4 text-[#C82333]" />
            <span>Garantie Décennale & Certification NF</span>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuoteModal();
            }}
            className="w-full py-3.5 bg-gradient-to-r from-[#A71D2A] via-[#C82333] to-[#8B0000] text-white font-space font-bold uppercase tracking-wider text-sm rounded-xl text-center shadow-lg shadow-[#A71D2A]/40"
          >
            Demander un devis sur mesure
          </button>
        </div>
      </div>
    </header>
  );
};
