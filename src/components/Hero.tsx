import React, { useEffect, useRef } from 'react';
import { ArrowDown, Sparkles, ShieldCheck, Hammer, Layers } from 'lucide-react';
import gsap from 'gsap';

interface HeroProps {
  onOpenQuoteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleWordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      decay: number;
      color: string;
    }

    const particles: Particle[] = [];
    const colors = ['#C82333', '#A71D2A', '#F87171', '#FFFFFF', '#6B0F1A'];

    const createParticle = () => {
      const originX = width * (0.6 + Math.random() * 0.2);
      const originY = height * (0.65 + Math.random() * 0.15);

      particles.push({
        x: originX,
        y: originY,
        vx: (Math.random() - 0.5) * 6,
        vy: -Math.random() * 5 - 2,
        size: Math.random() * 2.5 + 1,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (Math.random() < 0.6) {
        createParticle();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    if (titleWordsRef.current.length > 0) {
      gsap.fromTo(
        titleWordsRef.current,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.2,
        }
      );
    }
  }, []);

  const addToTitleRef = (el: HTMLSpanElement | null) => {
    if (el && !titleWordsRef.current.includes(el)) {
      titleWordsRef.current.push(el);
    }
  };

  const titleWords = [
    { text: 'NOUS', highlight: false },
    { text: 'DONNONS', highlight: false },
    { text: 'FORME', highlight: false },
    { text: 'AU', highlight: false },
    { text: 'MÉTAL.', highlight: true },
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#0B0D0F]"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/imagi/557723202_1108182391377879_8168269075197127529_n.jpg"
          alt="CONMIX SARL Real Atelier Fabrication"
          className="w-full h-full object-cover object-center scale-105 opacity-45 filter brightness-75 contrast-125 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0F] via-[#0B0D0F]/70 to-[#0B0D0F]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D0F]/90 via-transparent to-[#0B0D0F]/60" />
        <div className="absolute inset-0 bg-metal-grid opacity-30 pointer-events-none" />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10 opacity-80"
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-between min-h-[calc(100vh-160px)]">
        <div className="pt-6 sm:pt-10 flex items-center space-x-3">
          <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1A1D20]/90 border border-[#A71D2A]/40 text-[#C82333] text-xs font-space font-semibold uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#C82333]" />
            <span>Chaudronnerie D'Art & Construction Mixte</span>
          </span>
          <span className="hidden sm:inline-block h-[1px] w-16 bg-gradient-to-r from-[#A71D2A]/60 to-transparent" />
        </div>

        <div className="my-auto py-12 max-w-4xl">
          <h1 className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white">
            {titleWords.map((word, idx) => (
              <span
                key={idx}
                ref={addToTitleRef}
                className={`inline-block mr-3 sm:mr-5 ${
                  word.highlight
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#F4F4F0] via-[#C82333] to-[#F87171] drop-shadow-[0_0_35px_rgba(200,35,51,0.5)]'
                    : ''
                }`}
              >
                {word.text}
              </span>
            ))}
          </h1>

          <p className="mt-8 text-base sm:text-xl lg:text-2xl text-[#9CA3AF] font-outfit font-light max-w-2xl leading-relaxed">
            Menuiserie métallique sur mesure.{' '}
            <strong className="text-white font-medium">Conception. Fabrication. Installation.</strong>
            <br />
            Pour résidences d'exception, bâtiments tertiaires et projets architecturaux exigeants.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-5">
            <button
              onClick={onOpenQuoteModal}
              className="interactive group relative overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-r from-[#A71D2A] via-[#C82333] to-[#8B0000] text-white font-space font-bold text-sm tracking-wider uppercase shadow-2xl shadow-[#A71D2A]/40 hover:shadow-[#A71D2A]/70 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <span>Demander un devis</span>
                <Hammer className="w-4 h-4 transition-transform group-hover:rotate-12" />
              </span>
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </button>

            <a
              href="#showcase"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#showcase')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="interactive group flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-[#1A1D20]/80 border border-white/15 hover:border-[#C82333]/60 text-white font-space text-sm font-semibold tracking-wider uppercase backdrop-blur-md transition-all duration-300 hover:bg-[#1A1D20]"
            >
              <span>Découvrir nos réalisations</span>
              <Layers className="w-4 h-4 text-[#C82333] group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4 sm:gap-6 text-xs text-[#9CA3AF] font-space">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#C82333]" />
              <span>Garantie Décennale</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#C82333] animate-ping" />
              <span>Norme Eurocodes & NF</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white font-bold">100%</span>
              <span>Atelier Sur-Mesure</span>
            </div>
          </div>

          <a
            href="#introduction"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#introduction')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center space-x-3 text-xs font-space font-semibold uppercase tracking-widest text-[#9CA3AF] hover:text-[#C82333] transition-colors"
          >
            <span>SCROLL</span>
            <div className="w-8 h-8 rounded-full border border-white/20 group-hover:border-[#C82333] flex items-center justify-center transition-colors">
              <ArrowDown className="w-4 h-4 animate-bounce text-[#C82333]" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
