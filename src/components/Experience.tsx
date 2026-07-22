import React from 'react';
import { motion } from 'framer-motion';
import { Film, Briefcase, Video, Users, Layers } from 'lucide-react';

interface ExperienceItem {
  track: string;
  role: string;
  company: string;
  duration: string;
  bullets: string[];
  tools: string[];
  icon: React.ReactNode;
}

export const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      track: 'V1 TRACK • COMMERCIAL EDITING',
      role: 'Video Editor & Editing Trainer',
      company: 'Millets The Best Food, Hyderabad',
      duration: 'NOV 2024 – FEB 2025',
      bullets: [
        'Edited high-converting promotional reels & social media campaign videos for brand marketing.',
        'Mentored and trained video editing interns in NLE workflows, color correction, and pacing.',
        'Produced short-form content optimized for maximum Instagram Reels and YouTube Shorts retention.'
      ],
      tools: ['Premiere Pro', 'CapCut Pro', 'DaVinci Resolve', 'Social Analytics'],
      icon: <Briefcase className="w-4 h-4 text-cyan-400" />
    },
    {
      track: 'V2 TRACK • AI & FREELANCE DIRECTING',
      role: 'Freelance Videographer & AI Content Editor',
      company: 'Startups, Local Brands & Influencers',
      duration: '2024 – PRESENT',
      bullets: [
        'Handled end-to-end video production from pre-production shot design to final master export.',
        'Professional reel editing for local brands, boosting viewer retention across social platforms.',
        'Evaluated AI video synthesis models (Google Veo, Kling AI, RunwayML, Pika) to generate commercial assets.'
      ],
      tools: ['Google Veo', 'Kling AI', 'RunwayML', 'Pika Labs', 'DaVinci Resolve'],
      icon: <Video className="w-4 h-4 text-cyan-400" />
    },
    {
      track: 'V3 TRACK • SHORT FILMS & DIRECTING',
      role: 'Director & Lead Editor',
      company: 'Team Kanyarasi, Chennai',
      duration: '2022 – PRESENT',
      bullets: [
        'Directed and edited narrative short films and high-impact music reels using Adobe Premiere & CapCut.',
        'Executed color grading DI passes, dramatic pacing, and theatrical sound foley design.',
        'Coordinated film crews, camera staging, and post-production delivery schedules.'
      ],
      tools: ['Premiere Pro', 'DaVinci Resolve', 'CapCut', 'Storyboarding', 'Sound Design'],
      icon: <Film className="w-4 h-4 text-cyan-400" />
    },
    {
      track: 'A1 TRACK • EVENT REELS & MEDIA',
      role: 'Lead Video Editor',
      company: 'Photography Club, IIITDM Kancheepuram',
      duration: '2023 – PRESENT',
      bullets: [
        'Edited campus event highlight reels and social media promotional videos.',
        'Increased channel engagement by 60% through rhythmic event recaps and color-matched photography.'
      ],
      tools: ['Lightroom', 'PicsArt', 'Canva', 'Social Media Editing'],
      icon: <Users className="w-4 h-4 text-cyan-400" />
    }
  ];

  return (
    <section id="experience" className="relative w-full py-28 bg-[#050507] px-4 lg:px-12 overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-timecode text-xs text-cyan-400 font-bold tracking-widest uppercase mb-2">
              <Layers className="w-4 h-4" />
              <span>NON-LINEAR EDITOR (NLE) TIMELINE MILESTONES</span>
            </div>
            <h2 className="font-mono text-4xl lg:text-7xl font-black tracking-tight text-white uppercase">
              CAREER <span className="text-cyan-400">TIMELINE</span>
            </h2>
          </div>
          <div className="font-timecode text-xs text-white/50 bg-black/60 border border-white/10 px-4 py-2 rounded-lg">
            SEQUENCE: 2022_2026_MASTER.nle
          </div>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel rounded-2xl p-6 lg:p-8 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative group hover:border-cyan-400/50 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-white/20 group-hover:bg-cyan-400 transition-colors rounded-l-2xl" />

              <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-4 pb-4 border-b border-white/10 font-timecode">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-black/60 border border-white/10">
                    {exp.icon}
                  </div>
                  <div>
                    <span className="text-[10px] text-cyan-400 font-bold tracking-widest block uppercase">
                      {exp.track}
                    </span>
                    <h3 className="font-mono text-xl lg:text-2xl font-black text-white uppercase">
                      {exp.role}
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-white/80 block">{exp.company}</span>
                  <span className="text-[11px] text-white/40">{exp.duration}</span>
                </div>
              </div>

              <ul className="space-y-2 mb-6 text-xs text-white/70 font-sans leading-relaxed">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono mt-0.5">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 font-timecode text-[10px]">
                {exp.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded bg-white/5 border border-white/10 text-white/70 font-bold"
                  >
                    {tool}
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

export default Experience;
