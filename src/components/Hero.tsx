import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, Play, FileText } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export const Hero: React.FC = () => {
  const titles = [
    'VIDEO EDITOR',
    'AI CREATIVE DIRECTOR',
    'CINEMATOGRAPHER',
    'VISUAL STORYTELLER',
    'POST-PRODUCTION SPECIALIST'
  ];

  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // 3D Parallax Mouse Movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax layers transform mapping
  const bgX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);
  
  const textX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const textY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleScrollToProjects = () => {
    const elem = document.getElementById('video-work');
    if (elem) {
      const offset = 80;
      window.scrollTo({
        top: elem.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollToContact = () => {
    const elem = document.getElementById('contact');
    if (elem) {
      window.scrollTo({
        top: elem.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full flex flex-col justify-between bg-[#050507] overflow-hidden p-8 lg:p-12 select-none"
    >
      {/* SVG Silhouette Mask for 3D Text Occlusion (shared with Loader) */}
      <svg className="absolute w-0 h-0">
        <defs>
          <mask id="hero-person-silhouette" maskContentUnits="objectBoundingBox">
            <rect width="1" height="1" fill="white" />
            <polygon points="0.30,1.0 0.38,0.58 0.44,0.36 0.44,0.11 0.56,0.11 0.56,0.36 0.62,0.58 0.70,1.0" fill="black" />
          </mask>
        </defs>
      </svg>

      {/* Fullscreen Interactive Background (matching Loader final state) */}
      <motion.div
        style={{
          x: bgX,
          y: bgY,
          scale: 1.05,
          backgroundImage: `url(${getAssetUrl('/photos/loader_portrait.png')})`,
        }}
        className="absolute inset-0 z-0 bg-cover bg-center"
      />

      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/90 via-[#050507]/40 to-[#050507]/90 z-10 pointer-events-none" />

      {/* Drifting Cinematic Spotlight Smoke */}
      <div className="absolute inset-0 z-[12] overflow-hidden pointer-events-none opacity-50 mix-blend-screen">
        <motion.div
          animate={{
            x: [-150, 150, -150],
            y: [-90, 90, -90],
            scale: [1, 1.25, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-[50%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_60%)] filter blur-3xl"
        />
        <motion.div
          animate={{
            x: [150, -150, 150],
            y: [90, -90, 90],
            scale: [1.25, 0.95, 1.25],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-[50%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_55%)] filter blur-3xl"
        />
      </div>

      {/* Volumetric Spotlights and Dust Overlay */}
      <div className="absolute inset-0 z-[13] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[50%] h-[150%] bg-gradient-to-br from-white/10 to-transparent origin-top-left -rotate-12 blur-2xl opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 animate-pulse-glow" />
      </div>

      {/* Film grain / scanlines */}
      <div className="film-grain z-20 pointer-events-none" />
      <div className="scanlines z-20 pointer-events-none" />

      {/* Top Sentence Spacer (Fades in) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full flex justify-center pt-20 z-20 relative font-cinzel text-sm lg:text-lg tracking-[0.25em] text-white/80"
      >
        HI THIS IS
      </motion.div>

      {/* Center 3D Silhouette Occluded Title */}
      <div className="relative flex flex-col items-center justify-center my-auto w-full h-[50vh] z-30">
        <motion.div
          style={{ x: textX, y: textY }}
          className="relative w-full flex flex-col items-center justify-center"
        >
          {/* Masked Background Title (passes behind portrait) */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, filter: 'blur(6px)' }}
            animate={{ scale: 0.88, opacity: 0.42, filter: 'blur(6px)' }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="absolute z-10 flex items-center justify-center text-6xl lg:text-[8rem] font-cinzel font-normal tracking-[0.15em] text-gold-metallic select-none pointer-events-none"
            style={{ mask: 'url(#hero-person-silhouette)', WebkitMask: 'url(#hero-person-silhouette)' }}
          >
            <span>RO</span>
            <span>HI</span>
            <span>TH</span>
          </motion.div>

          {/* Floating Credits Line */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            className="absolute mt-[22vh] text-center"
          >
            <p className="font-timecode text-xs tracking-[0.5em] text-cyan-400 uppercase">
              DIRECTORIAL & POST-PRODUCTION CUTS
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Interactive HUD HUD Elements (Fades in on edges) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end z-30 relative mt-auto">
        
        {/* Left Side HUD: Roles & Ticker */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.6 }}
          className="lg:col-span-4 flex flex-col gap-3 items-start justify-end"
        >
          <div className="h-10 overflow-hidden flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={titleIndex}
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -25, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-space text-sm lg:text-lg font-bold tracking-[0.15em] text-cyan-400"
              >
                {titles[titleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="font-satoshi text-xs lg:text-sm text-neutral-400 font-light leading-relaxed max-w-sm">
            I engineer premium cinematic narrative cuts, custom post-production grading, and AI-enabled commercial visual campaigns.
          </p>
        </motion.div>

        {/* Center Side HUD: Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.8 }}
          className="lg:col-span-5 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={handleScrollToProjects}
            className="group flex items-center gap-3 bg-white hover:bg-neutral-200 text-black px-6 py-3.5 rounded-full font-satoshi font-bold text-[11px] tracking-widest uppercase transition-all duration-300 shadow-lg shadow-white/5"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>Play Showreel</span>
          </button>
          <a
            href="updated_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/10 hover:border-white hover:bg-white/5 text-white px-6 py-3.5 rounded-full font-satoshi font-bold text-[11px] tracking-widest uppercase transition-all duration-300"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
          <button
            onClick={handleScrollToContact}
            className="font-satoshi text-[11px] font-bold text-neutral-400 hover:text-white tracking-widest uppercase underline underline-offset-4 px-4 py-2 transition-colors"
          >
            Hire Director
          </button>
        </motion.div>

        {/* Right Side HUD: Location & Socials */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.7 }}
          className="lg:col-span-3 flex flex-col gap-4 items-start lg:items-end justify-end text-left lg:text-right"
        >
          <div className="flex flex-col gap-1 items-start lg:items-end">
            <span className="font-space text-[10px] tracking-widest text-neutral-500 uppercase">
              Location
            </span>
            <span className="font-satoshi text-xs font-semibold text-white">
              Hyderabad / Chennai, India
            </span>
          </div>

          {/* Socials bar */}
          <div className="flex gap-4">
            <a 
              href="https://www.instagram.com/rohith_as_ekalavya?igsh=MXRzYXlscmFlN295dg%3D%3D&utm_source=qr" 
              target="_blank" 
              rel="noreferrer" 
              className="text-neutral-500 hover:text-white transition-colors duration-300"
            >
              <span className="font-space text-[10px] tracking-wider uppercase">IG</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/arem-rohith-505ba4292?utm_source=share_via&utm_content=profile&utm_medium=member_ios" 
              target="_blank" 
              rel="noreferrer" 
              className="text-neutral-500 hover:text-white transition-colors duration-300"
            >
              <span className="font-space text-[10px] tracking-wider uppercase">LN</span>
            </a>
            <a 
              href="mailto:rohithasekalavya@gmail.com" 
              className="text-neutral-500 hover:text-white transition-colors duration-300"
            >
              <span className="font-space text-[10px] tracking-wider uppercase">Mail</span>
            </a>
          </div>
        </motion.div>

      </div>

      {/* Scroll Down Indicator */}
      <div 
        onClick={handleScrollToProjects}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer opacity-30 hover:opacity-100 transition-opacity duration-300 hidden lg:flex z-30"
      >
        <span className="font-space text-[9px] tracking-[0.2em] text-white uppercase">
          EXPLORE CUTS
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-white" />
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;
