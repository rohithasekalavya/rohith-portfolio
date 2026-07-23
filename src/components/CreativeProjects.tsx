import React from 'react';
import { motion } from 'framer-motion';
import { Film, Award, PlayCircle } from 'lucide-react';

interface CreativeProject {
  id: string;
  title: string;
  type: string;
  year: string;
  image: string;
  award?: string;
  role: string;
  summary: string;
  bullets: string[];
}

export const CreativeProjects: React.FC = () => {
  const creativeProjects: CreativeProject[] = [
    {
      id: 'cp-1',
      title: 'Paradise — Samgatha Winner',
      type: 'Dramatic Short Film',
      year: '2025',
      image: '/photos/paradise_poster.png',
      award: 'Samgatha 2025 Short Film Winner',
      role: 'Writer, Director & Lead Editor',
      summary: 'A dramatic, cinematic short film exploring deep human emotions, solitude, and relationships, crafted for the collegiate festival.',
      bullets: [
        'Managed all pre-production, screenwriting, and storyboarding phases.',
        'Handled cinematography, camera staging, and soft ambient lighting adjustments.',
        'Executed complete post-production workflow, including color mapping and cinematic audio foley.'
      ]
    },
    {
      id: 'cp-2',
      title: 'Love Today — Ekalavya Show',
      type: 'Dramatic Short Film',
      year: '2024',
      image: '/photos/love_today_poster.png',
      role: 'Writer, Director & Lead Editor',
      summary: 'A dramatic short film under Team Kanyarasi, themed around personal reflections, relationships, and human emotions.',
      bullets: [
        'Conceptualized a dynamic script exploring personal narratives and modern dynamics.',
        'Directed visual sequencing, composition setups, and color grading DI work.',
        'Completed sound staging, voice modulation matching, and pacing synchronization.'
      ]
    },
    {
      id: 'cp-3',
      title: 'Artly DIY Paper Model Ads',
      type: 'Ad Campaign Project',
      year: '2025',
      image: '/photos/artly_poster.png',
      role: 'Creative Director & Video Editor',
      summary: 'A set of two promotional videos designed for Instagram Reels utilizing stop-motion and custom speed scaling.',
      bullets: [
        'Developed script and shot design templates optimized for 9:16 mobile viewports.',
        'Engineered creative transition pacing to maximize viewer attention and minimize bounce rates.',
        'Synchronized mechanical product clicks and assembly sounds in sound post-production.'
      ]
    }
  ];

  return (
    <section 
      id="creative-projects" 
      className="relative min-h-screen w-full bg-secondary py-24 lg:py-32 overflow-hidden px-6"
    >
      {/* Background gradient blob */}
      <div className="absolute bottom-0 right-0 w-[45vw] h-[45vw] bg-glow-purple opacity-10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-left mb-16 lg:mb-24">
          <span className="font-space text-xs lg:text-sm tracking-[0.3em] text-neutral-500 uppercase mb-4 block">
            CINEMATIC PRODUCTION
          </span>
          <h2 className="font-space text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Creative Projects
          </h2>
        </div>

        {/* Cinematic Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {creativeProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] w-full rounded-[2.5rem] overflow-hidden glass-panel border border-white/5 shadow-2xl cursor-pointer group"
            >
              {/* Background Image */}
              <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 group-hover:blur-[2px] grayscale group-hover:grayscale-0"
              />

              {/* Dark Mask overlay (grows darker on hover to reveal text) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10 group-hover:from-black/95 group-hover:via-black/85 group-hover:to-black/60 transition-all duration-500 z-10" />

              {/* Normal State Info (Visible at bottom initially) */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-20 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                {/* Top Badges */}
                <div className="flex justify-between items-start w-full">
                  <span className="bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-1 rounded-full font-satoshi text-[9px] uppercase tracking-wider text-neutral-300">
                    {project.type}
                  </span>
                  <span className="font-space text-xs font-semibold text-white/50">
                    {project.year}
                  </span>
                </div>

                {/* Bottom title & Award badge if present */}
                <div className="text-left">
                  {project.award && (
                    <div className="flex items-center gap-1.5 mb-2 text-orange-400">
                      <Award className="w-4 h-4" />
                      <span className="font-satoshi text-[10px] font-bold uppercase tracking-wider">
                        Winner
                      </span>
                    </div>
                  )}
                  <h3 className="font-space text-2xl font-bold text-white mb-2">
                    {project.title.split(' —')[0]}
                  </h3>
                  <span className="font-satoshi text-xs text-neutral-400 uppercase tracking-widest">
                    {project.role}
                  </span>
                </div>
              </div>

              {/* Hover State Detail Overlay (Fades in) */}
              <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-left">
                <div>
                  <div className="flex justify-between items-center w-full mb-6 pb-4 border-b border-white/5">
                    <span className="font-space text-xs text-neutral-500 font-bold uppercase tracking-widest">
                      {project.type} • {project.year}
                    </span>
                    <Film className="w-4 h-4 text-neutral-500" />
                  </div>

                  {project.award && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/15 text-orange-400 mb-4">
                      <Award className="w-3.5 h-3.5" />
                      <span className="font-satoshi text-[9px] font-bold uppercase tracking-wider">
                        {project.award}
                      </span>
                    </div>
                  )}

                  <h3 className="font-space text-2xl font-bold text-white mb-2 leading-tight">
                    {project.title}
                  </h3>
                  
                  <span className="font-satoshi text-xs font-semibold text-neutral-400 uppercase tracking-widest block mb-4">
                    {project.role}
                  </span>

                  <p className="font-satoshi text-xs text-neutral-300 font-light leading-relaxed mb-6">
                    {project.summary}
                  </p>

                  <ul className="space-y-2">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx} className="font-satoshi text-[11px] text-neutral-400 leading-relaxed flex items-start gap-2">
                        <span className="text-white mt-1">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2 font-satoshi text-xs text-white uppercase tracking-widest font-bold self-start mt-6 group/link"
                >
                  Project Inquiries
                  <PlayCircle className="w-4 h-4 text-neutral-400 group-hover/link:text-white transition-colors" />
                </a>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CreativeProjects;
