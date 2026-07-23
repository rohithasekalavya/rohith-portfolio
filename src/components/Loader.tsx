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

  // 12-second cinematic shot timeline
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 2500),      // Step 1: SHOT 2 (2.5s - 4.0s) -> "HI" appears
      setTimeout(() => setStep(2), 4000),      // Step 2: SHOT 3 (4.0s - 5.0s) -> "HI" morphs to "THIS"
      setTimeout(() => setStep(3), 5000),      // Step 3: SHOT 4 (5.0s - 6.5s) -> "THIS" morphs to "HI THIS IS" (slides to top)
      setTimeout(() => setStep(4), 6500),      // Step 4: SHOT 5 & 6 (6.5s - 10.5s) -> "ROHITH" reveals in foreground
      setTimeout(() => setStep(5), 10500),     // Step 5: SHOT 7 (10.5s - 12.5s) -> "ROHITH" travels backward behind subject
      setTimeout(() => setIsDone(true), 12500), // Step 6: Complete loader and reveal main site
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Smooth continuous progress bar animation matching the 12s timeline
  useEffect(() => {
    const duration = 12000;
    const intervalTime = 30;
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
      }, 900); // Widescreen exit transition
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
            scale: 1.01,
            filter: 'blur(10px)',
            transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 bg-[#050507] z-[9999] flex flex-col justify-between p-8 lg:p-12 select-none overflow-hidden"
        >
          {/* SVG Silhouette Mask for 3D Text Occlusion */}
          <svg className="absolute w-0 h-0">
            <defs>
              <mask id="person-silhouette" maskContentUnits="objectBoundingBox">
                {/* Everything white remains visible */}
                <rect width="1" height="1" fill="white" />
                {/* The black silhouette polygon hides the text behind the person */}
                <polygon points="0.30,1.0 0.38,0.58 0.44,0.36 0.44,0.11 0.56,0.11 0.56,0.36 0.62,0.58 0.70,1.0" fill="black" />
              </mask>
            </defs>
          </svg>

          {/* SHOT 1-7: Custom cinematic portrait background (slow zoom out from 1.35 to 1.05) */}
          <motion.div
            initial={{ scale: 1.35, opacity: 0 }}
            animate={{ scale: step >= 5 ? 1.05 : 1.08, opacity: 0.82 }}
            transition={{ duration: 12, ease: 'easeOut' }}
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${getAssetUrl('/photos/loader_portrait.png')})`,
            }}
          />

          {/* Vignette Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/90 via-[#050507]/40 to-[#050507]/90 z-10" />

          {/* Thicker Drifting Cinematic Spotlight Smoke */}
          <div className="absolute inset-0 z-[12] overflow-hidden pointer-events-none opacity-70 mix-blend-screen">
            <motion.div
              animate={{
                x: [-180, 180, -180],
                y: [-90, 90, -90],
                scale: [1, 1.25, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-[50%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_60%)] filter blur-3xl"
            />
            <motion.div
              animate={{
                x: [180, -180, 180],
                y: [90, -90, 90],
                scale: [1.25, 0.95, 1.25],
                rotate: [360, 180, 0],
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-[50%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_55%)] filter blur-3xl"
            />
          </div>

          {/* Spotlight volumetric light beams & dust particles */}
          <div className="absolute inset-0 z-[13] overflow-hidden pointer-events-none">
            {/* Volumetric beam from upper-left */}
            <div className="absolute top-0 left-0 w-[50%] h-[150%] bg-gradient-to-br from-white/10 to-transparent origin-top-left -rotate-12 blur-2xl opacity-60" />
            
            {/* Floating dust particles */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 animate-pulse-glow" />
          </div>

          {/* Background scanlines and noise */}
          <div className="film-grain z-20" />
          <div className="scanlines z-20" />

          {/* Header Metadata */}
          <div className="flex justify-between items-center w-full font-timecode text-xs text-white/40 z-30 relative">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>REC 4K DCI 24FPS</span>
            </div>
            <div>PRORES 422 HQ</div>
            <div>TC 00:00:00:00</div>
          </div>

          {/* Center Stage Animation */}
          <div className="relative flex flex-col items-center justify-center my-auto w-full h-[60vh] z-30">
            
            {/* SHOT 2: "HI" appears with horizontal light streak */}
            <AnimatePresence>
              {step === 1 && (
                <div className="absolute flex items-center justify-center">
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "240px", opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-[1px] bg-white absolute z-30 blur-[1px]"
                  />
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(5px)' }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="font-cinzel text-5xl lg:text-7xl font-light tracking-[0.2em] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  >
                    HI
                  </motion.span>
                </div>
              )}
            </AnimatePresence>

            {/* SHOT 3: "HI" morphs to "THIS" */}
            <AnimatePresence>
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.1, filter: 'blur(5px)' }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute font-cinzel text-5xl lg:text-7xl font-light tracking-[0.25em] text-white"
                >
                  THIS
                </motion.div>
              )}
            </AnimatePresence>

            {/* SHOT 4: "THIS" morphs to "HI THIS IS" and moves up */}
            <AnimatePresence>
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 1.1 }}
                  animate={{
                    y: "-18vh",
                    opacity: 0.8,
                    scale: 0.72
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute z-20 font-cinzel text-3xl lg:text-5xl font-light tracking-[0.25em] text-white"
                >
                  HI THIS IS
                </motion.div>
              )}
            </AnimatePresence>

            {/* SHOT 5 & 6: "ROHITH" in foreground (overlapping subject) */}
            <AnimatePresence>
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 1.25, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, scale: 1.0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.82, filter: 'blur(8px)' }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute z-20 flex flex-col items-center justify-center text-center mt-[10vh]"
                >
                  <div className="flex items-center justify-center text-6xl lg:text-[7.5rem] font-cinzel font-normal tracking-[0.15em] text-gold-metallic select-none">
                    <span>RO</span>
                    <span>HI</span>
                    <span>TH</span>
                  </div>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.8 }}
                    className="font-timecode text-xs tracking-[0.5em] text-cyan-400 mt-6 uppercase"
                  >
                    DIRECTORIAL & POST-PRODUCTION CUTS
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SHOT 7: "ROHITH" travels backward along Z-axis behind the masked silhouette */}
            <AnimatePresence>
              {step >= 5 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* Background masked text (behind subject) */}
                  <motion.div
                    initial={{ scale: 0.98, opacity: 0, filter: 'blur(2px)' }}
                    animate={{ 
                      scale: 0.88, 
                      opacity: 0.42, 
                      filter: 'blur(6px)',
                    }}
                    transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute z-10 flex flex-col items-center justify-center text-center mt-[4vh] select-none pointer-events-none"
                    style={{ mask: 'url(#person-silhouette)', WebkitMask: 'url(#person-silhouette)' }}
                  >
                    <div className="flex items-center justify-center text-6xl lg:text-[8rem] font-cinzel font-normal tracking-[0.15em] text-gold-metallic">
                      <span>RO</span>
                      <span>HI</span>
                      <span>TH</span>
                    </div>
                  </motion.div>

                  {/* Widescreen floating subtitle */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="absolute z-20 mt-[26vh] text-center"
                  >
                    <p className="font-timecode text-xs tracking-[0.5em] text-cyan-400 uppercase">
                      DIRECTORIAL & POST-PRODUCTION CUTS
                    </p>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Sticky sentence "HI THIS IS" at the top in final shots */}
            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute top-[2%] z-20 font-cinzel text-xl lg:text-3xl font-light tracking-[0.25em] text-white"
              >
                HI THIS IS
              </motion.div>
            )}
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
