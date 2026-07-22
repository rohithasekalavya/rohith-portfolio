import React from 'react';
import { Film } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative w-full py-28 bg-[#08080c] px-4 lg:px-12 overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 relative w-full aspect-[4/5] rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.9)] group">
            <img
              src="/photos/WhatsApp Image 2026-06-27 at 15.44.22.jpeg"
              alt="Rohith Arem Directorial Portrait"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-6 flex flex-col justify-end">
              <span className="font-timecode text-[10px] text-cyan-400 font-bold uppercase tracking-widest block mb-1">
                DIRECTOR & LEAD EDITOR
              </span>
              <h3 className="font-mono text-2xl font-black text-white uppercase">
                ROHITH AREM
              </h3>
              <span className="font-timecode text-xs text-white/50">
                IIITDM Kancheepuram, Chennai • ECE '25
              </span>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 font-timecode">
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold tracking-widest uppercase mb-2">
              <Film className="w-4 h-4" />
              <span>THE DIRECTORIAL STATEMENT</span>
            </div>
            <h2 className="font-mono text-4xl lg:text-6xl font-black tracking-tight text-white uppercase mb-6">
              CINEMATIC PACING. <br />
              <span className="text-cyan-400">AI PRECISION.</span>
            </h2>

            <div className="font-sans text-white/70 text-sm lg:text-base leading-relaxed space-y-4 mb-8">
              <p>
                I am a Director, Video Editor, and AI Content Specialist completing a B.Tech in Electronics & Communication Engineering at <strong>IIITDM Kancheepuram, Chennai</strong>.
              </p>
              <p>
                My editorial philosophy combines classical cinematic rhythm with next-generation AI video generation. Whether directing award-winning collegiate short films like <em>"Paradise"</em> (Samgatha 2025 Winner) or cutting high-retention commercial ads for brands like <em>Millets The Best Food</em> and <em>Benita Makeup Academy</em>, every frame is edited for visual impact, precise color science, and speed-ramp velocity.
              </p>
            </div>

            {/* Core Directorial Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 text-xs">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-cyan-400 font-bold block mb-1">4K DAVINCI RESOLVE</span>
                <span className="text-white/60 font-sans text-xs">Color Science & High-Bitrate Mastering</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-cyan-400 font-bold block mb-1">GENERATIVE AI VIDEO</span>
                <span className="text-white/60 font-sans text-xs">Google Veo, Kling AI & Runway Gen-3</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-cyan-400 font-bold block mb-1">SPEED RAMP VELOCITY</span>
                <span className="text-white/60 font-sans text-xs">Frame-accurate micro transitions</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-cyan-400 font-bold block mb-1">AWARD-WINNING CUTS</span>
                <span className="text-white/60 font-sans text-xs">Samgatha & Meraki Festival Winners</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
