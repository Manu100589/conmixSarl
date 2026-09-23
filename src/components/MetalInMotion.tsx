import React, { useState, useEffect, useRef } from 'react';
import { Layers, Flame, Compass, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MetalInMotion: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const verticalLineRef = useRef<HTMLDivElement | null>(null);
  const titleLinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const bgGridRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  const steps = [
    {
      id: '01',
      title: 'Acier & Profilés de Structure',
      subtitle: 'Sélection des alliages',
      desc: 'Acier S235/S355, Inox 316L ou Aluminium extrudé contrôlés en sortie de fonderie.',
      specs: ['Épaisseurs : 2mm à 25mm', 'Traçabilité NF & CE', 'Traitement anti-oxydation'],
      badge: 'Matière Première',
      visualStyle: 'border-white/20 bg-gradient-to-br from-[#1A1D20] to-[#0B0D0F]',
      accentColor: '#9CA3AF',
    },
    {
      id: '02',
      title: 'Découpe Laser & Pliage HD',
      subtitle: 'Précision au 1/10e mm',
      desc: 'Numérisation CAO 3D transmise directement aux bancs de découpe laser fibre optique.',
      specs: ['Tolérance : ± 0.1 mm', 'Pliage numérique 250T', 'Chant de coupe net'],
      badge: 'Usinage Numérique',
      visualStyle: 'border-[#A71D2A]/50 bg-gradient-to-br from-[#1A1D20] via-[#240B10] to-[#0B0D0F]',
      accentColor: '#A71D2A',
    },
    {
      id: '03',
      title: 'Soudures TIG / MIG & Chaudronnerie',
      subtitle: 'Solidité certifiée',
      desc: 'Assemblage manuel par des soudeurs qualifiés selon les exigences architecturales.',
      specs: ['Soudures invisibles', 'Meulage finition miroir', 'Contrôle magnétoscopique'],
      badge: 'Savoir-faire Artisanal',
      visualStyle: 'border-[#C82333]/70 bg-gradient-to-br from-[#2B0E14] to-[#0B0D0F]',
      accentColor: '#C82333',
    },
    {
      id: '04',
      title: 'Traitement & Thermo-laquage',
      subtitle: 'Finition d\'exception',
      desc: 'Sablage, sablage métallisation et peinture époxy cuite au four à 200°C.',
      specs: ['Garantie anti-corrosion 10-20 ans', 'Nuancier RAL Illimité', 'Aspect Mat / Satiné / Fine Texture'],
      badge: 'Ouvrage d’Exception',
      visualStyle: 'border-white/40 bg-gradient-to-br from-[#1A1D20] via-[#2A2E33] to-[#0B0D0F]',
      accentColor: '#FFFFFF',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const vLine = verticalLineRef.current;
    const lines = titleLinesRef.current.filter(Boolean);
    const bg = bgGridRef.current;
    const cards = cardsContainerRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Title line by line reveal with clip-path
      if (lines.length > 0) {
        gsap.fromTo(
          lines,
          {
            y: 45,
            opacity: 0,
            clipPath: 'inset(100% 0 0 0)',
          },
          {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.9,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // 2. Growing technical red vertical drawing line
      if (vLine) {
        gsap.fromTo(
          vLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              end: 'bottom 85%',
              scrub: 1,
            },
          }
        );
      }

      // 3. Subtle horizontal movement of background layer (multi-layer parallax)
      if (bg) {
        gsap.fromTo(
          bg,
          { xPercent: -3 },
          {
            xPercent: 3,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // 4. Staggered reveal of step selector cards
      if (cards && cards.children) {
        gsap.fromTo(
          cards.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cards,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="metal-motion"
      ref={sectionRef}
      className="relative py-24 bg-[#0B0D0F] border-y border-white/10 overflow-hidden"
    >
      {/* Background Layer: Horizontal drifting blueprint layer */}
      <div
        ref={bgGridRef}
        className="absolute inset-0 bg-blueprint-lines opacity-20 pointer-events-none will-change-transform"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#A71D2A]/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Vertical technical red drawing line on left */}
      <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none">
        <div
          ref={verticalLineRef}
          className="w-full h-full bg-gradient-to-b from-[#C82333] via-[#A71D2A] to-transparent origin-top shadow-[0_0_10px_#C82333]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pl-8 sm:pl-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-space text-[#C82333] uppercase tracking-widest mb-2 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Concept Exclusif CONMIX</span>
            </div>

            <h2 className="font-syne font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase leading-tight">
              <span className="block overflow-hidden">
                <span
                  ref={(el) => {
                    titleLinesRef.current[0] = el;
                  }}
                  className="inline-block"
                >
                  LE MÉTAL
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  ref={(el) => {
                    titleLinesRef.current[1] = el;
                  }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4F4F0] to-[#C82333]"
                >
                  EN MOUVEMENT
                </span>
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#9CA3AF] font-outfit max-w-md">
            Découvrez la métamorphose de la matière brute en un ouvrage métallique sur-mesure d'exception.
          </p>
        </div>

        {/* Step Selector Cards */}
        <div ref={cardsContainerRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`interactive text-left p-4 rounded-xl transition-all duration-300 border ${
                  isActive
                    ? 'bg-[#1A1D20] border-[#A71D2A] shadow-xl shadow-[#A71D2A]/25 translate-y-[-2px]'
                    : 'bg-[#1A1D20]/40 border-white/10 hover:border-white/20 text-white/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-space font-bold text-xs px-2 py-0.5 rounded ${
                      isActive ? 'bg-[#A71D2A] text-white' : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {step.id}
                  </span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#C82333] animate-ping" />}
                </div>
                <h4 className={`font-syne font-bold text-sm sm:text-base ${isActive ? 'text-white' : 'text-white/70'}`}>
                  {step.title}
                </h4>
                <p className="text-[11px] font-space text-[#9CA3AF] mt-1 line-clamp-1">{step.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Step Active Detail Card */}
        <div
          className={`relative rounded-2xl p-6 sm:p-10 border transition-all duration-500 overflow-hidden ${steps[activeStep].visualStyle}`}
        >
          <div className="absolute inset-0 bg-metal-grid opacity-25 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-space font-semibold uppercase">
                <Layers className="w-3.5 h-3.5 text-[#C82333]" />
                <span>{steps[activeStep].badge}</span>
              </div>

              <h3 className="font-syne font-extrabold text-2xl sm:text-4xl text-white">
                {steps[activeStep].title}
              </h3>

              <p className="text-[#9CA3AF] text-sm sm:text-lg font-outfit leading-relaxed">
                {steps[activeStep].desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {steps[activeStep].specs.map((spec, i) => (
                  <div key={i} className="flex items-center space-x-2 p-3 rounded-lg bg-black/40 border border-white/10 text-xs font-space text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-[#C82333] shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="w-full aspect-video rounded-xl bg-black/60 border border-white/15 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                <div
                  className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C82333] to-transparent animate-pulse"
                  style={{ animationDuration: '2s' }}
                />

                <div className="flex items-center justify-between text-xs font-space text-[#9CA3AF]">
                  <span>CONMIX INDUSTRIAL CAO</span>
                  <span className="text-[#C82333]">ÉTAPE {steps[activeStep].id}/04</span>
                </div>

                <div className="my-auto py-4 flex flex-col items-center justify-center text-center space-y-3">
                  {activeStep === 0 && (
                    <div className="w-20 h-20 rounded-lg border-2 border-dashed border-[#9CA3AF] flex items-center justify-center text-[#9CA3AF] group-hover:border-white transition-colors">
                      <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '12s' }} />
                    </div>
                  )}
                  {activeStep === 1 && (
                    <div className="w-20 h-20 rounded-lg bg-[#A71D2A]/20 border border-[#A71D2A] flex items-center justify-center text-[#C82333] shadow-[0_0_25px_rgba(167,29,42,0.5)]">
                      <Flame className="w-10 h-10 animate-pulse" />
                    </div>
                  )}
                  {activeStep === 2 && (
                    <div className="w-20 h-20 rounded-lg bg-[#C82333]/20 border border-[#C82333] flex items-center justify-center text-[#F87171] shadow-[0_0_30px_rgba(200,35,51,0.6)]">
                      <Sparkles className="w-10 h-10 animate-bounce" />
                    </div>
                  )}
                  {activeStep === 3 && (
                    <div className="w-20 h-20 rounded-lg bg-white/20 border border-white flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                      <CheckCircle2 className="w-10 h-10 text-[#C82333]" />
                    </div>
                  )}

                  <span className="font-space font-bold text-xs uppercase tracking-widest text-white">
                    {steps[activeStep].subtitle}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-space text-[#9CA3AF] border-t border-white/10 pt-2">
                  <span>Standard Qualité Eurocode 3</span>
                  <button
                    onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                    className="flex items-center space-x-1 text-[#C82333] hover:underline font-semibold"
                  >
                    <span>Étape suivante</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
