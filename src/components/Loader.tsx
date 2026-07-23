import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 2400; // 2.4s loader
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentProgress = Math.min(Math.round((step / steps) * 100), 100);
      setProgress(currentProgress);

      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            onComplete();
          }, 800); // Wait for zoom-out exit animation
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            filter: 'blur(10px)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 bg-[#080808] z-[9999] flex flex-col justify-between p-8 lg:p-16 select-none"
        >
          {/* Subtle noise overlay specifically for loader */}
          <div className="noise-overlay opacity-[0.07]" />

          {/* Top Navbar Placeholder */}
          <div className="flex justify-between items-center w-full">
            <span className="font-space text-xs tracking-[0.2em] text-neutral-500 uppercase">
              CREATIVE PORTFOLIO
            </span>
            <span className="font-space text-xs tracking-[0.2em] text-neutral-500 uppercase">
              EST. 2026
            </span>
          </div>

          {/* Center Initials & Large Loading Text */}
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="overflow-hidden mb-4">
              <motion.h1 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-space text-6xl lg:fluid-hero-title font-bold tracking-tighter text-white"
              >
                RA.
              </motion.h1>
            </div>
            
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-satoshi text-xs lg:text-sm tracking-[0.4em] text-neutral-400 uppercase font-light"
              >
                ROHITH AREM
              </motion.p>
            </div>
          </div>

          {/* Bottom Progress Counter */}
          <div className="flex justify-between items-end w-full">
            <div className="flex flex-col gap-1 max-w-[200px]">
              <span className="font-satoshi text-[10px] tracking-[0.1em] text-neutral-600 uppercase">
                Focus Areas
              </span>
              <span className="font-satoshi text-xs text-neutral-400">
                AI / Video Editing / Design
              </span>
            </div>
            
            {/* Massive Digital Counter */}
            <div className="font-space text-7xl lg:text-[9rem] font-bold tracking-tighter text-white leading-none overflow-hidden select-none">
              <motion.div
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {progress.toString().padStart(3, '0')}%
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
