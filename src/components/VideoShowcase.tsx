import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, X, Film, Sliders, ArrowUpRight } from 'lucide-react';

interface VideoProject {
  id: string;
  title: string;
  src: string;
  poster?: string;
  software: string[];
  category: 'Commercial' | 'Reel' | 'Narrative' | 'AI Video';
  duration: string;
  client: string;
  challenge: string;
  process: string;
  result: string;
  resolution: string;
  isLandscape?: boolean;
}

export const VideoShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);
  const [mutedStates, setMutedStates] = useState<{ [key: string]: boolean }>({});
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const projects: VideoProject[] = [
    {
      id: 'melody-narrative',
      title: 'Melody — Cinematic Pacing & Visual Rhythm',
      src: '/videos/reels/Glimpse.MOV',
      poster: '/photos/paradise_poster.png',
      software: ['DaVinci Resolve Studio', 'After Effects', 'ProRes 422'],
      category: 'Narrative',
      duration: '1:15',
      client: 'Independent Directorial Cut',
      challenge: 'Unifying subtle emotional storytelling with high-octane musical beat drops without jarring transitions.',
      process: 'Built custom audio waveform timelines before editing footage. Used optical flow frame interpolation, speed ramping, and soft lens blur dissolves.',
      result: 'Achieved an ethereal, high-engagement cinematic cut praised for seamless visual flow.',
      resolution: '4K DCI 60FPS',
      isLandscape: true
    },
    {
      id: 'bridal-glow',
      title: 'Benita Makeup — High-End Bridal Campaign',
      src: '/videos/benita/copy_45ED6158-F6C3-4FEC-9C1C-6A60123E959F.mov',
      poster: '/photos/love_today_poster.png',
      software: ['DaVinci Resolve', 'Premiere Pro', 'CapCut Pro'],
      category: 'Commercial',
      duration: '0:30',
      client: 'Benita Makeup Academy',
      challenge: 'Capturing viewer attention in the first 2 seconds while accentuating skin radiance and cosmetic textures.',
      process: 'Combined fast macro cuts at the hook, customized warm gold color curves, and rhythmic sound effects for brush strokes.',
      result: 'Drove 45% lift in Instagram engagement and booking inquiries.',
      resolution: '1080x1920 Vertical HD'
    },
    {
      id: 'inter-iiit-athletics',
      title: 'Inter-IIIT Athletics — High-Octane Highlight',
      src: '/videos/reels/6th inter iiit.mov',
      poster: '/photos/IMG_2561.jpg',
      software: ['Premiere Pro', 'DaVinci Resolve', 'Lightroom'],
      category: 'Reel',
      duration: '0:45',
      client: 'IIITDM Athletics Dept.',
      challenge: 'Converting raw, handheld sports footage into a cinematic stadium highlight reel.',
      process: 'Applied gyro-stabilization, heavy stadium night lighting correction, speed ramps, and bass-driven flash cuts.',
      result: 'Selected as the official highlight video for the Inter-IIIT Athletics 2025 event.',
      resolution: '4K DCI 60FPS',
      isLandscape: true
    },
    {
      id: 'fast-beat-rhythm',
      title: 'Fast Beat — Kinetic Speed Ramp Vignette',
      src: '/videos/reels/Fast beat.mov',
      poster: '/photos/20240218_205629.jpg',
      software: ['Premiere Pro', 'After Effects'],
      category: 'Reel',
      duration: '0:15',
      client: 'Experimental Cut',
      challenge: 'Executing 24fps micro-frame cuts synchronized to ultra-fast beats without visual disorientation.',
      process: 'Mapped frame cuts directly to frequency audio spikes with optical flow speed ramps and motion blur vectors.',
      result: 'Demonstrates ultra-precise frame-accurate editing velocity.',
      resolution: '4K DCI 60FPS',
      isLandscape: true
    },
    {
      id: 'glimpse-cut',
      title: 'Glimpse — Atmospheric Short Film Teaser',
      src: '/videos/reels/Glimpse.MOV',
      poster: '/photos/paradise_poster.png',
      software: ['DaVinci Resolve', 'CapCut Pro'],
      category: 'Narrative',
      duration: '0:40',
      client: 'Team Kanyarasi',
      challenge: 'Evoking dramatic suspense and mystery within a short 40-second trailer.',
      process: 'Color graded with deep cyan shadows and warm skin tones, layered ambient sound design, and controlled lens breathing.',
      result: 'Screened at campus film festival screenings with positive directorial acclaim.',
      resolution: '4K DCI 24FPS',
      isLandscape: true
    },
    {
      id: 'trance-edit',
      title: 'Trance — Neon Cyberpunk Visual Flow',
      src: '/videos/reels/Trance.mov',
      poster: '/photos/IMG_8495.jpg',
      software: ['After Effects', 'DaVinci Resolve'],
      category: 'AI Video',
      duration: '0:35',
      client: 'AI Video Research Project',
      challenge: 'Merging generative video clips from Kling AI & RunwayML with human choreography.',
      process: 'Synthesized AI motion masks, applied film grain texture overlays, and matched camera motion vectors.',
      result: 'Showcases cutting-edge AI video generation and post-synthesis workflow.',
      resolution: '4K DCI 60FPS'
    },
    {
      id: 'benita-masterclass',
      title: 'Benita Masterclass — Commercial Ad Cut',
      src: '/videos/benita/copy_4B17AB60-A957-495D-B703-ECCA088D6982.mov',
      poster: '/photos/artly_poster.png',
      software: ['CapCut Pro', 'Premiere Pro'],
      category: 'Commercial',
      duration: '0:25',
      client: 'Benita Makeup Academy',
      challenge: 'Condensing a 4-hour live masterclass into a 25-second conversion-focused ad.',
      process: 'High-tempo montage structure with kinetic subtitle callouts, punchy sound design, and gold color grading.',
      result: 'Masterclass seats fully sold out within 72 hours of video launch.',
      resolution: '1080x1920 Vertical HD'
    }
  ];

  const categories = ['ALL', 'Commercial', 'Reel', 'Narrative', 'AI Video'];

  const filteredProjects = activeCategory === 'ALL'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const toggleMute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[id];
    if (vid) {
      vid.muted = !vid.muted;
      setMutedStates(prev => ({ ...prev, [id]: vid.muted }));
    }
  };

  const handleMouseEnter = (id: string) => {
    const vid = videoRefs.current[id];
    if (vid) {
      vid.play().catch(() => {});
    }
  };

  const handleMouseLeave = (id: string) => {
    const vid = videoRefs.current[id];
    if (vid) {
      vid.pause();
    }
  };

  return (
    <section id="video-work" className="relative w-full py-28 bg-[#050507] px-4 lg:px-12 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 font-timecode text-xs text-cyan-400 font-bold tracking-widest uppercase mb-2">
              <Film className="w-4 h-4" />
              <span>SELECTED DIRECTORIAL & EDITORIAL CUTS</span>
            </div>
            <h2 className="font-mono text-4xl lg:text-7xl font-black tracking-tight text-white uppercase">
              FEATURED <span className="text-cyan-400">PROJECTS</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 font-timecode text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-cursor="pointer"
                className={`px-4 py-2 rounded-full border transition-all ${
                  activeCategory === cat
                    ? 'bg-white text-black border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                    : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat === 'ALL' ? 'ALL WORKS' : cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                onClick={() => setSelectedVideo(project)}
                onMouseEnter={() => handleMouseEnter(project.id)}
                onMouseLeave={() => handleMouseLeave(project.id)}
                data-cursor="play"
                className={`relative rounded-2xl overflow-hidden glass-panel border border-white/10 group cursor-pointer shadow-[0_15px_40px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] ${
                  project.isLandscape ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/5]'
                }`}
              >
                <video
                  ref={el => { videoRefs.current[project.id] = el; }}
                  src={project.src}
                  poster={project.poster}
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />

                <div className="absolute top-4 left-4 right-4 flex justify-between items-center font-timecode text-[10px] z-20 pointer-events-none">
                  <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-cyan-400 font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-white/80 font-bold">
                      {project.duration}
                    </span>
                    <button
                      onClick={(e) => toggleMute(project.id, e)}
                      className="p-1.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-white hover:text-cyan-400 pointer-events-auto transition-colors"
                    >
                      {mutedStates[project.id] ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-6 flex flex-col justify-end transition-opacity duration-300">
                  <span className="font-timecode text-[10px] text-cyan-400 tracking-widest uppercase block mb-1">
                    CLIENT: {project.client}
                  </span>
                  <h3 className="font-mono text-xl lg:text-2xl font-black text-white tracking-tight uppercase group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-3 font-timecode text-[10px] text-white/50">
                    {project.software.map(sw => (
                      <span key={sw} className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                        {sw}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 lg:p-12 overflow-y-auto"
          >
            <div className="relative max-w-5xl w-full bg-[#0a0a0f] border border-white/15 rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)] my-auto font-timecode">
              
              <button
                onClick={() => setSelectedVideo(null)}
                data-cursor="pointer"
                className="absolute top-6 right-6 z-30 p-3 rounded-full bg-white/10 hover:bg-red-500 text-white hover:text-black transition-all border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/9] w-full bg-black">
                <video
                  src={selectedVideo.src}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 lg:p-10">
                <div className="flex flex-wrap justify-between items-start gap-4 pb-6 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-cyan-400 font-bold mb-2">
                      <span className="px-2.5 py-1 rounded bg-cyan-400/10 border border-cyan-400/30">
                        {selectedVideo.category}
                      </span>
                      <span>RESOLUTION: {selectedVideo.resolution}</span>
                    </div>
                    <h3 className="font-mono text-2xl lg:text-4xl font-black text-white uppercase">
                      {selectedVideo.title}
                    </h3>
                  </div>
                  <div className="text-right text-xs text-white/50">
                    <div>CLIENT: {selectedVideo.client}</div>
                    <div>DURATION: {selectedVideo.duration}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 text-xs">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-cyan-400 font-bold tracking-wider block mb-2">01. THE CHALLENGE</span>
                    <p className="text-white/70 font-sans leading-relaxed">{selectedVideo.challenge}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-cyan-400 font-bold tracking-wider block mb-2">02. EDITING WORKFLOW</span>
                    <p className="text-white/70 font-sans leading-relaxed">{selectedVideo.process}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-cyan-400 font-bold tracking-wider block mb-2">03. IMPACT & RESULTS</span>
                    <p className="text-white/70 font-sans leading-relaxed">{selectedVideo.result}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-white/50 pt-4 border-t border-white/10">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span>SOFTWARE & ENGINES USED:</span>
                  {selectedVideo.software.map(s => (
                    <span key={s} className="px-2 py-1 rounded bg-white/10 text-white font-bold">
                      {s}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default VideoShowcase;
