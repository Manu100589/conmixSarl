import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Metric {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel: string;
}

export const KeyMetrics: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  const metrics: Metric[] = [
    { target: 150, prefix: '+', label: 'PROJETS D’EXCEPTION', sublabel: 'Réalisations uniques livrées' },
    { target: 12, prefix: '+', suffix: ' ANS', label: 'D’EXPÉRIENCE', sublabel: 'Maitrise technique certifiée' },
    { target: 100, suffix: '%', label: 'SUR MESURE', sublabel: 'Conception personnalisée' },
    { target: 0, suffix: ' DEF', label: 'QUALITÉ ABSOLUE', sublabel: 'Contrôle à 100% en atelier' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          metrics.forEach((metric, index) => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: metric.target,
              duration: 2.2,
              ease: 'power2.out',
              onUpdate: () => {
                setCounts((prev) => {
                  const next = [...prev];
                  next[index] = Math.round(obj.val);
                  return next;
                });
              },
            });
          });
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-[#0B0D0F] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-8 rounded-2xl bg-[#1A1D20]/40 border border-white/10 hover:border-[#A71D2A]/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#A71D2A]/10 blur-2xl pointer-events-none group-hover:bg-[#A71D2A]/20 transition-all duration-500 rounded-full" />

              <div>
                <div className="font-syne font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight flex items-baseline">
                  {metric.prefix && <span className="text-[#C82333] mr-1">{metric.prefix}</span>}
                  <span>{counts[idx]}</span>
                  {metric.suffix && <span className="text-xl sm:text-3xl text-[#C82333] ml-1 font-space font-bold">{metric.suffix}</span>}
                </div>

                <div className="h-[2px] w-12 bg-[#C82333] my-4 group-hover:w-full transition-all duration-500" />

                <h3 className="font-syne font-bold text-sm sm:text-base text-white uppercase tracking-wider">
                  {metric.label}
                </h3>
              </div>

              <p className="text-xs font-space text-[#9CA3AF] mt-2">
                {metric.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
