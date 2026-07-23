import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Sliders, Sparkles, CheckCircle2, Film } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

interface LUTPreset {
  id: string;
  name: string;
  className: string;
  description: string;
  specs: string;
}

export const ColorGradingStudio: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeLUT, setActiveLUT] = useState<string>('teal-orange');
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lift, Gamma, Gain Drag Coordinates (Framer Motion MotionValues)
  const liftX = useMotionValue(0);
  const liftY = useMotionValue(0);
  
  const gammaX = useMotionValue(0);
  const gammaY = useMotionValue(0);
  
  const gainX = useMotionValue(0);
  const gainY = useMotionValue(0);

  // Dynamic CSS filter strings mapped from the grading wheels
  const [activeFilters, setActiveFilters] = useState('');

  useEffect(() => {
    const updateFilters = () => {
      const lX = liftX.get();
      const lY = liftY.get();
      const gmX = gammaX.get();
      const gnX = gainX.get();

      // Lift maps to brightness/contrast
      const brightnessVal = 1 - lY / 120;
      const contrastVal = 1 + lX / 100;
      // Gamma maps to saturation
      const saturationVal = 1 + gmX / 40;
      // Gain maps to hue rotation
      const hueVal = Math.round(gnX * 1.5);

      setActiveFilters(
        `brightness(${brightnessVal}) contrast(${contrastVal}) saturate(${saturationVal}) hue-rotate(${hueVal}deg)`
      );
    };

    const unsubLiftX = liftX.on('change', updateFilters);
    const unsubLiftY = liftY.on('change', updateFilters);
    const unsubGammaX = gammaX.on('change', updateFilters);
    const unsubGainX = gainX.on('change', updateFilters);

    return () => {
      unsubLiftX();
      unsubLiftY();
      unsubGammaX();
      unsubGainX();
    };
  }, [liftX, liftY, gammaX, gainX]);

  const lutPresets: LUTPreset[] = [
    {
      id: 'teal-orange',
      name: 'TEAL & ORANGE DCI',
      className: 'lut-teal-orange',
      description: 'Blockbuster cinematic contrast with warm skin tones and deep cyan shadows.',
      specs: 'LOG -> Rec.709 | Contrast: +1.2 | Saturation: +1.3'
    },
    {
      id: 'noir',
      name: 'MONOCHROME NOIR',
      className: 'lut-noir',
      description: 'High-contrast black & white with deep blacks and crisp highlight rolloff.',
      specs: 'Grayscale | Contrast: +1.45 | Brightness: 0.95'
    },
    {
      id: 'gold',
      name: 'ANAMORPHIC GOLD',
      className: 'lut-gold',
      description: 'Warm golden hour specular highlights with vintage lens breathing character.',
      specs: 'Sepia 0.4 | Hue +5° | Saturation +1.2'
    },
    {
      id: 'cyberpunk',
      name: 'CYBERPUNK NEON',
      className: 'lut-cyberpunk',
      description: 'Electric neon tones with saturated magenta and cyan highlights.',
      specs: 'Hue +160° | Saturation +1.6 | Contrast +1.3'
    },
    {
      id: 'raw',
      name: 'RAW FLAT LOG',
      className: 'lut-raw',
      description: 'Unprocessed flat profile preserving maximum dynamic range for grading.',
      specs: 'DaVinci Wide Gamut / Intermediate Flat'
    }
  ];

  const currentPreset = lutPresets.find(p => p.id === activeLUT) || lutPresets[0];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const resetGradingWheels = () => {
    liftX.set(0);
    liftY.set(0);
    gammaX.set(0);
    gammaY.set(0);
    gainX.set(0);
    gainY.set(0);
  };

  return (
    <section 
      id="lut-studio" 
      className="relative w-full py-24 bg-[#08080c] border-t border-b border-white/5 px-6 overflow-hidden select-none"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-left">
          <div>
            <div className="flex items-center gap-2 font-timecode text-xs text-cyan-400 font-bold tracking-widest uppercase mb-2">
              <Sliders className="w-4 h-4" />
              <span>COLOR SCIENCE & LUT PRE-VISUALIZER</span>
            </div>
            <h2 className="font-cinzel text-4xl lg:text-5xl font-light tracking-tight text-white uppercase">
              Color Grading Suite
            </h2>
          </div>
          <p className="text-white/40 max-w-md font-satoshi text-sm leading-relaxed">
            Drag the slider to compare raw LOG footage against custom Rec.709 film profiles. Interact with the Resolve color wheels at the bottom to adjust shadows, midtones, and highlights.
          </p>
        </div>

        {/* LUT Selector Pills */}
        <div className="flex flex-wrap gap-2.5 font-timecode text-xs">
          {lutPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                setActiveLUT(preset.id);
                resetGradingWheels();
              }}
              className={`px-4.5 py-2.5 rounded-lg border transition-all flex items-center gap-2 ${
                activeLUT === preset.id
                  ? 'bg-cyan-500 text-black border-cyan-400 font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'bg-white/5 text-white/60 border-white/5 hover:border-white/20 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>{preset.name}</span>
            </button>
          ))}
        </div>

        {/* 1. COMPARE VIEWER CANVAS */}
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden glass-panel border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.85)] cursor-ew-resize"
        >
          {/* Background RAW LOG profile */}
          <div className="absolute inset-0 lut-raw">
            <img 
              src={getAssetUrl("/photos/paradise_poster.png")} 
              alt="RAW LOG Footage" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-[#050507]/80 backdrop-blur-md px-3.5 py-1.5 rounded border border-white/10 font-timecode text-[10px] text-white/80 tracking-widest uppercase">
              FLAT LOG RAW
            </div>
          </div>

          {/* Foreground GRADED LUT pass (clipped by slider Position) */}
          <div 
            className={`absolute inset-0 overflow-hidden ${currentPreset.className}`}
            style={{ 
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
            }}
          >
            <img 
              src={getAssetUrl("/photos/paradise_poster.png")} 
              alt="Graded Footage" 
              className="w-full h-full object-cover"
              style={{ filter: activeFilters }}
            />
            <div className="absolute top-4 left-4 bg-[#050507]/80 backdrop-blur-md px-3.5 py-1.5 rounded border border-cyan-400/30 font-timecode text-[10px] text-cyan-400 tracking-widest uppercase flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>GRADED PASS: {currentPreset.name}</span>
            </div>
          </div>

          {/* Widescreen Camera Viewfinder Reticle Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-[1.5px] bg-cyan-400 shadow-[0_0_12px_#06b6d4] z-30 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Viewfinder Target Circle */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-cyan-400 bg-[#050507]/90 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              {/* Reticle tick markers */}
              <div className="w-2 h-[1px] bg-cyan-400 absolute" />
              <div className="h-2 w-[1px] bg-cyan-400 absolute" />
            </div>
          </div>
        </div>

        {/* 2. RESOLVE GRADING WHEELS DIALS PANEL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-center py-6 px-4 bg-[#050507]/60 border border-white/5 rounded-2xl">
          
          {/* Wheel 1: LIFT (Shadows) */}
          <div className="flex flex-col items-center gap-4">
            <span className="font-space text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
              LIFT (SHADOWS)
            </span>
            <div className="relative w-36 h-36 rounded-full border border-white/10 flex items-center justify-center bg-black/40">
              {/* Coordinate axis lines */}
              <div className="w-[85%] h-[1px] bg-white/5 absolute" />
              <div className="h-[85%] w-[1px] bg-white/5 absolute" />
              
              {/* Drag dot */}
              <motion.div
                drag
                dragConstraints={{ left: -45, right: 45, top: -45, bottom: 45 }}
                dragElastic={0.1}
                style={{ x: liftX, y: liftY }}
                className="w-5.5 h-5.5 rounded-full bg-cyan-400 border border-white flex items-center justify-center cursor-pointer z-10 shadow-[0_0_10px_#06b6d4]"
              >
                <div className="w-1.5 h-1.5 bg-black rounded-full" />
              </motion.div>
            </div>
            <span className="font-timecode text-[9px] text-cyan-400/60 uppercase">Contrast & Blackpoint</span>
          </div>

          {/* Wheel 2: GAMMA (Midtones) */}
          <div className="flex flex-col items-center gap-4">
            <span className="font-space text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
              GAMMA (MIDTONES)
            </span>
            <div className="relative w-36 h-36 rounded-full border border-white/10 flex items-center justify-center bg-black/40">
              {/* Coordinate axis lines */}
              <div className="w-[85%] h-[1px] bg-white/5 absolute" />
              <div className="h-[85%] w-[1px] bg-white/5 absolute" />
              
              {/* Drag dot */}
              <motion.div
                drag
                dragConstraints={{ left: -45, right: 45, top: -45, bottom: 45 }}
                dragElastic={0.1}
                style={{ x: gammaX, y: gammaY }}
                className="w-5.5 h-5.5 rounded-full bg-cyan-400 border border-white flex items-center justify-center cursor-pointer z-10 shadow-[0_0_10px_#06b6d4]"
              >
                <div className="w-1.5 h-1.5 bg-black rounded-full" />
              </motion.div>
            </div>
            <span className="font-timecode text-[9px] text-cyan-400/60 uppercase">Saturation Tuning</span>
          </div>

          {/* Wheel 3: GAIN (Highlights) */}
          <div className="flex flex-col items-center gap-4">
            <span className="font-space text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
              GAIN (HIGHLIGHTS)
            </span>
            <div className="relative w-36 h-36 rounded-full border border-white/10 flex items-center justify-center bg-black/40">
              {/* Coordinate axis lines */}
              <div className="w-[85%] h-[1px] bg-white/5 absolute" />
              <div className="h-[85%] w-[1px] bg-white/5 absolute" />
              
              {/* Drag dot */}
              <motion.div
                drag
                dragConstraints={{ left: -45, right: 45, top: -45, bottom: 45 }}
                dragElastic={0.1}
                style={{ x: gainX, y: gainY }}
                className="w-5.5 h-5.5 rounded-full bg-cyan-400 border border-white flex items-center justify-center cursor-pointer z-10 shadow-[0_0_10px_#06b6d4]"
              >
                <div className="w-1.5 h-1.5 bg-black rounded-full" />
              </motion.div>
            </div>
            <span className="font-timecode text-[9px] text-cyan-400/60 uppercase">Highlights & Hue Shift</span>
          </div>

        </div>

        {/* LUT Details Info Dock */}
        <div className="p-6 rounded-xl bg-[#050507]/60 border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 font-timecode text-xs text-left">
          <div>
            <div className="text-cyan-400 font-bold tracking-wider mb-1 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{currentPreset.name}</span>
            </div>
            <p className="text-white/60 font-sans text-xs max-w-xl">
              {currentPreset.description}
            </p>
          </div>
          <div className="bg-black/60 border border-white/5 px-4 py-2 rounded-lg text-white/50">
            {currentPreset.specs}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ColorGradingStudio;
