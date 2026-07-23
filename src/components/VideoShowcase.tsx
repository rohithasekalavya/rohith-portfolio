import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, X, ChevronRight } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

interface VideoProject {
  id: string;
  title: string;
  src: string;
  software: string[];
  category: string;
  duration: string;
  client: string;
  challenge: string;
  process: string;
  result: string;
  isLandscape?: boolean;
}

export const VideoShowcase: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoProject | null>(null);
  const [mutedStates, setMutedStates] = useState<{ [key: string]: boolean }>({});
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const projects: VideoProject[] = [
    {
      id: 'featured-1',
      title: 'Melody — Cinematic Narrative Cut',
      src: '/videos/reels/Melody.mov',
      software: ['DaVinci Resolve', 'After Effects', 'Premiere Pro'],
      category: 'Cinematic Recap / Rhythm Cut',
      duration: '1:15',
      client: 'Independent Creator',
      challenge: 'Unifying slow pacing with sudden high-energy musical changes while maintaining narrative pacing.',
      process: 'Created a customized multi-layered audio timeline before cutting video. Synchronized transition points using customized speed ramps, optical flow, and subtle visual warps.',
      result: 'An immersive cinematic cut with buttery smooth flow and heavy visual impact.',
      isLandscape: true
    },
    {
      id: 'grid-1',
      title: 'Bridal Glow Campaign',
      src: '/videos/benita/copy_45ED6158-F6C3-4FEC-9C1C-6A60123E959F.mov',
      software: ['CapCut', 'Premiere Pro'],
      category: 'Cosmetics / Commercial Ad',
      duration: '0:30',
      client: 'Benita Makeup Academy',
      challenge: 'Hooking the viewer in the first 3 seconds while showcasing product texture and final makeup glow.',
      process: 'Utilized fast stop-motion cuts at the beginning, followed by steady macro shots of model applications. Custom color graded to emphasize gold tones.',
      result: 'Increased Instagram story click-through rates by 45% during winter campaigns.'
    },
    {
      id: 'grid-2',
      title: 'Inter-IIIT Athletics recap',
      src: '/videos/reels/6th inter iiit.mov',
      software: ['Premiere Pro', 'Lightroom'],
      category: 'Sports Highlight Reel',
      duration: '0:45',
      client: 'IIITDM Athletics',
      challenge: 'Conveying high-energy competitive spirits through shaky raw footage taken under variable stadium lights.',
      process: 'Applied software stabilization, heavy color correction to uniform the fields, and synchronized editing transitions to high-beat bass drops.',
      result: 'Featured on the institutional official website as the premier athletic recap video of 2025.',
      isLandscape: true
    },
    {
      id: 'grid-3',
      title: 'Benita Academy Masterclass Ad',
      src: '/videos/benita/copy_4B17AB60-A957-495D-B703-ECCA088D6982.mov',
      software: ['DaVinci Resolve', 'CapCut'],
      category: 'Educational Campaign',
      duration: '0:25',
      client: 'Benita Makeup Academy',
      challenge: 'Condensing a 4-hour live masterclass into a 25-second commercial that sells training seats.',
      process: 'Created a high-tempo sequence mapping student reactions, tutor details, and final model results with typography overlays.',
      result: 'Resulted in a fully booked training slot within 72 hours of video launch.'
    },
    {
      id: 'grid-4',
      title: 'Fast Beat — Rhythm Vignette',
      src: '/videos/reels/Fast beat.mov',
      software: ['Premiere Pro', 'After Effects'],
      category: 'Experimental Flow Edit',
      duration: '0:15',
      client: 'Personal Project',
      challenge: 'Testing ultra-fast frames synchronization (24 frames per second transitions) without causing visual fatigue.',
      process: 'Used precise markers on audio peaks and implemented custom visual overlays to tie matching colors together across cuts.',
      result: 'A satisfying, high-fidelity micro-video showcasing speed ramp expertise.',
      isLandscape: true
    },
    {
      id: 'grid-5',
      title: 'Professional Glam Tutorial',
      src: '/videos/benita/copy_C42F0E33-6147-4535-863D-293ABA179252.mov',
      software: ['CapCut', 'Lightroom'],
      category: 'Beauty Tutorial Reel',
      duration: '0:35',
      client: 'Benita Makeup Academy',
      challenge: 'Ensuring skin textures remain authentic while applying color grading to make cosmetics pop.',
      process: 'Subtle masking on portrait areas combined with professional sound overlays mapping cosmetic brush sounds.',
      result: 'Generated 100k+ organic views on Instagram Reels.'
    },
    {
      id: 'grid-6',
      title: 'Temple Edit — Cultural Vignette',
      src: '/videos/reels/Temple edit.mov',
      software: ['DaVinci Resolve', 'Lightroom'],
      category: 'Travel Documentary Cut',
      duration: '0:40',
      client: 'Travel Blogger',
      challenge: 'Conveying spiritual calmness while keeping a modern visual interest using cinematic pans.',
      process: 'Utilized ambient noise overlays (bells, chants) with slow cross-dissolves, graded in deep cinematic teal and gold.',
      result: 'Recognized for excellent pacing and atmospheric sound staging by the client.',
      isLandscape: true
    },
    {
      id: 'grid-7',
      title: 'Trance Flow — Visual Beats',
      src: '/videos/reels/Trance.mov',
      software: ['Premiere Pro', 'After Effects'],
      category: 'VFX / Concept Cut',
      duration: '0:30',
      client: 'Musician Promo',
      challenge: 'Syncing abstract visual cues to deep progressive electronic beats.',
      process: 'Integrated visual glitch templates, dynamic neon glows, and custom scale pulses responding to bass triggers.',
      result: 'Used as official visual backdrop for the artist\'s club launch set.',
      isLandscape: true
    },
    {
      id: 'grid-8',
      title: 'Behind the Scenes Masterclass',
      src: '/videos/benita/copy_BACA0A10-E45D-4C9C-8299-CDFE17482F8A.mov',
      software: ['CapCut', 'Canva'],
      category: 'Social Event Highlight',
      duration: '0:45',
      client: 'Benita Makeup Academy',
      challenge: 'Capturing candid raw studio moments and turning them into an inviting brand story.',
      process: 'Edited with smooth whip pans, soft lighting focus, and client voiceover highlights.',
      result: 'Boosted academy enrollment inquiry rates by 35%.'
    },
    {
      id: 'grid-9',
      title: 'Random Thoughts — Cinematic Diary',
      src: '/videos/reels/Random Thoughts.mov',
      software: ['DaVinci Resolve', 'Premiere Pro'],
      category: 'Vlog / Short Film',
      duration: '1:00',
      client: 'Personal Project',
      challenge: 'Crafting a visual monologue exploring emotional solitude and daily life.',
      process: 'Mixed high contrast monochrome color grading with ambient natural foley sound effects.',
      result: 'Independently released short that established personal branding style.',
      isLandscape: true
    }
  ];

  // Helper to toggle mute on a specific card
  const toggleMute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRefs.current[id];
    if (video) {
      const currentMuted = !video.muted;
      video.muted = currentMuted;
      setMutedStates(prev => ({ ...prev, [id]: currentMuted }));
    }
  };

  // Initialize all states as muted
  useEffect(() => {
    const initialMutes: { [key: string]: boolean } = {};
    projects.forEach(p => {
      initialMutes[p.id] = true;
    });
    setMutedStates(initialMutes);
  }, []);

  // Lock body scroll when showcase modal is open
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeVideo]);

  const openModal = (project: VideoProject) => {
    // Mute and pause any playing preview video
    Object.keys(videoRefs.current).forEach(key => {
      const vid = videoRefs.current[key];
      if (vid) vid.pause();
    });
    setActiveVideo(project);
  };

  const closeModal = () => {
    setActiveVideo(null);
    // Resume only the featured video preview (index 0), as grid videos play on hover
    setTimeout(() => {
      const featuredId = projects[0]?.id;
      if (featuredId) {
        const featuredVideo = videoRefs.current[featuredId];
        if (featuredVideo) {
          featuredVideo.play().catch(() => {});
        }
      }
    }, 100);
  };

  const handleNextProject = () => {
    if (!activeVideo) return;
    const currentIndex = projects.findIndex(p => p.id === activeVideo.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setActiveVideo(projects[nextIndex]);
  };

  return (
    <section 
      id="video-work" 
      className="relative min-h-screen w-full bg-background py-24 lg:py-32 overflow-hidden px-6"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] bg-glow-purple opacity-10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-left mb-16 lg:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="font-space text-xs lg:text-sm tracking-[0.3em] text-neutral-500 uppercase mb-4 block">
              PORTFOLIO SHOWCASE
            </span>
            <h2 className="font-space text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Featured Edits
            </h2>
          </div>
          <span className="font-satoshi text-xs text-neutral-500 max-w-xs text-left md:text-right font-light leading-relaxed">
            Hover cards for audio. Click any video for details, process workflows, and client feedback.
          </span>
        </div>

        {/* 1. Featured Video (Big Widescreen Mockup) */}
        <div className="mb-16">
          {projects.slice(0, 1).map((project) => {
            const isMuted = mutedStates[project.id] !== false;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openModal(project)}
                className={`relative mx-auto rounded-[2.5rem] overflow-hidden glass-panel border border-white/5 shadow-2xl cursor-pointer group ${
                  project.isLandscape ? 'max-w-5xl aspect-video' : 'max-w-md aspect-[9/16]'
                }`}
              >
                {/* Simulated Glass Highlight Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <video
                  ref={el => { videoRefs.current[project.id] = el; }}
                  src={getAssetUrl(project.src)}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
                />

                {/* Grid Overlay Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-black/10 to-transparent opacity-80" />

                {/* Floating controls */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 pointer-events-none">
                  {/* Top: Badges and Mute */}
                  <div className="flex justify-between items-center w-full">
                    <span className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full font-satoshi text-[10px] uppercase tracking-wider font-semibold text-white">
                      Featured Work
                    </span>
                    <button
                      onClick={(e) => toggleMute(project.id, e)}
                      className="pointer-events-auto w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white border border-white/10 hover:border-white/30 transition-all active:scale-95"
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Bottom: Title & Software */}
                  <div className="text-left max-w-md">
                    <span className="font-space text-[10px] tracking-[0.2em] text-neutral-400 uppercase mb-2 block">
                      {project.category} • {project.duration}
                    </span>
                    <h3 className="font-space text-lg lg:text-xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.software.map((sw, idx) => (
                        <span key={idx} className="bg-white/5 border border-white/5 px-3 py-1 rounded-full font-satoshi text-[9px] uppercase tracking-wider text-neutral-300">
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 2. Grid of Other Videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(1).map((project) => {
            const isMuted = mutedStates[project.id] !== false;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                onClick={() => openModal(project)}
                onMouseEnter={() => {
                  const video = videoRefs.current[project.id];
                  if (video) video.play().catch(() => {});
                }}
                onMouseLeave={() => {
                  const video = videoRefs.current[project.id];
                  if (video) {
                    video.pause();
                    video.currentTime = 0;
                  }
                }}
                className={`relative rounded-2xl overflow-hidden glass-panel border border-white/5 cursor-pointer group transition-all duration-300 ${
                  project.isLandscape ? 'md:col-span-2 aspect-video' : 'col-span-1 aspect-[9/16]'
                }`}
              >
                {/* Video Container (Preserves natural aspect ratio of each video file) */}
                <div className="relative w-full h-full overflow-hidden">
                  <video
                    ref={el => { videoRefs.current[project.id] = el; }}
                    src={getAssetUrl(project.src)}
                    preload="metadata"
                    muted={isMuted}
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-black/20 to-transparent opacity-85" />
                  
                  {/* Floating Action */}
                  <div className="absolute inset-0 p-4 lg:p-6 flex flex-col justify-between pointer-events-none z-10">
                    <div className="flex justify-between items-center w-full">
                      <span className="bg-black/40 backdrop-blur-md border border-white/5 px-3 py-1 rounded-full font-satoshi text-[9px] uppercase tracking-wider text-neutral-300">
                        {project.category}
                      </span>
                      <button
                        onClick={(e) => toggleMute(project.id, e)}
                        className="pointer-events-auto w-8 h-8 rounded-full glass-panel flex items-center justify-center text-white border border-white/10 hover:border-white/30 transition-all active:scale-95"
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="text-left mt-auto">
                      <h4 className="font-space text-lg font-bold text-white mb-2 leading-snug">
                        {project.title.replace(' —', '')}
                      </h4>
                      <span className="font-satoshi text-[9px] tracking-wider text-neutral-400 uppercase">
                        {project.duration} • {project.client}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Cinematic Details Fullscreen Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-2xl overflow-y-auto px-6 py-12 flex items-center justify-center"
          >
            {/* Close trigger on background click */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={closeModal} />

            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-6xl w-full bg-[#111111] rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 z-10 my-auto"
            >
              {/* Left Column: Widescreen Video Player */}
              <div className="lg:col-span-7 bg-black flex items-center justify-center relative aspect-video lg:aspect-auto min-h-[300px] lg:min-h-[500px]">
                 <video
                   src={activeVideo ? getAssetUrl(activeVideo.src) : ''}
                   controls
                   autoPlay
                   className="w-full h-full object-contain"
                 />
              </div>

              {/* Right Column: Case Details */}
              <div className="lg:col-span-5 p-8 lg:p-12 text-left flex flex-col justify-between">
                
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                <div>
                  <span className="font-space text-xs tracking-widest text-neutral-500 uppercase block mb-2">
                    {activeVideo.category} • {activeVideo.duration}
                  </span>
                  
                  <h3 className="font-space text-2xl lg:text-3xl font-bold text-white mb-6 pr-8 leading-snug">
                    {activeVideo.title}
                  </h3>

                  {/* Details Block */}
                  <div className="space-y-6 mb-8">
                    <div>
                      <span className="font-satoshi text-[10px] tracking-wider text-neutral-500 uppercase block mb-1">
                        Client
                      </span>
                      <span className="font-satoshi text-sm text-neutral-300 font-medium">
                        {activeVideo.client}
                      </span>
                    </div>

                    <div>
                      <span className="font-satoshi text-[10px] tracking-wider text-neutral-500 uppercase block mb-1">
                        The Challenge
                      </span>
                      <p className="font-satoshi text-sm text-neutral-400 font-light leading-relaxed">
                        {activeVideo.challenge}
                      </p>
                    </div>

                    <div>
                      <span className="font-satoshi text-[10px] tracking-wider text-neutral-500 uppercase block mb-1">
                        Production & Workflow
                      </span>
                      <p className="font-satoshi text-sm text-neutral-400 font-light leading-relaxed">
                        {activeVideo.process}
                      </p>
                    </div>

                    <div>
                      <span className="font-satoshi text-[10px] tracking-wider text-neutral-500 uppercase block mb-1">
                        Final Delivery Result
                      </span>
                      <p className="font-satoshi text-sm text-neutral-400 font-light leading-relaxed">
                        {activeVideo.result}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Metadata & Next Link */}
                <div className="border-t border-white/5 pt-6 mt-6 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="font-satoshi text-[9px] tracking-widest text-neutral-500 uppercase mb-1.5">
                      Software Used
                    </span>
                    <div className="flex gap-1.5">
                      {activeVideo.software.map((sw, idx) => (
                        <span key={idx} className="bg-white/5 px-2 py-0.5 rounded font-satoshi text-[9px] text-neutral-300 border border-white/5">
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleNextProject}
                    className="flex items-center gap-1 bg-white text-black pl-4 pr-3 py-2.5 rounded-full font-satoshi font-semibold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-colors active:scale-95"
                  >
                    Next Cut
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoShowcase;
