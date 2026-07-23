import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetUrl } from '../utils/assets';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Animation timeline steps
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1000),      // Step 1: Add 'THIS' -> "HI THIS"
      setTimeout(() => setStep(2), 2000),      // Step 2: Add 'IS' -> "HI THIS IS"
      setTimeout(() => setStep(3), 3200),      // Step 3: Slide "HI THIS IS" to the top
      setTimeout(() => setStep(4), 4200),      // Step 4: Show "ROHITH" in the center
      setTimeout(() => setIsDone(true), 6000),  // Step 5: Complete loader and start exit transition
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Smooth continuous progress bar animation
  useEffect(() => {
    const duration = 5800;
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const currentProgress = Math.min(Math.round((stepCount / steps) * 100), 100);
      setProgress(currentProgress);

      if (stepCount >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Exit trigger when loading is done
  useEffect(() => {
    if (isDone) {
      const timer = setTimeout(() => {
        onComplete();
      }, 700); // Match exit transition duration
      return () => clearTimeout(timer);
    }
  }, [isDone, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(15px)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 bg-[#050507] z-[9999] flex flex-col justify-between p-8 lg:p-12 select-none overflow-hidden"
        >
          {/* Custom cinematic portrait background */}
          <motion.div
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.55 }}
            transition={{ duration: 3.5, ease: 'easeOut' }}
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${getAssetUrl('/photos/loader_portrait.png')})`,
            }}
          />

          {/* Vignette Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/90 via-[#050507]/50 to-[#050507]/90 z-10" />

          {/* Background scanlines and noise */}
          <div className="film-grain z-20" />
          <div className="scanlines z-20" />

          {/* Header Metadata */}
          <div className="flex justify-between items-center w-full font-timecode text-xs text-white/40 z-30 relative">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>REC 4K DCI 60FPS</span>
            </div>
            <div>PRORES 422 HQ</div>
            <div>TC 00:00:00:00</div>
          </div>

          {/* Center Stage Animation */}
          <div className="relative flex flex-col items-center justify-center my-auto w-full z-30">
            
            {/* Phase 1-3 Greeting Text: "HI THIS IS" */}
            <motion.div
              animate={{
                y: step >= 3 ? "-18vh" : "0vh",
                scale: step >= 3 ? 0.75 : 1,
              }}
              transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
              className="absolute z-20 flex items-center justify-center font-mono text-3xl lg:text-5xl font-light tracking-[0.2em] text-white/95"
            >
              <span>HI</span>
              
              <AnimatePresence>
                {step >= 1 && (
                  <motion.span
                    initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                    animate={{ width: "auto", opacity: 1, marginLeft: "0.5em" }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="overflow-hidden inline-block"
                  >
                    THIS
                  </motion.span>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {step >= 2 && (
                  <motion.span
                    initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                    animate={{ width: "auto", opacity: 1, marginLeft: "0.5em" }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="overflow-hidden inline-block text-cyan-400"
                  >
                    IS
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Phase 4 Reveal: "ROHITH" */}
            <AnimatePresence>
              {step >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute z-20 flex flex-col items-center justify-center text-center"
                >
                  <h1 className="text-5xl lg:text-8xl font-black tracking-[0.25em] text-white uppercase drop-shadow-[0_0_40px_rgba(255,255,255,0.45)]">
                    ROHITH
                  </h1>
                  <p className="font-timecode text-xs tracking-[0.5em] text-cyan-400 mt-6 uppercase">
                    DIRECTORIAL & POST-PRODUCTION CUTS
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress Bar Footer */}
          <div className="w-full z-30 relative">
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
