import React, { useEffect, useRef } from 'react';
import { MessageSquare, Compass, Factory, CheckCircle2, Wrench, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { KineticTracking, Subtle3DAxis, ParallaxWatermark } from './motion/MotionSignatures';

gsap.registerPlugin(ScrollTrigger);

export const Process: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const laserHeadRef = useRef<HTMLDivElement | null>(null);

  const steps = [
    {
      number: '01',
      title: 'ÉCHANGE & ÉTUDE',
      subtitle: 'Compréhension du besoin et des contraintes',
      desc: 'Analyse approfondie de votre projet architectural, étude des cotes sur site, contraintes de charge, choix des matériaux et faisabilité technique.',
      icon: MessageSquare,
      detail: 'Rendez-vous sur site & relevé 3D précis',
    },
    {
      number: '02',
      title: 'CONCEPTION CAO 3D',
      subtitle: 'Étude et définition de la solution',
      desc: 'Élaboration des plans de fabrication 3D BIM, modélisation des assemblages, calculs d\'ingénierie et présentation du rendu virtuel pour validation.',
      icon: Compass,
      detail: 'Plans d\'exécution & note de calcul Eurocode 3',
    },
    {
      number: '03',
      title: 'FABRICATION EN ATELIER',
      subtitle: 'Production dans nos ateliers équipés',
      desc: 'Découpe laser numérique, pliage haute précision, traçage, assemblage et soudures TIG/MIG réalisés par nos chaudronniers métalleux qualifiés.',
      icon: Factory,
      detail: 'Contrôle métrologique & soudures d\'art',
    },
    {
      number: '04',
      title: 'CONTRÔLE & TRAITEMENT',
      subtitle: 'Vérification des finitions et de la qualité',
      desc: 'Contrôle qualité rigoureux, ébavurage, sablage, métallisation et thermo-laquage époxy cuit au four pour une protection anti-corrosion maximale.',
      icon: CheckCircle2,
      detail: 'Test d\'adhérence & contrôle d\'épaisseur de peinture',
    },
    {
      number: '05',
      title: 'INSTALLATION SUR SITE',
      subtitle: 'Pose et mise en service sur site',
      desc: 'Transport sécurisé, levage et fixation rigoureuse par nos équipes d\'installateurs chevronnés. Nettoyage du chantier et réception officielle.',
      icon: Wrench,
      detail: 'Garantie décennale & procès-verbal de réception',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Central Line & Laser Head Growth with scrub
      if (lineRef.current && laserHeadRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              end: 'bottom 85%',
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          laserHeadRef.current,
          { top: '0%' },
          {
            top: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              end: 'bottom 85%',
              scrub: true,
            },
          }
        );
      }

      // 2. Individual Step Reveals
      const stepItems = sectionRef.current?.querySelectorAll('.process-step-item');
      if (stepItems) {
        stepItems.forEach((item) => {
          const card = item.querySelector('.process-card');
          const circle = item.querySelector('.process-circle');
          const connector = item.querySelector('.process-connector');

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          });

          if (circle) {
            tl.fromTo(
              circle,
              { scale: 0.7, opacity: 0.4 },
              { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
            );
          }

          if (connector) {
            tl.fromTo(
              connector,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.3, ease: 'power2.out' },
              '-=0.2'
            );
          }

          if (card) {
            tl.fromTo(
              card,
              { opacity: 0, y: 35, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
              '-=0.2'
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative py-24 sm:py-32 bg-[#1A1D20] text-white overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-metal-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#A71D2A]/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Filigrane Parallaxe Monumental Inter-Section */}
      <ParallaxWatermark text="MÉTHODOLOGIE" speed={0.4} align="right" className="top-10 -right-8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#0B0D0F] border border-[#A71D2A]/40 text-[#C82333] text-xs font-space font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>04 / NOTRE MÉTHODOLOGIE</span>
          </div>

          <KineticTracking tag="h2" className="font-syne font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            DE L'IDÉE À LA RÉALISATION.
          </KineticTracking>

          <p className="mt-4 text-base sm:text-lg text-[#9CA3AF] font-outfit font-light">
            Un processus structuré en 5 étapes clés garantissant maîtrise des délais, respect du budget et excellence d'exécution.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Static Track Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 z-0" />

          {/* Active Red Laser Line */}
          <div
            ref={lineRef}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#A71D2A] via-[#C82333] to-[#8B0000] -translate-x-1/2 z-0 origin-top shadow-[0_0_12px_rgba(200,35,51,0.8)]"
          />

          {/* Moving Laser Head Point */}
          <div
            ref={laserHeadRef}
            className="absolute left-6 md:left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#C82333] shadow-[0_0_20px_#C82333] z-20 pointer-events-none flex items-center justify-center"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </div>

          <div className="space-y-12 sm:space-y-16 relative z-10">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={`process-step-item flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } gap-6 md:gap-12 relative group`}
                >
                  <div className="w-full md:w-1/2 pl-16 md:pl-0">
                    <Subtle3DAxis maxTilt={5}>
                      <div className="process-card p-6 sm:p-8 rounded-2xl bg-[#0B0D0F] border border-white/10 group-hover:border-[#C82333] group-hover:shadow-2xl group-hover:shadow-[#C82333]/25 transition-all duration-500 relative">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-space font-extrabold text-2xl text-[#C82333]">
                            {step.number}
                          </span>
                          <span className="text-[11px] font-space text-white/60 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                            {step.detail}
                          </span>
                        </div>

                        <h3 className="font-syne font-bold text-xl text-white group-hover:text-[#C82333] transition-colors mb-1">
                          {step.title}
                        </h3>

                        <h4 className="text-xs font-space text-[#C82333] mb-3 font-medium">
                          {step.subtitle}
                        </h4>

                        <p className="text-xs sm:text-sm text-[#9CA3AF] font-outfit leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </Subtle3DAxis>
                  </div>

                  {/* Horizontal Fine Connector Line */}
                  <div
                    className={`process-connector hidden md:block absolute top-12 ${
                      isEven
                        ? 'left-1/2 right-[50%] w-6 origin-right'
                        : 'left-1/2 w-6 origin-left'
                    } h-[1px] bg-[#C82333]/60 pointer-events-none z-10`}
                  />

                  {/* Step Milestone Node */}
                  <div className="process-circle absolute left-6 md:left-1/2 top-6 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0B0D0F] border-2 border-[#A71D2A] flex items-center justify-center text-[#C82333] group-hover:scale-125 group-hover:bg-[#A71D2A] group-hover:text-white transition-all duration-300 shadow-lg shadow-[#A71D2A]/40 z-20">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
