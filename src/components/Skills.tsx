import React from 'react';
import { motion } from 'framer-motion';
import { Video, Cpu, Palette, Camera, Terminal } from 'lucide-react';

interface TechCategory {
  category: string;
  badge: string;
  icon: React.ReactNode;
  skills: string[];
}

export const Skills: React.FC = () => {
  const techCategories: TechCategory[] = [
    {
      category: 'NLE SUITES & POST-PRODUCTION',
      badge: 'CORE NLE',
      icon: <Video className="w-5 h-5 text-cyan-400" />,
      skills: [
        'DaVinci Resolve Studio',
        'Adobe Premiere Pro',
        'CapCut Pro',
        'DaVinci Color Science',
        'Speed Ramping & Velocity',
        'Optical Flow Interpolation',
        'Audio Foley & Monologues',
        'Storyboarding & Staging'
      ]
    },
    {
      category: 'AI VIDEO GENERATION & SYNTHESIS',
      badge: 'GEN-AI TECH',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      skills: [
        'Google Veo (Google Flow)',
        'Kling AI Video Engine',
        'RunwayML Gen-3 Alpha',
        'Pika Labs',
        'InVideo AI Engine',
        'Google Gemini Pro',
        'ChatGPT Prompting',
        'AI Motion Tracking'
      ]
    },
    {
      category: 'CINEMATOGRAPHY & LIGHTROOM',
      badge: 'OPTICS',
      icon: <Camera className="w-5 h-5 text-cyan-400" />,
      skills: [
        'Handheld Videography',
        'Lightroom Classic',
        'Studio & Ambient Lighting',
        'Lens Focal Selection',
        'Event Recap Editing',
        'PicsArt Assets'
      ]
    },
    {
      category: 'MOTION GRAPHICS & DESIGN',
      badge: 'GRAPHICS',
      icon: <Palette className="w-5 h-5 text-cyan-400" />,
      skills: [
        'Adobe After Effects',
        'Canva Layouts',
        'Kinetic Typography',
        'Anamorphic Flares',
        'Social Ad Posters',
        'Film Grain Textures'
      ]
    }
  ];

  return (
    <section id="skills" className="relative w-full py-28 bg-[#050507] px-4 lg:px-12 overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-timecode text-xs text-cyan-400 font-bold tracking-widest uppercase mb-2">
              <Terminal className="w-4 h-4" />
              <span>EDITING ENGINES & CREATIVE AI STACK</span>
            </div>
            <h2 className="font-mono text-4xl lg:text-7xl font-black tracking-tight text-white uppercase">
              TOOLS & <span className="text-cyan-400">STACK</span>
            </h2>
          </div>
          <div className="font-timecode text-xs text-white/50 bg-black/60 border border-white/10 px-4 py-2 rounded-lg">
            ENGINE STATUS: 120 FPS ONLINE
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techCategories.map((group, groupIdx) => (
            <motion.div
              key={groupIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
              className="glass-panel rounded-2xl p-6 lg:p-8 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.8)] hover:border-cyan-400/50 transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10 font-timecode">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-black/60 border border-white/10">
                    {group.icon}
                  </div>
                  <h3 className="font-mono text-lg font-black text-white uppercase tracking-tight">
                    {group.category}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-bold text-[10px]">
                  {group.badge}
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5 font-timecode text-xs">
                {group.skills.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className="px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-cyan-400 hover:border-cyan-400/40 transition-all cursor-default flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
