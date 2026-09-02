import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Header from './Header';
import FeatureCards from './FeatureCards';

// Composant utilitaire pour révéler un bloc sur une tranche de scroll précise
function ScrollRevealItem({
  children,
  progress,
  range,
  className = '',
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [25, 0]);
  const filter = useTransform(
    progress,
    range,
    ['blur(8px)', 'blur(0px)']
  );

  return (
    <motion.div style={{ opacity, y, filter }} className={className}>
      {children}
    </motion.div>
  );
}

const propositions = [
  {
    id: 1,
    badge: '🚀 PROPOSITION 1 — CRÉDIBILITÉ',
    headline: 'Votre entreprise mérite d’être visible sur Internet.',
    paragraph: 'Un site web professionnel pour présenter vos services, rassurer vos clients et développer votre activité.',
    cta: 'Développer mon activité',
    range: [0.05, 0.28] as [number, number]
  },
  {
    id: 2,
    badge: '💰 PROPOSITION 2 — ACQUISITION DE CLIENTS',
    headline: 'Transformez vos visiteurs en clients.',
    paragraph: 'Nous créons des sites web modernes, rapides et pensés pour vous aider à attirer des prospects et faciliter les prises de contact.',
    cta: 'Attirer des prospects',
    range: [0.32, 0.60] as [number, number]
  },
  {
    id: 3,
    badge: '⚡ PROPOSITION 3 — IMPACT',
    headline: 'Ne laissez plus vos clients chercher vos concurrents.',
    paragraph: 'Offrez à votre entreprise une présence digitale professionnelle, accessible 24h/24 et adaptée à tous les smartphones.',
    cta: 'Propulser mon entreprise',
    range: [0.64, 0.90] as [number, number]
  }
];

export default function OperonHero() {
  const targetRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Détection de l'avancement du scroll de 0 à 1 sur la hauteur totale
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Preload background video sequence (100 frames)
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 0; i < 100; i++) {
      const img = new Image();
      const paddedNum = String(i).padStart(3, '0');
      img.src = `/vid/Man_typing_on_laptop_202608280426_${paddedNum}.jpg`;
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
  }, []);

  // Continuous background video loop (25 FPS flicker-free canvas)
  useEffect(() => {
    let frame = 0;
    let animId: number;
    let lastTime = performance.now();
    const interval = 1000 / 25;

    const render = (now: number) => {
      animId = requestAnimationFrame(render);
      if (now - lastTime >= interval) {
        lastTime = now;
        frame = (frame + 1) % 100;
        
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          const img = imagesRef.current[frame];
          if (ctx && img && img.complete && img.naturalWidth > 0) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        }
      }
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div ref={targetRef} className="relative h-[300vh] bg-[#EFECE6] text-[#0A2239]">
      
      {/* Conteneur bloqué en plein écran pendant le scroll */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden font-sans">
        
        {/* FULLSCREEN CANVAS VIDEO BACKGROUND */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#0A2239]">
          <canvas
            ref={canvasRef}
            width={1280}
            height={720}
            className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.65] scale-[1.02]"
          />

          {/* Gradient Scrims for Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2239]/95 via-[#0A2239]/80 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2239] via-transparent to-[#0A2239]/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A2239]/80 via-transparent to-transparent pointer-events-none" />

          {/* Ambient Glow Effects */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00B8FF]/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#7000FF]/15 rounded-full blur-[140px] pointer-events-none" />
        </div>

        {/* Barre de navigation fixe */}
        <div className="relative z-20">
          <Header />
        </div>

        {/* Zone centrale avec révélations séquencées */}
        <main className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 flex-1 flex items-center py-6 md:py-12">
          <div className="relative w-full max-w-4xl space-y-6">
            
            {/* Titre Principal Fixe "AUTOMATE BUSINESS" avec effet ScrollReveal */}
            <ScrollRevealItem progress={scrollYProgress} range={[0.02, 0.18]}>
              <span className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-widest bg-white/10 backdrop-blur-md text-[#00FFA3] rounded-full border border-white/15">
                ● Operon AI Architecture
              </span>
            </ScrollRevealItem>

            <ScrollRevealItem progress={scrollYProgress} range={[0.08, 0.25]}>
              <h1 className="text-6xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none text-white drop-shadow-md">
                AUTOMATE
              </h1>
            </ScrollRevealItem>

            <ScrollRevealItem progress={scrollYProgress} range={[0.15, 0.32]}>
              <h1 className="text-6xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none bg-gradient-to-r from-white via-cyan-300 to-[#FF6600] bg-clip-text text-transparent drop-shadow-md">
                BUSINESS.
              </h1>
            </ScrollRevealItem>

            {/* Propositions Séquencées Révélées sur leurs Tranches de Scroll Respectives */}
            {propositions.map((prop) => (
              <ScrollRevealItem
                key={prop.id}
                progress={scrollYProgress}
                range={prop.range}
                className="space-y-4 pt-4"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono uppercase tracking-widest bg-[#FF6600]/20 text-[#FF9933] border border-[#FF6600]/30 rounded-full backdrop-blur-sm">
                  {prop.badge}
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                  {prop.headline}
                </h2>

                <p className="text-base md:text-xl text-neutral-300 max-w-xl font-normal leading-relaxed">
                  {prop.paragraph}
                </p>

                <div className="flex gap-4 pt-2">
                  <button className="bg-gradient-to-r from-[#00B8FF] to-[#7000FF] hover:from-[#00FFA3] hover:to-[#00B8FF] text-white px-8 py-4 rounded-sm font-semibold text-sm hover:scale-105 transition-all shadow-lg cursor-pointer">
                    {prop.cta}
                  </button>
                  <button className="border border-white/30 text-white px-6 py-4 rounded-sm font-semibold text-sm hover:bg-white/10 transition-colors cursor-pointer">
                    Voir la Démo
                  </button>
                </div>
              </ScrollRevealItem>
            ))}

          </div>
        </main>

        {/* Indicateur de progression discret en bas */}
        <div className="relative z-20 px-6 md:px-12 pb-6 md:pb-8 flex flex-col gap-2">
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              className="h-full bg-gradient-to-r from-[#00B8FF] via-[#00FFA3] to-[#FF6600]"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-1">
            <span>Faites défiler pour explorer ↓</span>
            <span className="hidden sm:inline">FIXED VIDEO LOOP (25 FPS) • OPERON AI</span>
          </div>
        </div>

        {/* BOTTOM RIGHT FLOATING FEATURE CARDS */}
        <div className="relative md:absolute md:bottom-8 md:right-12 z-30 px-6 md:px-0 pb-6 md:pb-0">
          <FeatureCards />
        </div>

      </div>

    </div>
  );
}
