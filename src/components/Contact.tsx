import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section 
      id="contact" 
      className="relative min-h-[90vh] w-full bg-background py-24 lg:py-32 overflow-hidden px-6 flex items-center justify-center"
    >
      {/* Background Glow */}
      <div className="absolute bottom-10 left-10 w-[35vw] h-[35vw] bg-glow-purple opacity-25 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
        
        {/* Left Side: Contact Information */}
        <div className="lg:col-span-5 text-left flex flex-col justify-between h-full">
          <div>
            <span className="font-space text-xs lg:text-sm tracking-[0.3em] text-neutral-500 uppercase mb-4 block">
              GET IN TOUCH
            </span>
            <h2 className="font-cinzel text-4xl lg:text-5xl font-light tracking-tight text-white mb-8 uppercase">
              Let's Connect
            </h2>
            <p className="font-satoshi text-sm text-neutral-400 font-light leading-relaxed mb-12 max-w-sm select-none">
              Have a short film, visual reel, stop-motion commercial, or campaign edit you want to discuss? Let's build something unforgettable together.
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-all text-neutral-400 group-hover:text-white">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-satoshi text-[10px] tracking-widest text-neutral-500 uppercase">
                  Email Me
                </span>
                <a href="mailto:rohithasekalavya@gmail.com" className="font-satoshi text-sm text-neutral-200 hover:text-white font-medium transition-colors">
                  rohithasekalavya@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-all text-neutral-400 group-hover:text-white">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-satoshi text-[10px] tracking-widest text-neutral-500 uppercase">
                  Call Me
                </span>
                <a href="tel:+919640117129" className="font-satoshi text-sm text-neutral-200 hover:text-white font-medium transition-colors">
                  +91 96401 17129
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-all text-neutral-400 group-hover:text-white">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-satoshi text-[10px] tracking-widest text-neutral-500 uppercase">
                  Location
                </span>
                <span className="font-satoshi text-sm text-neutral-300">
                  Chennai & Hyderabad, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Large Graphic CTA Panel */}
        <div className="lg:col-span-7 w-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel rounded-[2.5rem] p-10 lg:p-16 border border-white/5 shadow-2xl relative bg-white/[0.01] w-full flex flex-col justify-between items-start text-left min-h-[400px]"
          >
            <div>
              <span className="font-space text-xs tracking-[0.25em] text-neutral-500 uppercase mb-6 block">
                COLLABORATION INQUIRIES
              </span>
              <h3 className="font-cinzel text-3xl lg:text-5xl font-light text-white mb-6 leading-tight select-none uppercase">
                Let's make something <span className="text-gradient">legendary</span>.
              </h3>
              <p className="font-satoshi text-sm lg:text-base text-neutral-400 font-light leading-relaxed max-w-lg mb-10 select-none">
                Available for freelance editing contracts, creative direction, AI content campaigns, and music video projects worldwide. Let's discuss your next production.
              </p>
            </div>

            <a
              href="mailto:rohithasekalavya@gmail.com"
              className="group w-full md:w-auto inline-flex items-center justify-center gap-3 bg-white hover:bg-neutral-200 text-black px-8 py-5 rounded-full font-space font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-xl shadow-white/5 active:scale-[0.98]"
            >
              Start a Conversation
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
