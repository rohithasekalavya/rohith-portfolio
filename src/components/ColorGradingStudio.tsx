import React, { useState, useRef } from 'react';
import { Sliders, Sparkles, CheckCircle2, Film } from 'lucide-react';

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

  return (
    <section id="lut-studio" className="relative w-full py-28 bg-[#08080c] border-t border-b border-white/10 px-4 lg:px-12 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 font-timecode text-xs text-cyan-400 font-bold tracking-widest uppercase mb-2">
              <Sliders className="w-4 h-4" />
              <span>COLOR SCIENCE & LUT PRE-VISUALIZER</span>
            </div>
            <h2 className="font-mono text-4xl lg:text-6xl font-black tracking-tight text-white uppercase">
              COLOR GRADING <span className="text-cyan-400">SUITE</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md font-sans text-sm leading-relaxed">
            Interact with Rohith's color grading engine. Drag the slider to compare flat RAW LOG footage against custom Davinci Resolve LUT profiles.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8 font-timecode text-xs">
          {lutPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setActiveLUT(preset.id)}
              data-cursor="pointer"
              className={`px-4 py-2.5 rounded-lg border transition-all flex items-center gap-2 ${
                activeLUT === preset.id
                  ? 'bg-cyan-400 text-black border-cyan-400 font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                  : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>{preset.name}</span>
            </button>
          ))}
        </div>

        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          data-cursor="drag"
          className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden glass-panel border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] select-none cursor-ew-resize"
        >
          <div className="absolute inset-0 lut-raw">
            <img 
              src="/photos/paradise_poster.png" 
              alt="RAW LOG Footage" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 glass-dock px-3 py-1.5 rounded-md border border-white/10 font-timecode text-[11px] text-white/80 font-bold">
              FLAT LOG RAW
            </div>
          </div>

          <div 
            className={`absolute inset-0 overflow-hidden ${currentPreset.className}`}
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
            <img 
              src="/photos/paradise_poster.png" 
              alt="Graded Footage" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 glass-dock px-3 py-1.5 rounded-md border border-cyan-400/30 font-timecode text-[11px] text-cyan-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              <span>GRADED PASS: {currentPreset.name}</span>
            </div>
          </div>

          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-cyan-400 shadow-[0_0_15px_#00f0ff] z-30 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-cyan-400 text-black flex items-center justify-center font-bold text-xs shadow-[0_0_20px_#00f0ff]">
              ↔
            </div>
          </div>
        </div>

        <div className="mt-6 p-6 rounded-xl glass-dock border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 font-timecode text-xs">
          <div>
            <div className="text-cyan-400 font-bold tracking-wider mb-1 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{currentPreset.name}</span>
            </div>
            <p className="text-white/70 font-sans text-sm max-w-xl">
              {currentPreset.description}
            </p>
          </div>
          <div className="bg-black/60 border border-white/10 px-4 py-2 rounded-lg text-white/60">
            {currentPreset.specs}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ColorGradingStudio;
