import React, { useState, useRef, useCallback, useEffect } from 'react';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

export const BeforeAfter: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  }, []);

  const onMouseDown = () => setIsDragging(true);
  const onMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <section className="relative py-24 sm:py-32 bg-[#0B0D0F] text-white border-b border-white/10 overflow-hidden">
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[300px] bg-[#A71D2A]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1A1D20] border border-[#A71D2A]/40 text-[#C82333] text-xs font-space font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>05 / MÉTAMORPHOSE ARCHITECTURALE</span>
          </div>
          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            TRANSFORMATION & RÉNOVATION
          </h2>
          <p className="mt-3 text-base text-[#9CA3AF] font-outfit">
            Glissez la poignée centrale pour comparer l'état d'origine du chantier avec la création d'exception CONMIX SARL.
          </p>
        </div>

        <div
          ref={containerRef}
          onMouseDown={onMouseDown}
          onTouchStart={onMouseDown}
          onClick={(e) => handleMove(e.clientX)}
          className="relative max-w-5xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl select-none cursor-ew-resize group"
        >
          {/* AFTER Image (Full Width Base Layer) */}
          <img
            src="/imagi/557284613_1108182218044563_1799444793147620466_n.jpg"
            alt="Après - Structure métallique d'exception CONMIX"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          <div className="absolute top-6 right-6 px-4 py-2 rounded-lg bg-[#A71D2A] text-white font-space font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#A71D2A]/40">
            APRÈS — OUVRAGE FINI
          </div>

          {/* BEFORE Image (Clipped Top Layer) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src="/imagi/548476386_1097101992485919_649683484737793793_n.jpg"
              alt="Avant - Assemblage chantier brut CONMIX"
              className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
              style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
            />
            <div className="absolute top-6 left-6 px-4 py-2 rounded-lg bg-[#0B0D0F]/90 backdrop-blur-md border border-white/20 text-white font-space font-bold text-xs uppercase tracking-widest">
              AVANT — CHANTIER BRUT
            </div>
          </div>

          <div
            className="absolute top-0 bottom-0 w-[3px] bg-[#C82333] shadow-[0_0_15px_rgba(200,35,51,0.9)] z-20 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#A71D2A] text-white border-2 border-white shadow-2xl flex items-center justify-center pointer-events-auto transform group-hover:scale-110 transition-transform">
              <SlidersHorizontal className="w-5 h-5 rotate-90" />
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs font-space text-[#9CA3AF] flex items-center justify-center space-x-2">
          <span>👈 Faites glisser le curseur pour explorer la transformation 👉</span>
        </div>
      </div>
    </section>
  );
};
