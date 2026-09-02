import { useRef, useState, Suspense } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { LaptopModel } from './LaptopModel';

interface HeroSectionProps {
  isLoaded: boolean;
}

export function HeroSection({ isLoaded }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  return (
    <section ref={sectionRef} className="relative bg-[#08080A]" style={{ height: '250vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Header Content */}
        <motion.div 
          style={{ opacity: headerOpacity, y: headerY }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center gap-6 pointer-events-none"
        >
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={isLoaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-[#8A8F9E] font-mono pointer-events-auto"
          >
            <span className="w-2 h-2 rounded-full bg-[#00FFA3] animate-pulse" />
            CREATIVE STUDIO & 3D WEB
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }}
            animate={isLoaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,8vw,7rem)] font-display font-extrabold leading-[0.95] tracking-[-0.03em] bg-clip-text text-transparent bg-gradient-to-r from-[#00FFA3] via-[#00B8FF] to-[#7000FF]"
          >
            DIGITAL<br />REALITIES.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
            animate={isLoaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-[#8A8F9E] text-base md:text-lg leading-relaxed pointer-events-auto"
          >
            Scroll down to manipulate the 3D laptop and explore our work.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8A8F9E] text-xs font-mono tracking-widest z-10"
        >
          <span>SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-white/50" />
          </motion.div>
        </motion.div>

        {/* Canvas */}
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 1, 5], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            style={{ background: 'transparent' }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 8, 5]} intensity={0.8} color="#ffffff" />
              <directionalLight position={[-3, 5, -5]} intensity={0.3} color="#00B8FF" />
              <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.5} penumbra={1} color="#00B8FF" />
              <Environment preset="city" />
              <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
                <LaptopModel progress={progress} />
              </Float>
            </Suspense>
          </Canvas>
        </div>

        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#00B8FF]/10 blur-[120px] pointer-events-none" />
      </div>
    </section>
  );
}

export default HeroSection;
