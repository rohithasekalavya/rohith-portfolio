import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, Layers, Cpu, Activity } from 'lucide-react';
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
  const projects: VideoProject[] = [
    {
      id: 'featured-1',
      title: 'Melody — Cinematic Narrative Cut',
      src: '/videos/reels/Melody.mov',
      software: ['DaVinci Resolve', 'After Effects', 'Premiere Pro'],
      category: 'Cinematic Recap / Rhythm Cut',
      duration: '01:15',
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
      duration: '00:30',
      client: 'Benita Makeup Academy',
      challenge: 'Hooking the viewer in the first 3 seconds while showcasing product texture and final makeup glow.',
      process: 'Utilized fast stop-motion cuts at the beginning, followed by steady macro shots of model applications. Custom color graded to emphasize gold tones.',
      result: 'Increased Instagram story click-through rates by 45% during winter campaigns.'
    },
    {
      id: 'grid-2',
      title: 'Inter-IIIT Athletics Recap',
      src: '/videos/reels/6th inter iiit.mov',
      software: ['Premiere Pro', 'Lightroom'],
      category: 'Sports Highlight Reel',
      duration: '00:45',
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
      duration: '00:25',
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
      duration: '00:15',
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
      duration: '00:35',
      client: 'Benita Makeup Academy',
      challenge: 'Ensuring skin textures remain authentic while applying color grading to make cosmetics pop.',
      process: 'Subtle masking on portrait areas combined with professional sound overlays mapping cosmetic brush sounds.',
      result: 'Generated 100k+ organic views on Instagram Reels.'
    }
  ];

  const [activeProject, setActiveProject] = useState<VideoProject>(projects[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTimecode, setCurrentTimecode] = useState('00:00:00:00');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const mainVideoRef = useRef<HTMLVideoElement | null>(null);
  const timelineVideoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Sync state with HTML Video actions
  useEffect(() => {
    const video = mainVideoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }, [isPlaying, activeProject]);

  // Sync mute state
  useEffect(() => {
    const video = mainVideoRef.current;
    if (video) {
      video.muted = isMuted;
    }
  }, [isMuted, activeProject]);

  // Sync current timecode
  const handleTimeUpdate = () => {
    const video = mainVideoRef.current;
    if (!video) return;

    const time = video.currentTime;
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    const frames = Math.floor((time % 1) * 24).toString().padStart(2, '0');
    setCurrentTimecode(`00:${minutes}:${seconds}:${frames}`);
  };

  // Video hover scrubbing
  const handleTimelineScrub = (e: React.MouseEvent<HTMLDivElement>, project: VideoProject) => {
    const video = timelineVideoRefs.current[project.id];
    if (!video || !video.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    video.currentTime = percentage * video.duration;
  };

  const handleFullscreenToggle = () => {
    const video = mainVideoRef.current;
    if (!video) return;

    if (!isFullscreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <section 
      id="video-work" 
      className="relative w-full bg-[#050507] border-t border-white/5 py-24 px-6 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 text-left max-w-xl">
          <span className="font-space text-xs tracking-[0.3em] text-cyan-400 uppercase">
            POST-PRODUCTION SHOWCASE
          </span>
          <h2 className="font-cinzel text-4xl lg:text-5xl font-light tracking-tight text-white uppercase">
            Editing Timeline
          </h2>
          <p className="font-satoshi text-sm text-neutral-400 font-light leading-relaxed">
            Click clips on the timeline track below to load them into the master editing viewer. Hover over clip blocks to scrub individual frames.
          </p>
        </div>

        {/* 1. MASTER EDITOR VIEWER CONSOLE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#08080c] border border-white/5 rounded-3xl p-6 shadow-2xl relative">
          
          {/* Left Column: Cinematic Video Monitor (7 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4 w-full">
            {/* Monitor Top Status */}
            <div className="flex justify-between items-center font-timecode text-[10px] text-white/30 px-2 uppercase">
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-neutral-600'}`} />
                <span>MONITOR V1 (MASTER OUT)</span>
              </div>
              <div>3840 x 2160 • 24.00 FPS</div>
              <div className="text-cyan-400 font-semibold">{currentTimecode}</div>
            </div>

            {/* Video Canvas Container (21:9 Widescreen Border) */}
            <div className="relative aspect-[21/9] w-full bg-black rounded-xl overflow-hidden border border-white/5 shadow-inner group">
              <video
                ref={mainVideoRef}
                key={activeProject.id}
                src={getAssetUrl(activeProject.src)}
                loop
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-full h-full object-contain cursor-pointer"
              />
              
              {/* Overlay Glass Play state indicator */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer z-10"
                  >
                    <div className="w-16 h-16 rounded-full glass-panel border border-white/10 flex items-center justify-center text-white hover:scale-105 transition-all">
                      <Play className="w-6 h-6 fill-white ml-1" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Viewer Controls */}
            <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 rounded-xl p-3.5 px-6">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                </button>
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>

              {/* Volume status line */}
              <div className="flex items-center gap-3 w-1/3">
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full ${isMuted ? 'w-0' : 'w-3/4'} bg-cyan-400 transition-all`} />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleFullscreenToggle}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Active Clip Metadata (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 text-left h-full justify-between">
            <div className="flex flex-col gap-4">
              <div>
                <span className="font-space text-[10px] tracking-[0.25em] text-cyan-400/80 uppercase block mb-1">
                  Active Clip Category
                </span>
                <h3 className="font-cinzel text-xl lg:text-2xl font-light text-white leading-tight">
                  {activeProject.title}
                </h3>
              </div>

              {/* Clip Metadata Fields */}
              <div className="flex flex-col gap-4 border-t border-white/5 pt-4">
                <div>
                  <span className="font-space text-[9px] tracking-widest text-neutral-500 uppercase block mb-1">
                    Directorial Client
                  </span>
                  <span className="font-satoshi text-xs font-semibold text-neutral-300">
                    {activeProject.client}
                  </span>
                </div>
                <div>
                  <span className="font-space text-[9px] tracking-widest text-neutral-500 uppercase block mb-1">
                    Post Challenge
                  </span>
                  <p className="font-satoshi text-xs text-neutral-400 font-light leading-relaxed">
                    {activeProject.challenge}
                  </p>
                </div>
                <div>
                  <span className="font-space text-[9px] tracking-widest text-neutral-500 uppercase block mb-1">
                    Workflow Process
                  </span>
                  <p className="font-satoshi text-xs text-neutral-400 font-light leading-relaxed">
                    {activeProject.process}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Software */}
            <div className="border-t border-white/5 pt-4 mt-auto">
              <span className="font-space text-[9px] tracking-widest text-neutral-500 uppercase mb-2 block">
                NLE Software Pipeline
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeProject.software.map((sw, idx) => (
                  <span key={idx} className="bg-white/5 border border-white/5 px-2.5 py-0.5 rounded font-satoshi text-[9px] text-neutral-300 uppercase tracking-wider">
                    {sw}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 2. RESOLVE TIMELINE CLIP BLOCK PANEL */}
        <div className="w-full bg-[#08080c] border border-white/5 rounded-3xl p-6 flex flex-col gap-4 shadow-xl overflow-x-auto">
          
          {/* Timeline Track V2: Titles / Graphics */}
          <div className="flex items-center gap-4 min-w-[900px]">
            <div className="w-24 flex items-center gap-2 text-[10px] font-space text-white/30 uppercase">
              <Layers className="w-3.5 h-3.5 text-cyan-500" />
              <span>TRACK V2</span>
            </div>
            <div className="flex-1 flex gap-4">
              {projects.map((project) => (
                <div 
                  key={`v2-${project.id}`}
                  className={`flex-1 h-6 rounded border border-dashed text-[9px] font-space flex items-center justify-center tracking-widest uppercase transition-all duration-300 ${
                    activeProject.id === project.id
                      ? 'border-cyan-400/40 bg-cyan-950/20 text-cyan-400'
                      : 'border-white/5 text-white/10'
                  }`}
                >
                  FX: Speedramp
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Track V1: Main Video Clips */}
          <div className="flex items-center gap-4 min-w-[900px]">
            <div className="w-24 flex items-center gap-2 text-[10px] font-space text-white/30 uppercase">
              <Cpu className="w-3.5 h-3.5 text-cyan-500" />
              <span>TRACK V1</span>
            </div>
            <div className="flex-1 flex gap-4">
              {projects.map((project) => {
                const isActive = activeProject.id === project.id;
                return (
                  <div
                    key={`v1-${project.id}`}
                    onMouseMove={(e) => handleTimelineScrub(e, project)}
                    onClick={() => {
                      setActiveProject(project);
                      setIsPlaying(true);
                    }}
                    className={`flex-1 aspect-video rounded-lg overflow-hidden border cursor-pointer relative group transition-all duration-300 ${
                      isActive 
                        ? 'border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] scale-[1.02]' 
                        : 'border-white/5 opacity-40 hover:opacity-90'
                    }`}
                  >
                    {/* Hover Scrub Video Container */}
                    <video
                      ref={el => { timelineVideoRefs.current[project.id] = el; }}
                      src={getAssetUrl(project.src)}
                      preload="metadata"
                      muted
                      playsInline
                      className="w-full h-full object-cover pointer-events-none"
                    />

                    {/* Clip Index Name Overlay */}
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/35 transition-all p-2 flex flex-col justify-between">
                      <span className="font-space text-[9px] text-white/40 tracking-wider">
                        {project.duration}
                      </span>
                      <span className="font-space text-[9px] text-white font-bold tracking-wider truncate">
                        {project.id.toUpperCase()}
                      </span>
                    </div>

                    {/* Playhead Overlay Line */}
                    {isActive && (
                      <div className="absolute top-0 bottom-0 left-1/2 w-[1.5px] bg-cyan-400 shadow-[0_0_8px_#06b6d4] z-10 pointer-events-none" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline Track A1: Audio Waveform Tracks */}
          <div className="flex items-center gap-4 min-w-[900px] border-t border-white/5 pt-4">
            <div className="w-24 flex items-center gap-2 text-[10px] font-space text-white/30 uppercase">
              <Activity className="w-3.5 h-3.5 text-cyan-500" />
              <span>TRACK A1</span>
            </div>
            <div className="flex-1 flex gap-4">
              {projects.map((project) => {
                const isActive = activeProject.id === project.id;
                return (
                  <div 
                    key={`a1-${project.id}`}
                    className={`flex-1 h-8 rounded-lg flex items-center justify-center px-4 gap-0.5 transition-all duration-300 ${
                      isActive ? 'bg-cyan-950/20' : 'bg-transparent'
                    }`}
                  >
                    {/* Simulated Waveform lines */}
                    {[8, 14, 20, 10, 18, 12, 24, 6, 16, 10, 22, 14, 8, 12, 18].map((val, idx) => (
                      <div 
                        key={idx}
                        style={{ height: `${val}px` }}
                        className={`w-[2px] rounded-full transition-colors ${
                          isActive ? 'bg-cyan-400' : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default VideoShowcase;
