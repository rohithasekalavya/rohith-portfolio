import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, Film, Clapperboard } from 'lucide-react';

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('rohithasekalavya@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="relative w-full py-28 bg-[#050507] px-4 lg:px-12 overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-timecode text-xs text-cyan-400 font-bold tracking-widest uppercase mb-2">
              <Clapperboard className="w-4 h-4" />
              <span>DIRECT EDITORIAL BOOKINGS & COMMISSIONS</span>
            </div>
            <h2 className="font-mono text-4xl lg:text-8xl font-black tracking-tight text-white uppercase">
              ROLL <span className="text-cyan-400">CAMERA</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md font-sans text-sm leading-relaxed">
            Ready to initiate post-production on your next commercial, short film, or AI video campaign? Send a direct signal below.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-8 lg:p-14 border border-white/15 shadow-[0_30px_100px_rgba(0,0,0,0.95)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center font-timecode">
          
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <span className="px-3 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-[10px] uppercase tracking-wider mb-4 inline-block">
                ● STATUS: ACCEPTING 2026 EDITORIAL COMMISSIONS
              </span>
              <h3 className="font-mono text-3xl lg:text-5xl font-black text-white uppercase mb-4 leading-tight">
                LET'S EDIT SOMETHING <span className="text-cyan-400">EXTRAORDINARY.</span>
              </h3>
              <p className="font-sans text-white/70 text-sm leading-relaxed max-w-lg mb-8">
                Available worldwide for commercial video editing, short film directorial assembly, color grading, and AI video synthesis.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-black/60 border border-white/10 p-4 rounded-xl">
                <Mail className="w-5 h-5 text-cyan-400" />
                <div className="flex-1">
                  <div className="text-[10px] text-white/40">DIRECT EMAIL</div>
                  <div className="text-sm font-bold text-white">rohithasekalavya@gmail.com</div>
                </div>
                <button
                  onClick={copyEmail}
                  data-cursor="pointer"
                  className="px-3 py-1.5 rounded bg-white/10 hover:bg-cyan-400 hover:text-black transition-all text-xs font-bold flex items-center gap-1.5"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>

              <div className="flex items-center gap-3 bg-black/60 border border-white/10 p-4 rounded-xl">
                <Phone className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-[10px] text-white/40">DIRECT TELEPHONE</div>
                  <a href="tel:+919640117129" className="text-sm font-bold text-white hover:text-cyan-400 transition-colors">
                    +91 96401 17129
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-black/60 border border-white/10 p-4 rounded-xl">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-[10px] text-white/40">LOCATION & BASE</div>
                  <div className="text-sm font-bold text-white">Hyderabad / Chennai, India (Remote Worldwide)</div>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 flex flex-col justify-center items-center text-center p-8 rounded-2xl bg-white/5 border border-white/10">
            <Film className="w-16 h-16 text-cyan-400 mb-6 animate-pulse" />
            <h4 className="font-mono text-2xl font-black text-white uppercase mb-2">
              ACTION!
            </h4>
            <p className="font-sans text-xs text-white/60 mb-8 max-w-xs">
              Click below to initiate direct email transmission or download full directorial resume credentials.
            </p>
            <a
              href="mailto:rohithasekalavya@gmail.com"
              data-cursor="pointer"
              className="w-full py-4 rounded-full bg-cyan-400 text-black font-bold text-xs tracking-widest uppercase hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all flex items-center justify-center gap-2 mb-3"
            >
              <span>SEND PRODUCTION INQUIRY</span>
              <Send className="w-4 h-4" />
            </a>
            <a
              href="/updated_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className="w-full py-4 rounded-full bg-white/5 border border-white/10 hover:border-white text-white font-bold text-xs tracking-widest uppercase transition-all"
            >
              DOWNLOAD RESUME PDF
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
