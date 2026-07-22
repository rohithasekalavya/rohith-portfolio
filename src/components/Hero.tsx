import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, Pause, Film, Sparkles, Award, Eye, Flame, ArrowDownRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrubProgress, setScrubProgress] = useState(0.25);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mouse tilt & lighting spotlight tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const cardRotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const cardRotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const spotlightX = useTransform(smoothX, [-0.5, 0.5], ['20%', '80%']);
  const spotlightY = useTransform(smoothY, [-0.5, 0.5], ['20%', '80%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setScrubProgress(videoRef.current.currentTime / videoRef.current.duration);
    }
  };

  const handleScrubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setScrubProgress(val);
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = val * videoRef.current.duration;
    }
  };

  const scrollToWorks = () => {
    const elem = document.getElementById('video-work');
    if (elem) {
      const offset = 100;
      window.scrollTo({
        top: elem.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full flex flex-col justify-between bg-[#050507] overflow-hidden px-4 lg:px-12 pt-28 pb-12"
    >
      {/* Dynamic Mouse Spotlight & Anamorphic Flare */}
      <motion.div 
        style={{
          left: spotlightX,
          top: spotlightY,
        }}
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full lens-flare-light pointer-events-none blur-[120px] opacity-70 z-0"
      />
      <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none opacity-50" />

      {/* Top Banner Tag */}
      <div className="relative z-10 flex flex-wrap justify-between items-center w-full max-w-7xl mx-auto mb-8 font-timecode text-xs text-white/50 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold">
            DIRECTOR'S CUT
          </span>
          <span>EST. 2024–2026</span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-[11px]">
          <span>FORMAT: 4K DCI ANAMORPHIC</span>
          <span>FPS: 60.00</span>
          <span>COLOR: DAVINCI WIDE GAMUT</span>
        </div>
      </div>

      {/* Hero Core Layout */}
      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        
        {/* Left Column - High Impact Editorial Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-timecode text-xs tracking-[0.3em] text-cyan-400 uppercase font-bold">
              AWARD-WINNING CINEMATIC EDITOR & AI CREATIVE
            </span>
          </motion.div>

          <h1 className="font-mono font-black text-5xl sm:text-7xl lg:text-8xl tracking-tighter uppercase leading-[0.95] text-white mb-6">
            <motion.span 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="block text-metallic"
            >
              ROHITH
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-zinc-400"
            >
              AREM<span className="text-cyan-400">.</span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl mb-8"
          >
            Crafting high-octane commercial edits, narrative short films, and AI-synthesized video campaigns with precision color science, speed ramps, and theatrical sound design.
          </motion.p>

          {/* Action Callouts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <button
              onClick={scrollToWorks}
              data-cursor="play"
              className="group relative px-8 py-4 rounded-full bg-white text-black font-timecode font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] flex items-center gap-2"
            >
              <span>WATCH SHOWREEL</span>
              <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </button>

            <button
              onClick={togglePlay}
              data-cursor="pointer"
              className="px-6 py-4 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/50 text-white font-timecode font-bold text-xs tracking-widest uppercase transition-all flex items-center gap-2"
            >
              {isPlaying ? <Pause className="w-4 h-4 text-cyan-400" /> : <Play className="w-4 h-4 text-cyan-400" />}
              <span>{isPlaying ? 'PAUSE PREVIEW' : 'PREVIEW CLIP'}</span>
            </button>
          </motion.div>

          {/* Stats Ribbon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg font-timecode"
          >
            <div>
              <div className="text-2xl lg:text-3xl font-black text-white flex items-center gap-1">
                <span>20M+</span>
                <Flame className="w-4 h-4 text-red-500" />
              </div>
              <div className="text-[10px] text-white/50 tracking-wider uppercase">REEL VIEWS</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-black text-cyan-400 flex items-center gap-1">
                <span>15+</span>
                <Film className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-[10px] text-white/50 tracking-wider uppercase">BRAND CAMPAIGNS</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-black text-yellow-400 flex items-center gap-1">
                <span>WINNER</span>
                <Award className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="text-[10px] text-white/50 tracking-wider uppercase">SAMGATHA 2025</div>
            </div>
          </motion.div>

        </div>

        {/* Right Column - 3D Tilt Video Card & NLE Scrubber */}
        <div className="lg:col-span-5 relative w-full flex justify-center">
          <motion.div
            style={{
              rotateX: cardRotateX,
              rotateY: cardRotateY,
              transformStyle: 'preserve-3d',
            }}
            className="relative w-full aspect-[9/16] sm:aspect-[4/5] lg:aspect-[4/5] max-w-md rounded-2xl overflow-hidden glass-panel border border-white/15 shadow-[0_30px_100px_rgba(0,0,0,0.9)] group"
          >
            {/* Live Video Preview element */}
            <video
              ref={videoRef}
              src="/videos/reels/Fast beat.mov"
              poster="/photos/paradise_poster.png"
              loop
              muted
              playsInline
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Video Overlay Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 flex flex-col justify-between pointer-events-none">
              
              <div className="flex justify-between items-center font-timecode text-xs">
                <span className="px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-white font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  TIMELINE PREVIEW
                </span>
                <span className="px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-cyan-400 font-bold">
                  TC 01:04:12:08
                </span>
              </div>

              <div>
                <span className="font-timecode text-[10px] text-cyan-400 tracking-widest uppercase block mb-1">
                  HIGHLIGHT CUT: FAST BEAT COMMERCIAL REEL
                </span>
                <h3 className="font-mono text-xl font-black text-white tracking-tight">
                  HIGH-OCTANE COMMERCIAL REEL
                </h3>
                <p className="text-xs text-white/60 mt-1 font-sans line-clamp-2">
                  Edited for fast pacing, rhythmic cuts, kinetic typography and high visual retention.
                </p>
              </div>

            </div>

            {/* Interactive Playhead Slider Overlay */}
            <div className="absolute bottom-3 left-4 right-4 z-20 glass-dock p-2 rounded-xl border border-white/10 flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-lg bg-cyan-400 text-black flex items-center justify-center font-bold hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.001"
                value={scrubProgress}
                onChange={handleScrubChange}
                className="w-full accent-cyan-400 h-1 bg-white/20 rounded cursor-pointer"
              />
            </div>
          </motion.div>
        </div>

      </div>

      {/* Bottom Timeline Marquee */}
      <div className="relative z-10 w-full max-w-7xl mx-auto mt-8 pt-4 border-t border-white/10 flex flex-wrap justify-between items-center font-timecode text-[11px] text-white/40">
        <div className="flex items-center gap-4">
          <span>DAVINCI RESOLVE STUDIO</span>
          <span>•</span>
          <span>ADOBE PREMIERE PRO</span>
          <span>•</span>
          <span>CAPCUT PRO</span>
          <span>•</span>
          <span className="text-cyan-400 font-bold">GOOGLE VEO / KLING AI</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-400">
          <Eye className="w-3.5 h-3.5" />
          <span>SCROLL TO BEGIN CINEMATIC JOURNEY</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
