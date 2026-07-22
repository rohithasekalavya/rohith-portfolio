import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';

// Components
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import VideoShowcase from './components/VideoShowcase';
import ColorGradingStudio from './components/ColorGradingStudio';
import CreativeProjects from './components/CreativeProjects';
import Experience from './components/Experience';
import Services from './components/Services';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [letterboxActive, setLetterboxActive] = useState(false);
  const [audioActive, setAudioActive] = useState(false);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isLoading]);

  // Track Active Section on scroll
  useEffect(() => {
    if (isLoading) return;

    const sections = [
      'home',
      'about',
      'video-work',
      'lut-studio',
      'creative-projects',
      'experience',
      'services',
      'skills',
      'achievements',
      'gallery',
      'contact'
    ];

    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-40% 0px -50% 0px' }
      );

      observer.observe(el);
      return { el, observer };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [isLoading]);

  return (
    <div className={`min-h-screen bg-[#050507] font-sans ${letterboxActive ? 'letterbox-active' : ''}`}>
      {/* Reticle Custom Cursor */}
      <CustomCursor />

      {/* Cinematic Film Leader Loader */}
      <Loader onComplete={() => setIsLoading(false)} />

      {/* 2.39:1 Anamorphic Letterbox Overlay */}
      <div className="letterbox-overlay" />

      {/* Film Grain Texture */}
      <div className="film-grain" />

      {!isLoading && (
        <div className="relative w-full min-h-screen bg-[#050507]">
          {/* Glass Dock Navbar */}
          <Navbar
            activeSection={activeSection}
            letterboxActive={letterboxActive}
            onToggleLetterbox={() => setLetterboxActive(!letterboxActive)}
            audioActive={audioActive}
            onToggleAudio={() => setAudioActive(!audioActive)}
          />

          {/* Main Content Flow */}
          <main>
            <Hero />
            <About />
            <VideoShowcase />
            <ColorGradingStudio />
            <CreativeProjects />
            <Experience />
            <Services />
            <Skills />
            <Achievements />
            <Gallery />
            <Contact />
          </main>

          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
