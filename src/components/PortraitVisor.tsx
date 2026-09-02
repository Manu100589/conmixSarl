import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function HeroSequence() {
  const [frameIndex, setFrameIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position if user scrolls down
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Auto-play animation frame loop (~24 FPS) when idle
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame = (frame + 1) % 100;
      setFrameIndex(frame);
    }, 40); // ~25 FPS loop

    return () => clearInterval(interval);
  }, []);

  // Update frame on scroll if user is scrolling
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0) {
      const scrollFrame = Math.min(99, Math.max(0, Math.floor(latest * 100)));
      setFrameIndex(scrollFrame);
    }
  });

  const currentFrameUrl = `/vid/Man_typing_on_laptop_202608280426_${String(frameIndex).padStart(3, '0')}.jpg`;

  return (
    <div ref={containerRef} className="relative w-full max-w-[560px] lg:max-w-[620px] aspect-[4/3] lg:aspect-[16/11] flex items-center justify-center">
      {/* Glow Ambient Lighting Behind Video Frame */}
      <div className="absolute inset-0 bg-[#00B8FF]/15 rounded-[24px] blur-[60px] pointer-events-none" />
      <div className="absolute inset-4 bg-[#7000FF]/10 rounded-[24px] blur-[80px] pointer-events-none" />

      {/* Main Video Sequence Display Card */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full rounded-[24px] overflow-hidden border border-[#0A2239]/15 bg-[#0A2239] shadow-[0_25px_60px_rgba(10,34,57,0.25)] group"
      >
        {/* Frame Canvas / Image */}
        <img
          src={currentFrameUrl}
          alt="AI System in Action — Man typing on laptop"
          className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-[1.02] transition-opacity duration-75"
        />

        {/* Subtle Futuristic HUD / Screen Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2239]/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />

        {/* Live Status Badge on Frame */}
        <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-[11px] font-mono text-white/90">
          <span className="w-2 h-2 rounded-full bg-[#00FFA3] animate-pulse" />
          <span>REAL-TIME AI SYSTEM</span>
        </div>

        {/* Frame Counter Indicator */}
        <div className="absolute bottom-4 right-4 z-10 px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-md text-[10px] font-mono text-white/70">
          FRAME {String(frameIndex).padStart(3, '0')} / 100
        </div>
      </motion.div>
    </div>
  );
}
