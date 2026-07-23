import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

const StatCounter: React.FC<StatCounterProps> = ({ value, suffix = '', label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const count = useMotionValue(0);
  const rounded = useSpring(count, { damping: 50, stiffness: 200 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      count.set(value);
    }
  }, [isInView, value, count]);

  useEffect(() => {
    return rounded.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [rounded]);

  return (
    <div ref={ref} className="flex flex-col border-l border-white/10 pl-6 py-2">
      <span className="font-space text-3xl lg:text-5xl font-bold tracking-tight text-white">
        {displayValue}
        {suffix}
      </span>
      <span className="font-satoshi text-xs text-neutral-400 mt-1 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
};

export const About: React.FC = () => {
  return (
    <section 
      id="about" 
      className="relative min-h-screen w-full flex items-center justify-center bg-secondary py-24 lg:py-32 overflow-hidden px-6"
    >
      {/* Huge Background Faded Text */}
      <div className="absolute top-10 left-10 text-stroke opacity-[0.03] select-none pointer-events-none font-space font-black tracking-tighter leading-none w-full fluid-bg-text">
        ABOUT
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        
        {/* Left Column: Portrait and Decorative Elements */}
        <div className="lg:col-span-5 relative w-full aspect-[3/4] max-w-sm mx-auto lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl relative border border-white/5"
          >
            {/* Overlay Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            
            <img 
              src="/photos/WhatsApp Image 2026-06-27 at 15.44.22.jpeg" 
              alt="Rohith Arem About Portrait" 
              className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-[1s]"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent z-10" />
          </motion.div>
          
          {/* Faint orange glow in background */}
          <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-glow-orange opacity-40 blur-[80px] pointer-events-none" />
        </div>

        {/* Right Column: Text & Stats */}
        <div className="lg:col-span-7 text-left flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-space text-xs lg:text-sm tracking-[0.3em] text-neutral-500 uppercase mb-4 block">
              MY BACKGROUND
            </span>
            <h2 className="font-space text-4xl lg:text-5xl font-bold tracking-tight text-white mb-8">
              Cinematic Vision <br />
              <span className="text-neutral-400">Powered by Technology</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-satoshi text-base lg:text-lg text-neutral-300 font-light leading-relaxed space-y-6 mb-12 max-w-2xl"
          >
            <p>
              I am a final-year B.Tech student in Electronics and Communication Engineering at <strong>IIITDM Kancheepuram, Chennai</strong>. Bridging the gap between creative visual execution and emerging AI technology, I craft high-impact content for brands, creators, and digital spaces.
            </p>
            <p>
              From directing award-winning short films at collegiate festivals to training teams, managing client content strategies, and benchmarking next-generation AI video generators like <strong>Runway Gen-3, Kling, and Google Veo</strong>, my process centers on strict editing precision, visual pacing, and premium aesthetic execution.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6 border-t border-white/5 pt-10"
          >
            <StatCounter value={4} suffix="+" label="Years Editing" />
            <StatCounter value={50} suffix="+" label="Reels & Edits" />
            <StatCounter value={10} suffix="+" label="Brands & Startups" />
            <StatCounter value={7} suffix="+" label="AI Tools Mastered" />
            <StatCounter value={4} suffix="" label="National Awards" />
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default About;
