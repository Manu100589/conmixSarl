import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * 1. SplitMaskReveal (H1 & Titres Majeurs)
 * - Lignes découpées dans des wrappers overflow: hidden
 * - Animation au scroll : opacity: 0 -> 1, translateY(100%) -> translateY(0%),
 *   clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%) -> polygon(0 0, 100% 0, 100% 100%, 0 100%)
 * - Stagger léger (0.1s)
 */
interface SplitMaskRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  triggerHook?: string;
}

export const SplitMaskReveal: React.FC<SplitMaskRevealProps> = ({
  children,
  className = '',
  delay = 0.1,
  stagger = 0.1,
  triggerHook = 'top 85%',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const items = el.querySelectorAll('.mask-line-inner');
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        {
          yPercent: 110,
          opacity: 0,
          clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
        },
        {
          yPercent: 0,
          opacity: 1,
          clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
          duration: 1.1,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: triggerHook,
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, stagger, triggerHook]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export const MaskLine: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <span className="mask-line-inner inline-block w-full">{children}</span>
    </span>
  );
};

/**
 * 2. KineticTracking (H2 & En-têtes de Sections)
 * - Contrôle direct du letter-spacing au scroll via ScrollTrigger scrub
 * - Initial : letterSpacing: 0.22em, opacity: 0.2
 * - Actif : letterSpacing: -0.03em, opacity: 1
 * - Sortie : letterSpacing: 0.12em
 */
interface KineticTrackingProps {
  children: React.ReactNode;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'div' | 'span';
}

export const KineticTracking: React.FC<KineticTrackingProps> = ({
  children,
  className = '',
  tag: Tag = 'h2',
}) => {
  const textRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 95%',
          end: 'bottom 40%',
          scrub: 1.2,
        },
      });

      tl.fromTo(
        el,
        {
          letterSpacing: '0.22em',
          opacity: 0.3,
        },
        {
          letterSpacing: '-0.025em',
          opacity: 1,
          ease: 'power2.out',
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return React.createElement(
    Tag,
    {
      ref: textRef,
      className: `tracking-tight transition-transform ${className}`,
    },
    children
  );
};

/**
 * 3. WordDisplacement (H2 & Déclarations de Vision)
 * - Découpe par mots avec trajectoires micro-décalées individuelles (x: -12px..12px, y: 30px..42px, rotation: ±1.5°)
 * - Stagger très faible (0.04s) pour converger avec précision
 */
interface WordDisplacementProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClass?: string;
}

