import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye, Film } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: string;
}

export const Gallery: React.FC = () => {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const photos: GalleryItem[] = [
    {
      id: 'photo-1',
      src: '/photos/WhatsApp Image 2026-06-27 at 15.44.21.jpeg',
      title: 'Monochromatic Portrait',
      category: 'Portrait'
    },
    {
      id: 'photo-2',
      src: '/photos/WhatsApp Image 2026-06-27 at 15.44.22.jpeg',
      title: 'Cinematic Ambient Frame',
      category: 'Cinematography'
    },
    {
      id: 'photo-3',
      src: '/photos/WhatsApp Image 2026-06-27 at 15.44.18.jpeg',
      title: 'Raindrop Texture Study',
      category: 'Atmospheric'
    },
    {
      id: 'photo-4',
      src: '/photos/WhatsApp Image 2026-06-27 at 15.38.42.jpeg',
      title: 'Shadows & Lighting Outline',
      category: 'Cinematography'
    },
    {
      id: 'photo-5',
      src: '/photos/WhatsApp Image 2026-06-27 at 15.38.43.jpeg',
      title: 'Aesthetic Tone Composition',
      category: 'Still Life'
    },
    {
      id: 'photo-6',
      src: '/photos/WhatsApp Image 2026-06-27 at 15.44.24.jpeg',
      title: 'Collegiate Production Still',
      category: 'Short Film Still'
    },
    {
      id: 'photo-7',
      src: '/photos/WhatsApp Imeage 2026-06-27 at 15.44.24.jpeg',
      title: 'Film Monologue Mood Board',
      category: 'Atmospheric'
    },
    {
      id: 'photo-8',
      src: '/photos/next-env.d.jpeg',
      title: 'Digital Workspace Structure',
      category: 'Tech & Art'
    },
    {
      id: 'photo-9',
      src: '/photos/20240218_205629.jpg',
      title: 'Street Neon Glow',
      category: 'Urban'
    },
    {
      id: 'photo-10',
      src: '/photos/2743554D-F024-418C-945B-90F1BC179740_PNG.jpg',
      title: 'Golden Hour Solitude',
      category: 'Cinematic'
    },
    {
      id: 'photo-11',
      src: '/photos/CAC18D48-7B40-45D9-8E09-5753933DAF74.jpeg',
      title: 'Chasing Shadows',
      category: 'Monochrome'
    },
    {
      id: 'photo-12',
      src: '/photos/IMG_0213.jpg',
      title: 'Silhouetted Horizon',
      category: 'Landscape'
    },
    {
      id: 'photo-13',
      src: '/photos/IMG_1819.JPG',
      title: 'Candid Silhouette',
      category: 'Portrait'
    },
    {
      id: 'photo-14',
      src: '/photos/IMG_20220329_130826.jpg',
      title: 'Atmospheric Dusk',
      category: 'Nature'
    }
  ];

  const activePhoto = activePhotoIdx !== null ? photos[activePhotoIdx] : null;

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx(activePhotoIdx === 0 ? photos.length - 1 : activePhotoIdx - 1);
    }
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx(activePhotoIdx === photos.length - 1 ? 0 : activePhotoIdx + 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="photo-work" 
      className="relative w-full py-24 bg-[#050507] border-b border-white/5 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10 px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-left">
          <div>
            <div className="flex items-center gap-2 font-timecode text-xs text-cyan-400 font-bold tracking-widest uppercase mb-2">
              <Film className="w-4 h-4" />
              <span>DIRECTOR PROFILES & STILL CAROUSEL</span>
            </div>
            <h2 className="font-cinzel text-4xl lg:text-5xl font-light tracking-tight text-white uppercase">
              Filmstrip Gallery
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollRight}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 1. HORIZONTAL DRAGGABLE FILMSTRIP CAROUSEL */}
        <div className="relative w-full py-4 bg-[#08080c] border-y-4 border-dashed border-white/15">
          {/* Top Film Sprockets */}
          <div className="w-full flex justify-between px-2 mb-4">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={`sprocket-top-${i}`} className="w-3.5 h-3.5 bg-black rounded border border-white/5" />
            ))}
          </div>

          {/* Filmstrip Items scroll container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-none px-6 py-2 scroll-smooth"
            style={{ scrollbarWidth: 'none' }}
          >
            {photos.map((photo, idx) => (
              <motion.div
                key={photo.id}
                onClick={() => setActivePhotoIdx(idx)}
                data-cursor="shutter"
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: 'spring', damping: 25, stiffness: 260 }}
                className="flex-shrink-0 w-72 lg:w-96 aspect-[16/10] rounded-xl overflow-hidden glass-panel border border-white/5 shadow-lg relative cursor-pointer group"
              >
                {/* Focus-Pull LOG Image Filter on hover */}
                <img
                  src={getAssetUrl(photo.src)}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-all duration-700 ease-out filter grayscale blur-[3px] contrast-[0.75] saturate-[0.6] group-hover:filter-none group-hover:scale-105"
                />

                {/* Film Overlay Details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="font-space text-[9px] text-cyan-400 tracking-widest uppercase">
                    {photo.category}
                  </span>
                  
                  <div className="flex justify-between items-end">
                    <div className="text-left max-w-[80%]">
                      <h4 className="font-space text-xs font-bold text-white tracking-wide truncate">
                        {photo.title}
                      </h4>
                      <span className="font-timecode text-[9px] text-white/40 uppercase">
                        ISO 400 • F2.8 • Rec.709
                      </span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shadow">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Film Sprockets */}
          <div className="w-full flex justify-between px-2 mt-4">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={`sprocket-bot-${i}`} className="w-3.5 h-3.5 bg-black rounded border border-white/5" />
            ))}
          </div>
        </div>

        {/* 2. CINEMATIC MODAL PREVIEW */}
        <AnimatePresence>
          {activePhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhotoIdx(null)}
              className="fixed inset-0 z-[10002] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 lg:p-12 cursor-zoom-out"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActivePhotoIdx(null)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/15 transition-all z-[10004]"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Indicators */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/15 transition-all z-[10003] hidden md:flex"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNextPhoto}
                className="absolute right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/15 transition-all z-[10003] hidden md:flex"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Central Frame details */}
              <motion.div
                key={activePhoto.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl max-h-[80vh] flex flex-col items-center gap-4 cursor-default"
              >
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                  {/* Widescreen 2.39:1 Letterbox */}
                  <img
                    src={getAssetUrl(activePhoto.src)}
                    alt={activePhoto.title}
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                  
                  {/* Viewfinder lines overlay */}
                  <div className="absolute inset-0 border border-white/10 pointer-events-none" />
                  <div className="absolute top-4 right-4 text-[9px] font-timecode text-cyan-400 bg-black/60 px-2 py-1 rounded">
                    PREVIEW Rec.709
                  </div>
                </div>

                <div className="text-center">
                  <span className="font-space text-[10px] tracking-[0.25em] text-cyan-400 uppercase">
                    {activePhoto.category}
                  </span>
                  <h3 className="font-cinzel text-lg lg:text-xl font-normal text-white mt-1">
                    {activePhoto.title}
                  </h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Gallery;
