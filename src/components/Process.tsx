import React, { useEffect, useRef } from 'react';
import { MessageSquare, Compass, Factory, CheckCircle2, Wrench, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Process: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

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
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative py-24 sm:py-32 bg-[#1A1D20] text-white overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-metal-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#A71D2A]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#0B0D0F] border border-[#A71D2A]/40 text-[#C82333] text-xs font-space font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>04 / NOTRE MÉTHODOLOGIE</span>
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            DE L'IDÉE À LA RÉALISATION.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#9CA3AF] font-outfit font-light">
            Un processus structuré en 5 étapes clés garantissant maîtrise des délais, respect du budget et excellence d'exécution.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 z-0" />

          <div
            ref={lineRef}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#A71D2A] via-[#C82333] to-[#8B0000] -translate-x-1/2 z-0 origin-top shadow-[0_0_12px_rgba(200,35,51,0.8)]"
          />

          <div className="space-y-12 sm:space-y-16 relative z-10">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={`flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } gap-6 md:gap-12 relative group`}
                >
                  <div className="w-full md:w-1/2 pl-16 md:pl-0">
                    <div className="p-6 sm:p-8 rounded-2xl bg-[#0B0D0F] border border-white/10 group-hover:border-[#A71D2A]/70 group-hover:shadow-2xl group-hover:shadow-[#A71D2A]/20 transition-all duration-500 relative">
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
                  </div>

                  <div className="absolute left-6 md:left-1/2 top-6 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0B0D0F] border-2 border-[#A71D2A] flex items-center justify-center text-[#C82333] group-hover:scale-125 group-hover:bg-[#A71D2A] group-hover:text-white transition-all duration-300 shadow-lg shadow-[#A71D2A]/40 z-20">
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
