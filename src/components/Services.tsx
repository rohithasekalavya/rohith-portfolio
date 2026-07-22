import React from 'react';
import { motion } from 'framer-motion';
import { Video, Cpu, Sliders, Volume2, Activity, Film, Sparkles } from 'lucide-react';

interface ServiceItem {
  number: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

export const Services: React.FC = () => {
  const services: ServiceItem[] = [
    {
      number: '01',
      title: 'Post-Production Assembly',
      category: 'NLE CUTS & PACING',
      description: 'Precision frame-by-frame cutting, speed ramps, match cuts, and visual rhythm tailored for high viewer retention.',
      features: ['DaVinci Resolve / Premiere Pro', 'Rhythmic Speed Ramping', 'Optical Flow Interpolation', '4K Master Exports'],
      icon: <Video className="w-6 h-6 text-cyan-400" />
    },
    {
      number: '02',
      title: 'AI Video Synthesis',
      category: 'GENERATIVE CREATIVE',
      description: 'Leveraging next-gen video models to craft hyper-realistic visual effects, digital environments, and ad concepts.',
      features: ['Google Veo / Flow Prompts', 'Kling AI Motion Tracking', 'RunwayML Gen-3 Synthesis', 'Pika Labs Integration'],
      icon: <Cpu className="w-6 h-6 text-cyan-400" />
    },
    {
      number: '03',
      title: 'Color Grading Science',
      category: 'LOOK DEVELOPMENT',
      description: 'DaVinci Resolve color science: custom LUT creation, skin tone recovery, teal-orange split toning, and film grain.',
      features: ['Log to Rec.709 Conversions', 'Custom Film Grain Mapping', 'Anamorphic Streak Flares', 'Color Matching Across Shots'],
      icon: <Sliders className="w-6 h-6 text-cyan-400" />
    },
    {
      number: '04',
      title: 'Sound Design & Foley',
      category: 'AUDIO POST',
      description: 'Multi-layered audio mixing, riser swooshes, sub-bass impacts, spatial soundscapes, and vocal clarity enhancement.',
      features: ['Custom Foley Design', 'Bass Impact Synchronization', 'Vocal Compression & EQ', 'Sub-frequency Enhancement'],
      icon: <Volume2 className="w-6 h-6 text-cyan-400" />
    },
    {
      number: '05',
      title: 'Commercial Ad Campaigns',
      category: 'HIGH-CONVERSION REELS',
      description: 'Short-form social media ads engineered with 3-second hook mechanics for Instagram Reels and YouTube Shorts.',
      features: ['Stop-Motion Assembly', 'Conversion-Focused Hooks', 'Kinetic Typography', 'CTR Optimization'],
      icon: <Activity className="w-6 h-6 text-cyan-400" />
    },
    {
      number: '06',
      title: 'Directing & Cinematography',
      category: 'PRE-PRODUCTION TO DELIVERY',
      description: 'Full creative direction: writing screenplays, shot planning, lighting control, and directing on-set crews.',
      features: ['Original Scriptwriting', 'Storyboarding', 'Camera Staging & Lighting', 'Crew Management'],
      icon: <Film className="w-6 h-6 text-cyan-400" />
    }
  ];

  return (
    <section id="services" className="relative w-full py-28 bg-[#08080c] px-4 lg:px-12 overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-timecode text-xs text-cyan-400 font-bold tracking-widest uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>EDITORIAL CAPABILITIES & PRODUCTION SUITE</span>
            </div>
            <h2 className="font-mono text-4xl lg:text-7xl font-black tracking-tight text-white uppercase">
              EDITORIAL <span className="text-cyan-400">SUITE</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md font-sans text-sm leading-relaxed">
            End-to-end post-production services engineered to elevate brands, agencies, and filmmakers into the elite tier of visual storytelling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-panel rounded-2xl p-6 lg:p-8 border border-white/10 group hover:border-cyan-400/50 shadow-[0_15px_40px_rgba(0,0,0,0.8)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-6 font-timecode">
                  <span className="text-2xl font-black text-cyan-400/40 group-hover:text-cyan-400 transition-colors">
                    {service.number}
                  </span>
                  <div className="p-3 rounded-xl bg-black/60 border border-white/10 group-hover:border-cyan-400/30 transition-colors">
                    {service.icon}
                  </div>
                </div>

                <span className="font-timecode text-[10px] text-cyan-400 font-bold tracking-widest block uppercase mb-1">
                  {service.category}
                </span>
                <h3 className="font-mono text-xl lg:text-2xl font-black text-white uppercase mb-3">
                  {service.title}
                </h3>
                <p className="text-white/70 font-sans text-xs leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 font-timecode text-[10px] space-y-1.5">
                {service.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-white/50 group-hover:text-white/80 transition-colors">
                    <span className="w-1 h-1 rounded-full bg-cyan-400" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
