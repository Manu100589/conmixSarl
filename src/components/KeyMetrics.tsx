import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Subtle3DAxis } from './motion/MotionSignatures';

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
      // 1. Entrance animation for metric blocks
      const items = sectionRef.current?.querySelectorAll('.metric-box');
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Animated count-up from 0
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
            <div key={idx} className="metric-box">
              <Subtle3DAxis maxTilt={6}>
                <div
                  className="relative p-6 sm:p-8 rounded-2xl bg-[#1A1D20]/50 border border-white/10 hover:border-[#C82333]/60 hover:shadow-2xl hover:shadow-[#C82333]/20 transition-all duration-300 group flex flex-col justify-between h-full"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#A71D2A]/10 blur-2xl pointer-events-none group-hover:bg-[#C82333]/25 transition-all duration-500 rounded-full" />

                  <div>
                    <div className="font-syne font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tighter flex items-baseline group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#F87171] transition-all duration-300">
                      {metric.prefix && <span className="text-[#C82333] mr-1">{metric.prefix}</span>}
                      <span>{counts[idx]}</span>
                      {metric.suffix && <span className="text-xl sm:text-3xl text-[#C82333] ml-1 font-space font-bold">{metric.suffix}</span>}
                    </div>

                    <div className="h-[2px] w-12 bg-[#C82333] my-4 group-hover:w-full transition-all duration-500 shadow-[0_0_8px_rgba(200,35,51,0.8)]" />

                    <h3 className="font-syne font-bold text-sm sm:text-base text-white uppercase tracking-wider">
                      {metric.label}
                    </h3>
                  </div>

                  <p className="text-xs font-space text-[#9CA3AF] mt-2">
                    {metric.sublabel}
                  </p>
                </div>
              </Subtle3DAxis>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
