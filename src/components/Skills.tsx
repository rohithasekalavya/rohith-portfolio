import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Cpu, Camera, Palette, ShieldCheck } from 'lucide-react';


interface SkillGroup {
  category: string;
  icon: React.ReactNode;
  skills: string[];
  glowColor: string; // Tailwind glow classes
}

export const Skills: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<string>('All');

  const skillGroups: SkillGroup[] = [
    {
      category: 'Video Editing',
      icon: <Video className="w-4 h-4 text-white" />,
      glowColor: 'group-hover:border-cyan-500/20 group-hover:shadow-cyan-500/5',
      skills: [
        'DaVinci Resolve',
        'Adobe Premiere Pro',
        'CapCut',
        'Sound Design',
        'Colour Grading',
        'Storyboarding',
        'Cinematography',
        'Visual Pacing',
        'Audio Monologues'
      ]
    },
    {
      category: 'AI Tools',
      icon: <Cpu className="w-4 h-4 text-white" />,
      glowColor: 'group-hover:border-cyan-500/20 group-hover:shadow-cyan-500/5',
      skills: [
        'Google Veo',
        'Kling AI',
        'RunwayML',
        'Pika Labs',
        'InVideo AI',
        'Google Gemini',
        'ChatGPT',
        'Prompt Engineering',
        'Seed Optimization'
      ]
    },
    {
      category: 'Photography',
      icon: <Camera className="w-4 h-4 text-white" />,
      glowColor: 'group-hover:border-cyan-500/20 group-hover:shadow-cyan-500/5',
      skills: [
        'Videography',
        'Lightroom Classic',
        'PicsArt',
        'Event Recap Sheets',
        'Framing & Composition',
        'Studio Lighting'
      ]
    },
    {
      category: 'Design & Motion',
      icon: <Palette className="w-4 h-4 text-white" />,
      glowColor: 'group-hover:border-cyan-500/20 group-hover:shadow-cyan-500/5',
      skills: [
        'Canva',
        'Adobe After Effects',
        'Motion Graphics overlays',
        'Social Ad Templates',
        'Visual Asset Design',
        'Typography layouts'
      ]
    },
    {
      category: 'Strategy & Soft',
      icon: <ShieldCheck className="w-4 h-4 text-white" />,
      glowColor: 'group-hover:border-cyan-500/20 group-hover:shadow-cyan-500/5',
      skills: [
        'Visual Storytelling',
        'Scriptwriting',
        'Social Media Editing',
        'AI-Assisted Production',
        'Team Mentoring',
        'Creative Collaboration'
      ]
    }
  ];

  const categories = ['All', ...skillGroups.map(g => g.category)];

  const filteredGroups = activeGroup === 'All' 
    ? skillGroups 
    : skillGroups.filter(g => g.category === activeGroup);

  return (
    <section 
      id="skills" 
      className="relative min-h-screen w-full bg-background py-24 lg:py-32 overflow-hidden px-6"
    >
      {/* Background Lighting Glows */}
      <div className="absolute top-1/3 left-1/4 w-[35vw] h-[35vw] bg-glow-purple opacity-20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[40vw] h-[40vw] bg-glow-orange opacity-15 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-left mb-16 lg:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="font-space text-xs lg:text-sm tracking-[0.3em] text-neutral-500 uppercase mb-4 block">
              EXPERTISE & WORKFLOWS
            </span>
            <h2 className="font-cinzel text-4xl lg:text-5xl font-light tracking-tight text-white uppercase">
              Skills & Tech Stack
            </h2>
          </div>

          {/* Category Selector filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveGroup(cat)}
                className={`px-4 py-2 rounded-full font-satoshi text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  activeGroup === cat 
                    ? 'bg-white text-black shadow-lg shadow-white/5' 
                    : 'bg-white/5 border border-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {filteredGroups.map((group, groupIdx) => (
            <motion.div
              layout
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: groupIdx * 0.1 }}
              className={`glass-panel rounded-[2rem] p-6 lg:p-8 flex flex-col hover:shadow-2xl transition-all duration-500 group ${group.glowColor}`}
            >
              {/* Group Title */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
                  {group.icon}
                </div>
                <h3 className="font-cinzel text-base lg:text-lg font-medium text-white uppercase tracking-wider">
                  {group.category}
                </h3>
              </div>

              {/* Pills Cloud */}
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, skillIdx) => {
                  // Randomized float parameters to make each pill feel alive
                  const floatY = [0, -4 - (skillIdx % 3) * 2, 0];
                  const duration = 3 + (skillIdx % 4) * 0.8;
                  const delay = (skillIdx % 5) * 0.3;

                  return (
                    <motion.div
                      key={skill}
                      animate={{ y: floatY }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: duration, 
                        delay: delay, 
                        ease: 'easeInOut' 
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        borderColor: 'rgba(255, 255, 255, 0.25)',
                        transition: { duration: 0.2 } 
                      }}
                      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                      className="bg-white/5 border border-white/5 px-4 py-2 rounded-full font-satoshi text-xs text-neutral-300 font-light flex items-center cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 mr-2 group-hover:bg-white transition-colors" />
                      {skill}
                    </motion.div>
                  );
                })}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
