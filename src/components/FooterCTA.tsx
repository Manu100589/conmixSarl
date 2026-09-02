import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function MagnetButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  const handleClick = () => {
    import('canvas-confetti').then((confetti) => {
      confetti.default({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00FFA3', '#00B8FF', '#7000FF'],
      });
    });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="group relative mt-12 px-10 py-5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm hover:border-white/30 transition-colors duration-300 cursor-pointer"
    >
      <span className="relative z-10 text-lg font-semibold text-[#EDEDF0] tracking-wide flex items-center gap-3">
        Start a Project
        <svg
          className="w-5 h-5 group-hover:translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,184,255,0.15) 0%, transparent 70%)',
        }}
      />
    </motion.button>
  );
}

export default function FooterCTA() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          timeZone: 'UTC',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative flex flex-col items-center pt-32 min-h-screen bg-[#08080A] border-t border-white/5 overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#7000FF]/8 blur-[150px] pointer-events-none" />

      {/* Main CTA */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 mb-32 flex-1 justify-center">
        <h2 className="text-[clamp(2rem,7vw,5.5rem)] font-display font-extrabold leading-[1.05] tracking-tight text-center gradient-text">
          LET'S BUILD<br />
          THE FUTURE.
        </h2>

        <MagnetButton />
      </div>

      {/* Footer Bar */}
      <div className="w-full mt-auto">
        <p className="text-center text-xs text-[#555766] italic mb-6">Built with precision & passion</p>
        <div className="w-full px-8 py-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-[#555766]">© 2025 KINETIK</div>

          <div className="flex items-center gap-4 text-xs text-[#8A8F9E]">
            <a href="#" className="hover:text-white transition-colors">
              Twitter
            </a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">
              GitHub
            </a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">
              Dribbble
            </a>
          </div>

          <div className="font-mono text-xs text-[#555766]">{time}</div>
        </div>
      </div>
    </footer>
  );
}
