import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ParallaxSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (textContainerRef.current) {
        gsap.to(textContainerRef.current, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0B0D0F] border-y border-white/10"
    >
      <div
        ref={bgRef}
        className="absolute inset-[-10%] w-[120%] h-[120%] z-0 pointer-events-none"
      >
        <img
          src="/imagi/550210797_1099029635626488_3578767378477851874_n.jpg"
          alt="Metal Craft Parallax Backdrop Real CONMIX"
          className="w-full h-full object-cover object-center filter brightness-[0.35] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0F] via-transparent to-[#0B0D0F]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D0F] via-transparent to-[#0B0D0F]" />
        <div className="absolute inset-0 bg-metal-grid opacity-30" />
      </div>

      <div
        ref={textContainerRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6"
      >
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1A1D20]/80 border border-[#A71D2A]/40 text-[#C82333] text-xs font-space font-semibold uppercase tracking-widest backdrop-blur-md">
          <span>ADN CONMIX SARL</span>
        </div>

        <h2 className="font-syne font-extrabold text-4xl sm:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.95] drop-shadow-2xl">
          <span className="block text-white/90">DU MÉTAL.</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F4F4F0] via-[#C82333] to-[#F87171]">
            DE LA PRÉCISION.
          </span>
          <span className="block text-white/90">DU CARACTÈRE.</span>
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#9CA3AF] font-outfit font-light leading-relaxed pt-4">
          Une maîtrise totale du métal guidée par des décennies d'exigence technique, d'audace architecturale et d'innovation industrielle.
        </p>

        <div className="pt-6 flex justify-center">
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#C82333] to-transparent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
