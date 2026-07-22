import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Volume2, VolumeX, Film } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  letterboxActive: boolean;
  onToggleLetterbox: () => void;
  audioActive: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  letterboxActive,
  onToggleLetterbox,
  audioActive,
  onToggleAudio
}) => {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'HEADLINE', id: 'home' },
    { label: 'WORKS', id: 'video-work' },
    { label: 'LUT STUDIO', id: 'lut-studio' },
    { label: 'FILMS', id: 'creative-projects' },
    { label: 'TIMELINE', id: 'experience' },
    { label: 'SUITE', id: 'services' },
    { label: 'STILLS', id: 'gallery' },
    { label: 'ACTION', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navbarOffset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 lg:top-6 left-0 right-0 z-[100] max-w-7xl mx-auto px-4 lg:px-6"
      >
        <div className="glass-dock rounded-full px-5 py-3 lg:px-6 lg:py-3.5 flex items-center justify-between border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          
          <div className="flex items-center gap-4">
            <div 
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-2 cursor-pointer group"
              data-cursor="pointer"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-black transition-all">
                <span className="font-mono text-xs font-black">RA</span>
              </div>
              <span className="font-mono text-sm font-bold tracking-tighter text-white">
                ROHITH <span className="text-cyan-400 font-normal">AREM</span>
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-black/50 border border-white/10 px-2.5 py-1 rounded-full font-timecode text-[10px]">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-white/80">REC</span>
              <span className="text-white/40">|</span>
              <span className="text-cyan-400">4K 60FPS</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                data-cursor="pointer"
                className={`font-timecode text-[11px] font-bold tracking-wider relative py-1 transition-colors duration-300 ${
                  activeSection === item.id 
                    ? 'text-cyan-400' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activePlayhead"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-cyan-400 shadow-[0_0_8px_#00f0ff]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onToggleLetterbox}
              data-cursor="pointer"
              title="Toggle Anamorphic 2.39:1 Mode"
              className={`p-2 rounded-full border transition-all ${
                letterboxActive
                  ? 'bg-cyan-400 text-black border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.5)]'
                  : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onToggleAudio}
              data-cursor="pointer"
              title="Toggle Sound Effects"
              className={`p-2 rounded-full border transition-all ${
                audioActive
                  ? 'bg-cyan-400 text-black border-cyan-400'
                  : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {audioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            <a
              href="/updated_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className="flex items-center gap-1.5 bg-white hover:bg-cyan-400 hover:text-black text-black px-4 py-1.5 rounded-full font-timecode font-bold text-[11px] tracking-wider uppercase transition-all duration-300 shadow-md shadow-white/5"
            >
              RESUME
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onToggleLetterbox}
              className={`p-2 rounded-full border ${letterboxActive ? 'bg-cyan-400 text-black' : 'bg-white/5 text-white'}`}
            >
              <Film className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-1 hover:text-cyan-400 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[80px] z-[90] bg-[#050507]/95 backdrop-blur-xl lg:hidden flex flex-col p-6 justify-between border-t border-white/10 font-timecode"
          >
            <div className="flex flex-col gap-4 mt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-2xl font-bold tracking-wider py-2 border-b border-white/5 transition-colors ${
                    activeSection === item.id ? 'text-cyan-400' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
              <div className="flex justify-between items-center text-xs text-white/50">
                <span>DIRECT EDITORIAL CONTACT</span>
                <span className="text-cyan-400">AVAILABLE 2026</span>
              </div>
              <a href="mailto:rohithasekalavya@gmail.com" className="text-sm font-mono text-white">
                rohtihasekalavya@gmail.com
              </a>
              <a href="tel:+919640117129" className="text-sm font-mono text-white/70">
                +91 96401 17129
              </a>
              <a
                href="/updated_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-cyan-400 text-black text-center font-black rounded-lg text-xs tracking-widest uppercase mt-2"
              >
                DOWNLOAD RESUME PDF
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
