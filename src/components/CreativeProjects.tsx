import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star } from 'lucide-react';

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
      id: 'paradise-shortfilm',
      title: 'Paradise — Samgatha Winner 2025',
      type: 'Dramatic Short Film',
      year: '2025',
      image: '/photos/paradise_poster.png',
      award: 'Samgatha 2025 Short Film Winner',
      role: 'Writer, Director & Lead Editor',
      summary: 'A dramatic, cinematic short film exploring deep human solitude, emotion, and psychological reflections.',
      bullets: [
        'Wrote original screenplay, storyboarded camera movements, and handled lighting.',
        'Executed complete post-production: DaVinci Resolve color grading & custom foley sound design.',
        'Individually handled cinematography and director cut assembly.'
      ]
    },
    {
      id: 'meraki-shortfilm',
      title: 'Meraki — Audience Favourite Award',
      type: 'Narrative Short Film',
      year: '2023',
      image: '/photos/love_today_poster.png',
      award: 'Meraki 2023 Best Audience Award',
      role: 'Writer, Director & Editor',
      summary: 'Directed and edited a compelling short film for the Meraki 2023 festival competition, capturing the Audience Favourite trophy.',
      bullets: [
        'Managed script execution, actor blocking, and multi-angle camera setups.',
        'Paced edits to maximize emotional climax and audience connection.',
        'Handled visual sequencing and color correction DI work.'
      ]
    },
    {
      id: 'artly-ad-campaign',
      title: 'Artly DIY Paper Models — Commercial Ad',
      type: 'Stop-Motion Ad Campaign',
      year: '2025',
      image: '/photos/artly_poster.png',
      role: 'Creative Director & Video Editor',
      summary: 'Created a set of two short-form video ads using stop-motion and kinetic speed transitions for Instagram Reels.',
      bullets: [
        'Conceptualized 9:16 mobile script flow to achieve maximum 3-second hook rate.',
        'Engineered stop-motion paper assembly cuts with tactile mechanical audio effects.',
        'Increased social click-through rates for product launches.'
      ]
    },
    {
      id: 'nit-trichy-anthology',
      title: 'NIT Trichy Film Competition — Anthology',
      type: 'Anthology Short Film',
      year: '2024',
      image: '/photos/IMG_0213.jpg',
      award: 'NIT Trichy Competition Official Selection',
      role: 'Screenwriter & Lead Editor',
      summary: 'Wrote and edited an interconnected multi-story anthology exploring diverse human themes and fate.',
      bullets: [
        'Interwove three distinct character storylines through cross-cutting match edits.',
        'Designed custom color palettes for each storyline to delineate narrative arcs.',
        'Received acclaim for inventive structural pacing.'
      ]
    }
  ];

  return (
    <section id="creative-projects" className="relative w-full py-28 bg-[#050507] px-4 lg:px-12 overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-timecode text-xs text-yellow-400 font-bold tracking-widest uppercase mb-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>DIRECTORIAL FILMOGRAPHY & FESTIVAL ACCOLADES</span>
            </div>
            <h2 className="font-mono text-4xl lg:text-7xl font-black tracking-tight text-white uppercase">
              SHORT FILMS & <span className="text-yellow-400">DIRECTING</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md font-sans text-sm leading-relaxed">
            Written, directed, and edited independently. Winner of campus film festivals and audience choice awards for narrative storytelling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {creativeProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden glass-panel border border-white/15 group cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 p-6 lg:p-8 flex flex-col justify-between">
                
                <div className="flex justify-between items-start">
                  {project.award ? (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-timecode text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{project.award}</span>
                    </div>
                  ) : (
                    <span className="px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-white/60 font-timecode text-[10px] uppercase">
                      {project.type}
                    </span>
                  )}
                  <span className="font-timecode text-xs text-white/50">{project.year}</span>
                </div>

                <div>
                  <span className="font-timecode text-[10px] text-yellow-400 uppercase tracking-widest block mb-1">
                    ROLE: {project.role}
                  </span>
                  <h3 className="font-mono text-2xl lg:text-3xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-yellow-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/70 font-sans text-xs line-clamp-2 max-w-xl leading-relaxed">
                    {project.summary}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CreativeProjects;
