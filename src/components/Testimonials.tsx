import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
}

export const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 't-1',
      name: 'Anirudh Sharma',
      role: 'Head of Marketing',
      company: 'Millets The Best Food',
      quote: 'Rohith completely transformed our social campaigns. His video editing pacing, audio synchronization, and custom hooks doubled our Instagram Reels viewer retention within weeks.'
    },
    {
      id: 't-2',
      name: 'Benita Reddy',
      role: 'Founder & Tutor',
      company: 'Benita Makeup Academy',
      quote: 'His structural edits and training workflow for our content creators were invaluable. He is incredibly precise, meets tight deadlines, and understands visual brand identity.'
    },
    {
      id: 't-3',
      name: 'Vignesh Kumar',
      role: 'Creative Lead',
      company: 'Team Kanyarasi',
      quote: 'Rohith brings cinematic magic to every frame. His work directing and post-processing "Paradise" and "Meraki" was stellar, combining deep atmospheric grading and custom sound design.'
    },
    {
      id: 't-4',
      name: 'Sarah D\'Souza',
      role: 'Product Lead',
      company: 'Artly DIY',
      quote: 'The AI-generated commercial assets Rohith produced using Kling AI and Google Veo were top-tier. He has an extremely forward-thinking approach to blending design, pacing, and artificial intelligence.'
    },
    {
      id: 't-5',
      name: 'Nitin Paul',
      role: 'Sports Coordinator',
      company: 'IIITDM Kancheepuram Athletics',
      quote: 'His athletics summary edit was clean, high-energy, and captured the physical drama of our track events perfectly. He has a brilliant eye for matching rhythmic visual transitions to bass peaks.'
    }
  ];

  // Double the testimonials array to make the infinite loop seamless
  const tickerItems = [...testimonials, ...testimonials];

  return (
    <section 
      className="relative w-full bg-secondary py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[30vw] h-[30vw] bg-glow-orange opacity-10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10 text-left mb-16">
        <span className="font-space text-xs lg:text-sm tracking-[0.3em] text-neutral-500 uppercase mb-4 block">
          CLIENT FEEDBACK
        </span>
        <h2 className="font-space text-4xl lg:text-5xl font-bold tracking-tight text-white">
          Client Testimonials
        </h2>
      </div>

      {/* Infinite Horizontal Ticker track */}
      <div className="relative w-full overflow-hidden flex select-none pointer-events-none">
        
        {/* Shadow overlays on edges to fade cards out */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-secondary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-secondary to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            duration: 35,
            ease: 'linear',
          }}
          className="flex gap-6 w-max px-4 py-2"
        >
          {tickerItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[300px] md:w-[450px] flex-shrink-0 glass-panel rounded-3xl p-6 lg:p-8 flex flex-col justify-between border border-white/5 relative bg-white/[0.01]"
            >
              {/* Quote icon background decoration */}
              <Quote className="absolute top-6 right-6 w-16 h-16 text-white/[0.02] pointer-events-none" />

              <p className="font-satoshi text-sm md:text-base text-neutral-300 font-light leading-relaxed mb-8 relative z-10">
                "{item.quote}"
              </p>

              <div className="flex flex-col border-t border-white/5 pt-4">
                <span className="font-space text-sm font-bold text-white">
                  {item.name}
                </span>
                <span className="font-satoshi text-xs text-neutral-500 mt-0.5">
                  {item.role} • {item.company}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;
