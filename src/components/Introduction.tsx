import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Ruler, Award, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Introduction: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.1 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }

      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="introduction"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#0B0D0F] text-[#F4F4F0] overflow-hidden border-b border-white/10"
    >
      <div className="absolute inset-0 bg-metal-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center space-x-3 mb-8">
          <span className="font-space text-xs font-bold uppercase tracking-widest text-[#C82333] px-3 py-1 bg-[#1A1D20] border border-[#A71D2A]/40 rounded-full">
            01 / PRÉCISION ET PASSION
          </span>
          <div className="h-[1px] w-20 bg-gradient-to-r from-[#A71D2A]/60 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div ref={textRef} className="lg:col-span-7 space-y-8">
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05]">
              LA PRÉCISION DANS <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4F4F0] to-[#C82333]">
                CHAQUE DÉTAIL.
              </span>
            </h2>

            <div className="h-1 w-24 bg-gradient-to-r from-[#A71D2A] to-transparent rounded-full" />

            <p className="text-base sm:text-xl text-[#9CA3AF] font-outfit font-light leading-relaxed">
              Chez <strong className="text-white font-semibold">CONMIX SARL</strong>, nous transformons le métal en solutions durables, fonctionnelles et esthétiques. Chaque ouvrage est pensé selon les exigences du projet, fabriqué avec précision et installé avec rigueur.
            </p>

            <p className="text-sm sm:text-base text-white/80 font-outfit leading-relaxed border-l-2 border-[#A71D2A] pl-4 py-1 italic">
              « Qu'il s'agisse d'une verrière d'atelier haut de gamme, d'un escalier suspendu ou d'une structure métallique industrielle complexe, nos réalisations incarnent la rencontre entre l'ingénierie et l'art de la chaudronnerie d'art. »
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#1A1D20]/60 border border-white/10 hover:border-[#A71D2A]/50 transition-colors">
                <Ruler className="w-6 h-6 text-[#C82333] mb-2" />
                <h4 className="font-syne font-bold text-sm text-white">Précision Milimétrique</h4>
                <p className="text-xs text-[#9CA3AF] font-space mt-1">Conception CAO 3D & Découpe laser au 1/10e mm.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#1A1D20]/60 border border-white/10 hover:border-[#A71D2A]/50 transition-colors">
                <ShieldCheck className="w-6 h-6 text-[#C82333] mb-2" />
                <h4 className="font-syne font-bold text-sm text-white">Traitements Nobles</h4>
                <p className="text-xs text-[#9CA3AF] font-space mt-1">Thermo-laquage, galvanisation & acier Corten.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#1A1D20]/60 border border-white/10 hover:border-[#A71D2A]/50 transition-colors">
                <Award className="w-6 h-6 text-[#C82333] mb-2" />
                <h4 className="font-syne font-bold text-sm text-white">Pose Clé en Main</h4>
                <p className="text-xs text-[#9CA3AF] font-space mt-1">Équipes de pose qualifiées avec garantie décennale.</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-2">
              <div className="flex items-center space-x-2 text-xs font-space text-white/90">
                <CheckCircle className="w-4 h-4 text-[#C82333]" />
                <span>Intervention Particuliers & Professionnels</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-space text-white/90">
                <CheckCircle className="w-4 h-4 text-[#C82333]" />
                <span>Projets Immobiliers & Commerces</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div
              ref={imageWrapperRef}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 aspect-[4/5] group"
            >
              <img
                src="/imagi/550317449_1099029452293173_6664467472333154406_n.jpg"
                alt="Escalier metallique sur mesure CONMIX Real Craft"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0F] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#1A1D20]/90 backdrop-blur-md border border-white/10 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-space tracking-widest text-[#C82333] uppercase font-bold">RÉALISATION ATELIER</span>
                    <h4 className="font-syne font-bold text-sm text-white">Escalier Métallique Sur Mesure</h4>
                  </div>
                  <span className="text-xs font-space px-2.5 py-1 rounded bg-[#A71D2A]/20 border border-[#A71D2A]/40 text-[#C82333] font-semibold">
                    2025
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#A71D2A]/20 rounded-full blur-3xl pointer-events-none -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
