import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative w-full bg-background border-t border-white/5 py-16 px-6 overflow-hidden">
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col items-center">
        
        {/* Top: Large logo and Back to top */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 mb-16 pb-16 border-b border-white/5">
          {/* Large Logo */}
          <div className="text-left">
            <span className="font-space text-4xl lg:text-5xl font-black tracking-tighter text-white">
              RA<span className="text-neutral-600">.</span>
            </span>
            <span className="font-satoshi text-[10px] tracking-[0.3em] text-neutral-500 uppercase block mt-2">
              CREATIVE PORTFOLIO © 2026
            </span>
          </div>

          {/* Back to top circle button */}
          <button
            onClick={scrollToTop}
            className="group w-14 h-14 rounded-full glass-panel flex items-center justify-center border border-white/10 hover:border-white text-white transition-all duration-300 relative overflow-hidden"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="z-10"
            >
              <ArrowUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </motion.div>
            <div className="absolute inset-0 bg-white/5 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
          </button>
        </div>

        <div className="flex items-center gap-8 mb-12">
          <a 
            href="https://www.instagram.com/rohith_as_ekalavya?igsh=MXRzYXlscmFlN295dg%3D%3D&utm_source=qr" 
            target="_blank" 
            rel="noreferrer" 
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a 
            href="https://www.linkedin.com/in/arem-rohith-505ba4292?utm_source=share_via&utm_content=profile&utm_medium=member_ios" 
            target="_blank" 
            rel="noreferrer" 
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a 
            href="https://github.com/rohithasekalavya" 
            target="_blank" 
            rel="noreferrer" 
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
          <a 
            href="mailto:rohithasekalavya@gmail.com" 
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Bottom: Credits and copyright */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left select-none">
          <span className="font-satoshi text-[10px] tracking-widest text-neutral-600 uppercase">
            DESIGNED & CODED BY ANTIGRAVITY FOR ROHITH AREM
          </span>
          <span className="font-satoshi text-[10px] tracking-widest text-neutral-600 uppercase">
            ALL RIGHTS RESERVED.
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
