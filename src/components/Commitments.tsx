import React from 'react';
import { Target, Shield, Sparkles, Clock, CheckCircle } from 'lucide-react';

export const Commitments: React.FC = () => {
  const commitments = [
    {
      title: 'PRÉCISION',
      subtitle: 'Chaque détail compte.',
      desc: 'Métrologie laser, ajustement au dixième de millimètre et meulage méticuleux des soudures pour des finitions d’une netteté absolue.',
      icon: Target,
      tag: '01 / RIGOUEUR',
    },
    {
      title: 'DURABILITÉ',
      subtitle: 'Des ouvrages conçus pour durer.',
      desc: 'Acier galvanisé à chaud, traitements anti-corrosion haute performance et thermo-laquage résistant aux intempéries et rayons UV.',
      icon: Shield,
      tag: '02 / LONGEVITÉ',
    },
    {
      title: 'SUR-MESURE',
      subtitle: 'Chaque projet est unique.',
      desc: 'Aucun catalogue préconçu. Nous créons des pièces uniques parfaitement ajustées à l’architecture et au style de votre édifice.',
      icon: Sparkles,
      tag: '03 / CREATIVITÉ',
    },
    {
      title: 'FIABILITÉ',
      subtitle: 'Accompagnement de A à Z.',
      desc: 'Respect strict des délais annoncés, transparence budgétaire et garantie décennale couvrant l’intégralité de nos ouvrages.',
      icon: Clock,
      tag: '04 / ENGAGEMENT',
    },
  ];

  return (
    <section id="commitments" className="relative py-24 sm:py-32 bg-[#1A1D20] text-white border-b border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-metal-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#A71D2A]/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-space text-xs font-bold uppercase tracking-widest text-[#C82333] px-3 py-1 bg-[#0B0D0F] border border-[#A71D2A]/40 rounded-full inline-block mb-3">
            NOS VALEURS ET EXIGENCES
          </span>
          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            NOTRE ENGAGEMENT
          </h2>
          <p className="mt-4 text-base text-[#9CA3AF] font-outfit">
            Les quatre piliers indéboulonnables qui guident chacune de nos réalisations en atelier comme sur le terrain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {commitments.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="interactive group relative p-8 rounded-2xl bg-[#0B0D0F] border border-white/10 hover:border-[#A71D2A] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#A71D2A]/25 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-space font-semibold text-[#C82333] uppercase tracking-widest">
                      {item.tag}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[#1A1D20] border border-white/10 flex items-center justify-center text-[#C82333] group-hover:scale-110 group-hover:bg-[#A71D2A] group-hover:text-white transition-all duration-300 shadow-md">
                      <IconComp className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-syne font-extrabold text-2xl text-white group-hover:text-[#C82333] transition-colors mb-1">
                    {item.title}
                  </h3>

                  <h4 className="text-xs font-space font-medium text-[#C82333] mb-4">
                    {item.subtitle}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#9CA3AF] font-outfit leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 mt-6 flex items-center space-x-2 text-[11px] font-space text-white/70">
                  <CheckCircle className="w-3.5 h-3.5 text-[#C82333]" />
                  <span>Conforme Normes AFNOR & NF</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