export const WordDisplacement: React.FC<WordDisplacementProps> = ({
  text,
  className = '',
  highlightWords = [],
  highlightClass = 'text-[#C82333]',
}) => {
  const containerRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll('.displace-word');
    if (!words.length) return;

    const ctx = gsap.context(() => {
      words.forEach((w, index) => {
        // Pseudo random deterministic offset based on index
        const hash = (index * 9301 + 49297) % 233280;
        const norm = hash / 233280;
        const offsetX = (norm - 0.5) * 24; // -12px à +12px
        const offsetY = 30 + norm * 12; // 30px à 42px
        const rotation = (norm - 0.5) * 3; // -1.5° à +1.5°

        gsap.fromTo(
          w,
          {
            opacity: 0,
            x: offsetX,
            y: offsetY,
            rotation,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.9,
            delay: index * 0.035,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [text]);

  const words = text.split(' ');

  return (
    <p ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const cleanWord = word.replace(/[«»,.:;]/g, '');
        const isHighlight = highlightWords.includes(cleanWord);
        return (
          <span
            key={i}
            className={`displace-word inline-block mr-[0.32em] mb-[0.15em] will-change-transform ${
              isHighlight ? highlightClass : ''
            }`}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
};

/**
 * 4. LineParallax (H1 Éditoriaux Multi-lignes)
 * - Chaque ligne défile à une vitesse relative différente au scroll
 *   speeds: [1.0, 0.85, 1.15, 0.90]
 */
interface LineParallaxProps {
  lines: string[];
  className?: string;
  speeds?: number[];
  lineClassName?: (index: number) => string;
}

export const LineParallax: React.FC<LineParallaxProps> = ({
  lines,
  className = '',
  speeds = [1.0, 0.85, 1.15, 0.9],
  lineClassName,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const lineElements = el.querySelectorAll('.parallax-line');
    if (!lineElements.length) return;

    const ctx = gsap.context(() => {
      lineElements.forEach((lineEl, idx) => {
        const speed = speeds[idx % speeds.length];
        const moveAmount = (speed - 1.0) * 80;

        gsap.to(lineEl, {
          y: moveAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [lines, speeds]);

  return (
    <div ref={containerRef} className={`space-y-1 ${className}`}>
      {lines.map((line, idx) => (
        <div
          key={idx}
          className={`parallax-line will-change-transform ${
            lineClassName ? lineClassName(idx) : ''
          }`}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

/**
 * 5. Subtle3DAxis (H2 d'Offres, Valeurs & Cards)
 * - Conteneur en perspective (perspective: 1000px)
 * - Rotation 3D subtile de l'axe : rotateX: 4°, rotateY: -2°, translateZ: -25px
 *   qui s'aplanit en douceur au scroll et réagit subtilement à la souris.
 */
interface Subtle3DAxisProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export const Subtle3DAxis: React.FC<Subtle3DAxisProps> = ({
  children,
  className = '',
  maxTilt = 6,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          rotateX: 4,
          rotateY: -2,
          translateZ: -25,
          opacity: 0.85,
        },
        {
          rotateX: 0,
          rotateY: 0,
          translateZ: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );
    }, el);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(el, {
        rotateX: -y * maxTilt,
        rotateY: x * maxTilt,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ctx.revert();
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt]);

  return (
    <div style={{ perspective: '1000px' }} className="w-full">
      <div
        ref={cardRef}
        style={{ transformStyle: 'preserve-3d' }}
        className={`transition-shadow ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * 6. MagneticButton (CTA Éditorial Haut de Gamme)
 * - Effet magnétique fluide suivant le curseur utilisateur
 */
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  pullStrength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  pullStrength = 0.35,
}) => {
  const btnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = el.getBoundingClientRect();
      const x = (clientX - (rect.left + rect.width / 2)) * pullStrength;
      const y = (clientY - (rect.top + rect.height / 2)) * pullStrength;
      xTo(x);
      yTo(y);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [pullStrength]);

  return (
    <div
      ref={btnRef}
      onClick={onClick}
      className={`inline-block cursor-pointer will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * 7. ParallaxLayer (Éléments & Arrière-plans Flottants Inter-Sections)
 * - Déplace l'élément au scroll avec un facteur de vitesse `speed` (ex: 0.35 ou -0.35)
 */
interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed = 0.25,
  className = '',
  triggerRef,
}) => {
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const triggerEl = triggerRef?.current || el;
    const distance = speed * 160;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -distance / 2 },
        {
          y: distance / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [speed, triggerRef]);

  return (
    <div ref={elRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};

/**
 * 8. ParallaxMedia (Aperture d'images à défilement cinématographique)
 * - Contraint l'image dans un wrapper overflow: hidden
 * - Fait défiler l'image intérieure avec un léger zoom et un décalage yPercent (-12% -> +12%)
 */
interface ParallaxMediaProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  speed?: number;
}

export const ParallaxMedia: React.FC<ParallaxMediaProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  speed = 12,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const img = imgRef.current;
    if (!wrapper || !img) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        {
          yPercent: -speed,
          scale: 1.15,
        },
        {
          yPercent: speed,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, wrapper);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={wrapperRef} className={`relative overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover will-change-transform ${imgClassName}`}
      />
    </div>
  );
};

/**
 * 9. ParallaxWatermark (Titres & Filigranes Monumentaux Inter-Sections)
 * - Filigranes géants éditoriaux ultra-discrets (opacity: 0.02 - 0.04)
 * - Glissent avec un scrub parallax fluide entre les sections
 */
interface ParallaxWatermarkProps {
  text: string;
  speed?: number;
  className?: string;
  align?: 'left' | 'right' | 'center';
}

export const ParallaxWatermark: React.FC<ParallaxWatermarkProps> = ({
  text,
  speed = 0.35,
  className = '',
  align = 'right',
}) => {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -70 * speed, opacity: 0.015 },
        {
          y: 70 * speed,
          opacity: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div
      ref={textRef}
      aria-hidden="true"
      className={`absolute pointer-events-none select-none z-0 overflow-hidden whitespace-nowrap font-syne font-black text-[13vw] sm:text-[15vw] tracking-tighter uppercase text-white/5 leading-none will-change-transform ${
        align === 'right'
          ? 'right-0 text-right'
          : align === 'left'
          ? 'left-0 text-left'
          : 'left-1/2 -translate-x-1/2 text-center'
      } ${className}`}
    >
      {text}
    </div>
  );
};

/**
 * 10. InterSectionTransition (Diviseur Cinétique & Coordonnées Éditoriales)
 * - Ligne fine de liaison avec micro-coordonnées architecturales et lueur mouvante
 */
export const InterSectionTransition: React.FC<{
  label?: string;
  coords?: string;
}> = ({ label = 'CONSTRUCTION MÉTALLIQUE', coords = 'BABENGA — CAMEROUN' }) => {
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 92%',
            once: true,
          },
        }
      );
    }, line);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full py-4 overflow-hidden pointer-events-none select-none z-10">
      <div
        ref={lineRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[9px] sm:text-[10px] font-space tracking-[0.25em] uppercase text-[#9CA3AF]/40 origin-left"
      >
        <div className="flex items-center space-x-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C82333]/80 animate-pulse" />
          <span>{label}</span>
        </div>
        <div className="h-[1px] flex-1 mx-6 bg-gradient-to-r from-white/10 via-[#C82333]/30 to-transparent" />
        <span>{coords}</span>
      </div>
    </div>
  );
};
