import React from 'react';
import { ArrowUp, Mail, Film } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative w-full bg-[#050507] border-t border-white/10 py-16 px-4 lg:px-12 overflow-hidden font-timecode text-xs">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-bold mb-2">
              <Film className="w-4 h-4" />
              <span>ROHITH AREM • DIRECTORIAL CUTS</span>
            </div>
            <h3 className="font-mono text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter">
              END OF <span className="text-cyan-400">SEQUENCE</span>
            </h3>
          </div>

          <button
            onClick={scrollToTop}
            data-cursor="pointer"
            className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-400 hover:text-black transition-all text-white font-bold text-xs uppercase"
          >
            <span>BACK TO HEADLINE</span>
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 text-white/50">
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/rohith_as_ekalavya?igsh=MXRzYXlscmFlN295dg%3D%3D&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              data-cursor="pointer"
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:text-cyan-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a
              href="https://www.linkedin.com/in/arem-rohith-505ba4292?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noreferrer"
              data-cursor="pointer"
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:text-cyan-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a
              href="https://github.com/rohithasekalavya"
              target="_blank"
              rel="noreferrer"
              data-cursor="pointer"
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:text-cyan-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a
              href="mailto:rohithasekalavya@gmail.com"
              data-cursor="pointer"
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="text-right text-[11px] text-white/40">
            <div>TC 01:59:59:24 | MASTER EXP 2026</div>
            <div>HYDERABAD / CHENNAI, INDIA</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] text-white/30">
          <span>© 2026 ROHITH AREM. ALL RIGHTS RESERVED.</span>
          <span>ENGINEERED FOR CINEMATIC EXCELLENCE</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
