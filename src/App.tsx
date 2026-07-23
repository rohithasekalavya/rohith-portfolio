import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';

// Components
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Services from './components/Services';
import VideoShowcase from './components/VideoShowcase';
import CreativeProjects from './components/CreativeProjects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

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

    const sections = ['home', 'about', 'experience', 'services', 'video-work', 'skills', 'contact'];
    
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
              if (!isAtBottom || id === 'contact') {
                setActiveSection(id);
              }
            }
          });
        },
        {
          rootMargin: '-40% 0px -50% 0px', // Trigger when section hits middle of viewport
        }
      );

      observer.observe(el);
      return { el, observer };
    });

    const handleScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (isAtBottom) {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  return (
    <>
      {/* Custom Cursor Overlay */}
      <CustomCursor />

      {/* Entry Loader Screen */}
      <Loader onComplete={() => setIsLoading(false)} />

      {/* Main Page Content */}
      {!isLoading && (
        <div className="relative w-full min-h-screen bg-background selection:bg-white selection:text-black">
          {/* Static global textures */}
          <div className="noise-overlay" />

          {/* Floating Glass Navbar */}
          <Navbar activeSection={activeSection} />

          {/* Component Sections */}
          <main>
            <Hero />
            <About />
            <Experience />
            <Services />
            <VideoShowcase />
            <CreativeProjects />
            <Skills />
            <Achievements />
            <Gallery />
            <Testimonials />
            <Contact />
          </main>

          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
