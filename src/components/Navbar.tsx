import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Services', id: 'services' },
    { label: 'Video Work', id: 'video-work' },
    { label: 'Skills', id: 'skills' },
    { label: 'Contact', id: 'contact' },
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
      // Offset scroll for floating navbar
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
        className="fixed top-6 left-0 right-0 z-50 max-w-7xl mx-auto px-6"
      >
        <div className="glass-navbar rounded-full px-6 py-4 flex items-center justify-between shadow-2xl">
          {/* Logo */}
          <div 
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="font-space text-xl font-bold tracking-tight text-white transition-colors duration-300">
              RA<span className="text-neutral-500">.</span>
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-satoshi text-xs uppercase tracking-wider relative py-1 transition-colors duration-300 ${
                  activeSection === item.id 
                    ? 'text-white font-medium' 
                    : 'text-neutral-400 hover:text-white font-normal'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeDot"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Resume CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="updated_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 bg-white hover:bg-neutral-200 text-black px-5 py-2.5 rounded-full font-satoshi font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-md shadow-white/5"
            >
              Resume
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href="updated_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-3.5 py-1.5 rounded-full font-satoshi font-bold text-[10px] tracking-wider uppercase"
            >
              Resume
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-1 hover:text-neutral-400 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[90px] z-40 bg-background/95 backdrop-blur-xl lg:hidden flex flex-col p-8 justify-between border-t border-white/5"
          >
            <div className="flex flex-col gap-6 mt-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left font-space text-3xl font-bold tracking-tight py-2 transition-colors ${
                    activeSection === item.id ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
              <span className="font-space text-xs tracking-widest text-neutral-500 uppercase">
                GET IN TOUCH
              </span>
              <a href="mailto:rohithasekalavya@gmail.com" className="font-satoshi text-lg text-white">
                rohithasekalavya@gmail.com
              </a>
              <a href="tel:+919640117129" className="font-satoshi text-neutral-400">
                +91 96401 17129
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
