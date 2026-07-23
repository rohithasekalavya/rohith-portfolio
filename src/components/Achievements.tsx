import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Star, Flame } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  icon: React.ReactNode;
  accentClass: string;
  glowColor: string;
}

export const Achievements: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const achievements: Achievement[] = [
    {
      id: 'ach-1',
      title: 'Samgatha Winner',
      subtitle: 'Short Film Festival',
      year: '2025',
      description: 'Awarded 1st Place out of 50+ competitive entries for directing and editing the dramatic short film "Paradise" at the national collegiate festival. Recognized for outstanding cinematography pacing, narrative depth, and color mapping.',
      icon: <Trophy className="w-6 h-6 text-yellow-400" />,
      accentClass: 'border-yellow-500/20 shadow-yellow-500/5',
      glowColor: 'bg-yellow-500/10'
    },
    {
      id: 'ach-2',
      title: 'Audience Favourite',
      subtitle: 'Meraki Film Competition',
      year: '2023',
      description: 'Won the Best Audience Favourite Award at the Meraki Film Competition for exceptional script execution, camera staging, and editing pacing that gained a 98% viewer satisfaction rating.',
      icon: <Medal className="w-6 h-6 text-orange-400" />,
      accentClass: 'border-orange-500/20 shadow-orange-500/5',
      glowColor: 'bg-orange-500/10'
    },
    {
      id: 'ach-3',
      title: 'HackAdThon Winner',
      subtitle: 'Ad Production Hackathon',
      year: '2024',
      description: 'Produced the top-rated creative product advertisement video under a tight 24-hour time constraint using fast cuts, stop-motion transitions, and mechanical sound post-production overlays.',
      icon: <Star className="w-6 h-6 text-purple-400" />,
      accentClass: 'border-purple-500/20 shadow-purple-500/5',
      glowColor: 'bg-purple-500/10'
    },
    {
      id: 'ach-4',
      title: 'Best Athlete of the Year',
      subtitle: 'Inter-IIIT Sports Meet',
      year: '2025',
      description: 'Honored as the Best Athlete of the Year at the Inter-IIIT Sports Meet for gold-medal track performances, setting a new collegiate speed record in the 100m sprint.',
      icon: <Flame className="w-6 h-6 text-emerald-400" />,
      accentClass: 'border-emerald-500/20 shadow-emerald-500/5',
      glowColor: 'bg-emerald-500/10'
    }
  ];

  const angles = [-45, -15, 15, 45];
  const rotationAngle = -angles[activeIndex];

  return (
    <section 
      id="achievements" 
      className="relative min-h-[85vh] w-full bg-secondary py-24 lg:py-32 overflow-hidden px-6 flex items-center justify-center"
    >
      {/* Background Lighting blobs */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ${achievements[activeIndex].glowColor}`} />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-left mb-12 lg:mb-16">
          <span className="font-space text-xs lg:text-sm tracking-[0.3em] text-neutral-500 uppercase mb-4 block">
            HONOURS & CREDENTIALS
          </span>
          <h2 className="font-cinzel text-4xl lg:text-5xl font-light tracking-tight text-white uppercase">
            Awards & Laurels
          </h2>
        </div>

        {/* Interactive Dial Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Navigation list */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="space-y-1">
              {achievements.map((item, index) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`group py-5 border-b border-white/5 cursor-pointer transition-all duration-300 flex items-center justify-between text-left ${
                    activeIndex === index ? 'border-b-white/20 opacity-100' : 'opacity-30 hover:opacity-75'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-space text-xs text-neutral-500 font-bold">
                      0{index + 1}
                    </span>
                    <div>
                      <span className="font-space text-[9px] tracking-widest text-neutral-500 uppercase block mb-0.5">
                        {item.subtitle}
                      </span>
                      <h3 className="font-cinzel text-base lg:text-lg font-medium text-white transition-transform duration-300 group-hover:translate-x-1">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <span className="font-space text-xs text-neutral-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    {item.year}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Circular Dial Display */}
          <div className="lg:col-span-7 flex justify-center items-center relative py-6">
            
            {/* The Outer Rotating Ring */}
            <div className="relative w-[420px] h-[420px] md:w-[500px] md:h-[500px] rounded-full border border-white/5 bg-black/[0.15] flex items-center justify-center">
              
              {/* Spinning Segment Circle */}
              <motion.div 
                animate={{ rotate: rotationAngle }} 
                transition={{ type: 'spring', damping: 28, stiffness: 120, mass: 0.8 }}
                className="absolute inset-0 rounded-full border border-white/10 border-dashed"
              >
                {achievements.map((item, index) => {
                  const angle = angles[index];
                  // Compute relative positions along the circle's radius (pushed to 46.5% for visual separation)
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.sin(rad) * 46.5; // Radius percentage
                  const y = -Math.cos(rad) * 46.5;

                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => setActiveIndex(index)}
                      style={{ 
                        left: `calc(50% + ${x}%)`, 
                        top: `calc(50% + ${y}%)`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      animate={{ 
                        scale: activeIndex === index ? 1.15 : 0.9,
                        borderColor: activeIndex === index ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.05)'
                      }}
                      className="absolute w-14 h-14 rounded-full glass-panel flex items-center justify-center border transition-colors bg-neutral-900/90 z-20 hover:border-white/20 active:scale-95"
                    >
                      {/* Inverse rotation to keep the icon vertical */}
                      <motion.div
                        animate={{ rotate: -rotationAngle }}
                        transition={{ type: 'spring', damping: 28, stiffness: 120 }}
                      >
                        {item.icon}
                      </motion.div>
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Center Panel (Metadata Details) */}
              <div className="absolute w-[250px] h-[250px] md:w-[310px] md:h-[310px] rounded-full bg-[#080808]/95 border border-white/10 z-10 flex items-center justify-center p-8 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.92, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col items-center justify-center text-center"
                  >
                    <div className="mb-4 scale-110">
                      {achievements[activeIndex].icon}
                    </div>
                    <span className="font-space text-[9px] tracking-[0.25em] text-neutral-500 uppercase mb-1 block">
                      {achievements[activeIndex].subtitle}
                    </span>
                    <h4 className="font-space text-base md:text-lg font-bold text-white mb-3 leading-tight">
                      {achievements[activeIndex].title}
                    </h4>
                    <p className="font-satoshi text-xs md:text-sm text-neutral-400 leading-relaxed font-light max-w-[200px] md:max-w-[240px]">
                      {achievements[activeIndex].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Achievements;
