import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: number;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setProgress(currentProgress);
      }

      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center pointer-events-none select-none transition-opacity duration-500"
      style={{ opacity: progress > 2 ? 1 : 0.25 }}
    >
      {/* Percentage indicator appearing during scroll */}
      <span
        className={`text-[9px] font-space font-bold tracking-widest text-[#C82333] mb-2 transition-all duration-300 ${
          isScrolling ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
        }`}
      >
        {Math.round(progress)}%
      </span>

      {/* Fine dark gray vertical track */}
      <div className="w-[2px] h-32 bg-white/10 rounded-full overflow-hidden relative shadow-[0_0_10px_rgba(0,0,0,0.5)]">
        {/* Red progression fill */}
        <div
          className="w-full bg-gradient-to-b from-[#A71D2A] via-[#C82333] to-[#F87171] rounded-full transition-all duration-150 ease-out shadow-[0_0_8px_rgba(200,35,51,0.8)]"
          style={{ height: `${progress}%` }}
        />
      </div>

      {/* Coordinate label */}
      <span className="text-[7px] font-space tracking-widest text-white/30 uppercase mt-2 [writing-mode:vertical-lr] rotate-180">
        CONMIX
      </span>
    </div>
  );
};
