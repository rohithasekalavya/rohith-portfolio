import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [countDown, setCountDown] = useState(3);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 2200;
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentProgress = Math.min(Math.round((step / steps) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress > 66) setCountDown(1);
      else if (currentProgress > 33) setCountDown(2);
      else setCountDown(3);

      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 200);
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
            scale: 1.05,
            filter: 'blur(12px)',
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 bg-[#050507] z-[9999] flex flex-col justify-between p-8 lg:p-12 select-none overflow-hidden"
        >
          {/* Background scanlines and noise */}
          <div className="film-grain" />
          <div className="scanlines" />

          {/* Header Metadata */}
          <div className="flex justify-between items-center w-full font-timecode text-xs text-white/40">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>REC 4K DCI 60FPS</span>
            </div>
            <div>PRORES 422 HQ</div>
            <div>TC 00:00:00:00</div>
          </div>

          {/* Film Leader Countdown & Reticle */}
          <div className="relative flex flex-col items-center justify-center my-auto">
            {/* Countdown Film Ring */}
            <div className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-full border border-white/20 flex items-center justify-center">
              {/* Rotating Reticle Crosshairs */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-full h-[1px] bg-white/20 absolute" />
                <div className="h-full w-[1px] bg-white/20 absolute" />
                <div className="w-3/4 h-3/4 rounded-full border border-dashed border-cyan-400/40" />
              </motion.div>

              {/* Film Leader Big Number */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={countDown}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-timecode text-7xl lg:text-9xl font-black text-white z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                >
                  {countDown}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Subtitle / Name */}
            <div className="mt-8 text-center">
              <h1 className="text-2xl lg:text-4xl font-black tracking-widest text-metallic uppercase">
                ROHITH AREM
              </h1>
              <p className="font-timecode text-xs tracking-[0.4em] text-cyan-400 mt-2 uppercase">
                DIRECTORIAL & POST-PRODUCTION CUTS
              </p>
            </div>
          </div>

          {/* Progress Bar Footer */}
          <div className="w-full">
            <div className="flex justify-between items-end font-timecode text-xs mb-2">
              <span className="text-white/40">INITIALIZING NLE CORE...</span>
              <span className="text-cyan-400 font-bold">{progress.toString().padStart(3, '0')}%</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
