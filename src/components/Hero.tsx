import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';

export const Hero: React.FC = () => {
  const titles = [
    'Digital Creator',
    'AI Content Creator',
    'Video Editor',
    'Social Media Marketer',
    'Graphic Designer'
  ];

  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const purpleX = useTransform(smoothX, [-0.5, 0.5], [-35, 35]);
  const purpleY = useTransform(smoothY, [-0.5, 0.5], [-35, 35]);

  const orangeX = useTransform(smoothX, [-0.5, 0.5], [35, -35]);
  const orangeY = useTransform(smoothY, [-0.5, 0.5], [35, -35]);

  const portraitX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const portraitY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleScrollToProjects = () => {
    const elem = document.getElementById('video-work');
    if (elem) {
      const offset = 100;
      window.scrollTo({
        top: elem.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollToContact = () => {
    const elem = document.getElementById('contact');
    if (elem) {
      window.scrollTo({
        top: elem.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full flex items-center justify-center bg-background overflow-hidden px-6 pt-32 pb-20 lg:pt-40 lg:pb-24"
    >
      {/* Background Interactive Lights (Purple & Orange Glows) */}
      <motion.div 
        style={{
          x: purpleX,
          y: purpleY,
        }}
        className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] rounded-full bg-glow-purple blur-[120px] pointer-events-none opacity-60 animate-pulse-glow"
      />
      <motion.div 
        style={{
          x: orangeX,
          y: orangeY,
          animationDelay: '5s'
        }}
        className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-glow-orange blur-[140px] pointer-events-none opacity-40 animate-pulse-glow"
      />

      {/* Grid Overlay Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none opacity-40" />

      {/* Main Container */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center z-10">
        
        {/* Left Side Info */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-space text-xs lg:text-sm tracking-[0.3em] text-neutral-500 uppercase mb-4 block"
            >
              VISUAL STORYTELLER & AI CREATIVE
            </motion.span>
          </div>

          <div className="mb-2">
            <h1 className="font-space font-black tracking-tight text-white fluid-hero-title select-none">
              <motion.span
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Hi, I'm
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block text-gradient"
              >
                Rohith Arem
              </motion.span>
            </h1>
          </div>

          {/* Title Rotation */}
          <div className="h-12 lg:h-16 overflow-hidden mb-6 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={titleIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-space text-2xl lg:text-4xl font-light tracking-wide text-neutral-400"
              >
                {titles[titleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-satoshi text-base lg:text-lg text-neutral-400 font-light leading-relaxed max-w-lg mb-10"
          >
            I create cinematic content, AI-powered campaigns, engaging videos and visual experiences that help brands stand out.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <button
              onClick={handleScrollToProjects}
              className="bg-white hover:bg-neutral-200 text-black px-8 py-4 rounded-full font-satoshi font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg shadow-white/5"
            >
              View Projects
            </button>
            <a
              href="updated_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 hover:border-white hover:bg-white/5 text-white px-8 py-4 rounded-full font-satoshi font-bold text-xs tracking-widest uppercase transition-all duration-300"
            >
              View Resume
            </a>
            <button
              onClick={handleScrollToContact}
              className="font-satoshi text-xs font-bold text-neutral-400 hover:text-white tracking-widest uppercase underline underline-offset-4 py-2 px-4 transition-colors"
            >
              Hire Me
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-6"
          >
            <a 
              href="https://www.instagram.com/rohith_as_ekalavya?igsh=MXRzYXlscmFlN295dg%3D%3D&utm_source=qr" 
              target="_blank" 
              rel="noreferrer" 
              className="text-neutral-500 hover:text-white transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/arem-rohith-505ba4292?utm_source=share_via&utm_content=profile&utm_medium=member_ios" 
              target="_blank" 
              rel="noreferrer" 
              className="text-neutral-500 hover:text-white transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a 
              href="https://github.com/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-neutral-500 hover:text-white transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a 
              href="mailto:rohithasekalavya@gmail.com" 
              className="text-neutral-500 hover:text-white transition-colors duration-300"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>

        </div>

        {/* Right Side Image (Cinematic Floating Portrait) */}
        <div className="lg:col-span-5 relative w-full aspect-[4/5] max-w-md mx-auto lg:max-w-none flex justify-center items-center">
          <motion.div
            style={{
              x: portraitX,
              y: portraitY,
            }}
            className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl group border border-white/5"
          >
            {/* Dark gradient mapping edges of image to background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent z-10 opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/40 via-transparent to-[#080808]/40 z-10" />
            
            {/* The Portrait Image */}
            <img 
              src="/photos/WhatsApp Image 2026-06-27 at 15.44.21.jpeg" 
              alt="Rohith Arem Portrait" 
              className="w-full h-full object-cover scale-[1.05] group-hover:scale-[1.08] transition-transform duration-700 ease-out grayscale hover:grayscale-0 duration-[1.5s]"
            />

            {/* Glowing Accent Ring */}
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-purple-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-sm" />
          </motion.div>
          
          {/* Subtle Decorative UI element */}
          <div className="absolute -bottom-6 -right-6 glass-panel rounded-2xl p-4 hidden lg:flex flex-col gap-1 items-start max-w-[200px] border border-white/10 z-20">
            <span className="font-space text-[10px] tracking-widest text-neutral-500 uppercase">
              Location
            </span>
            <span className="font-satoshi text-xs font-semibold text-white">
              Hyderabad / Chennai, India
            </span>
          </div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div 
        onClick={handleScrollToProjects}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-40 hover:opacity-100 transition-opacity duration-300 hidden lg:flex"
      >
        <span className="font-space text-[9px] tracking-[0.2em] text-white uppercase">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-white" />
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;
