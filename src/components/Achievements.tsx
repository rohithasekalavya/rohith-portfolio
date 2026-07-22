import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Flame, Award } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  icon: React.ReactNode;
}

export const Achievements: React.FC = () => {
  const achievements: Achievement[] = [
    {
      id: 'ach-1',
      title: 'Samgatha 2025 Winner',
      subtitle: 'Short Film Festival',
      year: '2025',
      description: 'Awarded 1st Place out of 50+ entries for writing, directing, and editing "Paradise". Celebrated for color grading, emotional atmosphere, and sound design.',
      icon: <Trophy className="w-6 h-6 text-yellow-400" />
    },
    {
      id: 'ach-2',
      title: 'Audience Favourite Award',
      subtitle: 'Meraki Film Competition',
      year: '2023',
      description: 'Won Best Audience Choice Award at Meraki 2023 for short film directing and editing with high audience retention.',
      icon: <Medal className="w-6 h-6 text-yellow-400" />
    },
    {
      id: 'ach-3',
      title: 'HackAdThon Top Video',
      subtitle: 'Ad Production Competition',
      year: '2024',
      description: 'Produced the highest-rated product ad video using fast-cut stop motion and mechanical sound effects under a 24-hour deadline.',
      icon: <Star className="w-6 h-6 text-yellow-400" />
    },
    {
      id: 'ach-4',
      title: 'Best Athlete of the Year',
      subtitle: 'Inter-IIIT Athletics Meet',
      year: '2025',
      description: 'Honored as Best Athlete of the Year 2025 for gold-medal track sprint performances.',
      icon: <Flame className="w-6 h-6 text-yellow-400" />
    }
  ];

  return (
    <section id="achievements" className="relative w-full py-28 bg-[#08080c] px-4 lg:px-12 overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-timecode text-xs text-yellow-400 font-bold tracking-widest uppercase mb-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>HONORS, AWARDS & FESTIVAL TROPHIES</span>
            </div>
            <h2 className="font-mono text-4xl lg:text-7xl font-black tracking-tight text-white uppercase">
              HONORS & <span className="text-yellow-400">AWARDS</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md font-sans text-sm leading-relaxed">
            Recognized for creative filmmaking excellence, rapid commercial production under pressure, and collegiate athletic achievements.
          </p>
        </div>

        {/* Golden Laurel Trophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel rounded-2xl p-6 border border-yellow-400/20 shadow-[0_15px_40px_rgba(0,0,0,0.8)] hover:border-yellow-400/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="p-3 rounded-full bg-yellow-400/10 border border-yellow-400/30 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="font-timecode text-xs font-bold text-yellow-400 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20">
                    {item.year}
                  </span>
                </div>

                <span className="font-timecode text-[10px] text-yellow-400 font-bold tracking-widest uppercase block mb-1">
                  {item.subtitle}
                </span>
                <h3 className="font-mono text-xl font-black text-white uppercase mb-3 group-hover:text-yellow-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/70 font-sans text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Achievements;
