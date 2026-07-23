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
      setTimeout(() => setStep(1), 1200),      // Step 1: HI morphs to THIS (T & S added)
      setTimeout(() => setStep(2), 2400),      // Step 2: THIS morphs to IS (T & H removed)
      setTimeout(() => setStep(3), 3800),      // Step 3: HI THIS IS slides to the top AND ROHITH is written
      setTimeout(() => setIsDone(true), 5800),  // Step 4: Complete loader and exit
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Smooth continuous progress bar animation
  useEffect(() => {
    const duration = 5600;
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
      }, 700);
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
            scale: 1.02,
            filter: 'blur(20px)',
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 bg-[#050507] z-[9999] flex flex-col justify-between p-8 lg:p-12 select-none overflow-hidden"
        >
          {/* Custom cinematic portrait background */}
          <motion.div
            initial={{ scale: 1.12, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.58 }}
            transition={{ duration: 4.5, ease: 'easeOut' }}
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${getAssetUrl('/photos/loader_portrait.png')})`,
            }}
          />

          {/* Vignette Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/90 via-[#050507]/55 to-[#050507]/90 z-10" />

          {/* Drifting Cinematic Smoke / Fog Effect */}
          <div className="absolute inset-0 z-[12] overflow-hidden pointer-events-none opacity-40 mix-blend-screen">
            <motion.div
              animate={{
                x: [-150, 150, -150],
                y: [-80, 80, -80],
                scale: [1, 1.25, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-[60%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_60%)] filter blur-3xl"
            />
            <motion.div
              animate={{
                x: [150, -150, 150],
                y: [80, -80, 80],
                scale: [1.2, 0.95, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-[60%] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.04)_0%,transparent_50%)] filter blur-3xl"
            />
            <motion.div
              animate={{
                x: [-100, 100, -100],
                y: [120, -120, 120],
                scale: [0.95, 1.15, 0.95],
                rotate: [45, 225, 405],
              }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-[60%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_55%)] filter blur-2xl"
            />
          </div>

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
          <div className="relative flex flex-col items-center justify-center my-auto w-full h-[50vh] z-30">
            
            {/* Steps 0, 1, 2: Morphing Text in Center */}
            <AnimatePresence mode="wait">
              {step < 3 && (
                <motion.div
                  key={`center-step-${step}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="absolute z-20 flex items-center justify-center font-space text-4xl lg:text-6xl font-light tracking-[0.15em] text-white"
                >
                  {step === 0 && (
                    <div className="flex items-center">
                      <span>H</span>
                      <span>I</span>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="flex items-center">
                      {/* T is added on left */}
                      <motion.span
                        initial={{ x: -12, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      >
                        T
                      </motion.span>
                      {/* HI in center */}
                      <span>H</span>
                      <span>I</span>
                      {/* S is added on right */}
                      <motion.span
                        initial={{ x: 12, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      >
                        S
                      </motion.span>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="flex items-center text-cyan-400">
                      {/* T & H are removed */}
                      <motion.span
                        initial={{ width: 'auto', opacity: 1 }}
                        animate={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                        className="overflow-hidden inline-block text-white/50"
                      >
                        TH
                      </motion.span>
                      {/* I & S are seen */}
                      <span>I</span>
                      <span>S</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: HI THIS IS slides to top */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  initial={{ y: 50, opacity: 0, scale: 1.1 }}
                  animate={{
                    y: "-18vh",
                    opacity: 0.8,
                    scale: 0.72
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute z-20 font-space text-3xl lg:text-5xl font-light tracking-[0.2em] text-white"
                >
                  HI THIS IS
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: ROHITH (RO + HI + TH) is written in center */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                  className="absolute z-20 flex flex-col items-center justify-center text-center mt-[10vh]"
                  key="rohith-reveal"
                >
                  <div className="flex items-center justify-center text-5xl lg:text-8xl font-space font-black tracking-[0.05em] text-white uppercase drop-shadow-[0_0_40px_rgba(255,255,255,0.45)]">
                    {/* RO */}
                    <motion.span
                      initial={{ x: -35, opacity: 0, width: 0 }}
                      animate={{ x: 0, opacity: 1, width: 'auto' }}
                      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                      className="overflow-hidden inline-block"
                    >
                      RO
                    </motion.span>

                    {/* HI */}
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
                      className="inline-block"
                    >
                      HI
                    </motion.span>

                    {/* TH */}
                    <motion.span
                      initial={{ x: 35, opacity: 0, width: 0 }}
                      animate={{ x: 0, opacity: 1, width: 'auto' }}
                      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                      className="overflow-hidden inline-block"
                    >
                      TH
                    </motion.span>
                  </div>

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 1.0 }}
                    className="font-timecode text-xs tracking-[0.5em] text-cyan-400 mt-6 uppercase"
                  >
                    DIRECTORIAL & POST-PRODUCTION CUTS
                  </motion.p>
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
