import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const { progress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Smoothly animate the displayed progress number
  useEffect(() => {
    const target = Math.round(progress);
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [progress]);

  // When loading completes, wait a moment then dismiss
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 800); // Wait for exit animation
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#08080A]"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-sm font-mono tracking-[0.3em] text-[#8A8F9E] uppercase"
          >
            KINETIK
          </motion.div>

          {/* Giant Percentage Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-mono text-[clamp(5rem,15vw,12rem)] font-bold leading-none tracking-tighter text-[#EDEDF0] tabular-nums"
          >
            {displayProgress}%
          </motion.div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-xs font-mono tracking-[0.2em] text-[#555766] uppercase"
          >
            Loading experience
          </motion.p>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5">
            <motion.div
              className="h-full"
              style={{
                width: `${displayProgress}%`,
                background: 'linear-gradient(90deg, #00FFA3, #00B8FF, #7000FF)',
                boxShadow: '0 0 20px rgba(0, 184, 255, 0.5), 0 0 60px rgba(0, 184, 255, 0.2)',
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
