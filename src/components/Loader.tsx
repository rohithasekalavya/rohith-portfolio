import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetUrl } from '../utils/assets';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [collapseTH, setCollapseTH] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Animation timeline steps
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1200),      // Step 1: Add 'THIS' -> "HI THIS"
      setTimeout(() => setStep(2), 2400),      // Step 2: Add word 3 as "THIS" (TH is dimmed)
      setTimeout(() => setStep(3), 4000),      // Step 3: Slide "HI THIS IS" to the top
      setTimeout(() => setStep(4), 5000),      // Step 4: Show "ROHITH" in the center (RO + HI + TH)
      setTimeout(() => setIsDone(true), 6800),  // Step 5: Complete loader and start exit transition
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Sub-step: Collapse 'TH' after word 3 is added to leave 'IS'
  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => {
        setCollapseTH(true);
      }, 600); // Wait 600ms for user to see the word "THIS" before collapsing "TH"
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Smooth continuous progress bar animation
  useEffect(() => {
    const duration = 6600;
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
                scale: step >= 3 ? 0.72 : 1,
              }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              className="absolute z-20 flex items-center justify-center font-mono text-3xl lg:text-5xl font-light tracking-[0.15em] text-white/95 gap-[0.4em]"
            >
              {/* Word 1: HI */}
              <motion.div layout className="flex items-center">
                <span>H</span>
                <span>I</span>
              </motion.div>

              {/* Word 2: THIS (Formed by adding T and S to HI) */}
              <AnimatePresence>
                {step >= 1 && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="flex items-center overflow-hidden"
                    key="word-this"
                  >
                    {/* T added to left */}
                    <motion.span
                      initial={{ x: -12, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                    >
                      T
                    </motion.span>
                    {/* HI in the middle */}
                    <span>H</span>
                    <span>I</span>
                    {/* S added to right */}
                    <motion.span
                      initial={{ x: 12, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                    >
                      S
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Word 3: IS (Formed by showing THIS and removing T & H) */}
              <AnimatePresence>
                {step >= 2 && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="flex items-center overflow-hidden text-cyan-400"
                    key="word-is"
                  >
                    {/* T and H are removed/collapsed */}
                    <motion.span
                      animate={{
                        width: collapseTH ? 0 : 'auto',
                        opacity: collapseTH ? 0 : 0.6,
                        marginRight: collapseTH ? 0 : '0.05em',
                      }}
                      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                      className="overflow-hidden inline-block text-white/50"
                    >
                      TH
                    </motion.span>
                    {/* I and S are left */}
                    <span>I</span>
                    <span>S</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Phase 4 Reveal: "ROHITH" (RO + HI + TH) */}
            <AnimatePresence>
              {step >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute z-20 flex flex-col items-center justify-center text-center"
                  key="rohith-reveal"
                >
                  <div className="flex items-center justify-center text-5xl lg:text-8xl font-black tracking-[0.05em] text-white uppercase drop-shadow-[0_0_40px_rgba(255,255,255,0.45)]">
                    {/* RO added to left */}
                    <motion.span
                      initial={{ x: -35, opacity: 0, width: 0 }}
                      animate={{ x: 0, opacity: 1, width: 'auto' }}
                      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                      className="overflow-hidden inline-block"
                    >
                      RO
                    </motion.span>

                    {/* HI in center */}
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="inline-block"
                    >
                      HI
                    </motion.span>

                    {/* TH added to right */}
                    <motion.span
                      initial={{ x: 35, opacity: 0, width: 0 }}
                      animate={{ x: 0, opacity: 1, width: 'auto' }}
                      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                      className="overflow-hidden inline-block"
                    >
                      TH
                    </motion.span>
                  </div>

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.8 }}
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
