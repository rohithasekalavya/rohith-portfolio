import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: string;
}

export const Gallery: React.FC = () => {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

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
    },
    {
      id: 'photo-15',
      src: '/photos/IMG_20220528_205811 (1).jpg',
      title: 'Urban Exploration',
      category: 'Urban'
    },
    {
      id: 'photo-16',
      src: '/photos/IMG_20230206_183309.jpg',
      title: 'Light Leak Contrast',
      category: 'Aesthetic'
    },
    {
      id: 'photo-17',
      src: '/photos/IMG_2148.JPG',
      title: 'Rustic Stillness',
      category: 'Still Life'
    },
    {
      id: 'photo-18',
      src: '/photos/IMG_2561.jpg',
      title: 'Editorial Composition',
      category: 'Portrait'
    },
    {
      id: 'photo-19',
      src: '/photos/IMG_3075.JPG',
      title: 'Warm Vignette',
      category: 'Portrait'
    },
    {
      id: 'photo-20',
      src: '/photos/IMG_5832.JPG',
      title: 'Minimalist Geometry',
      category: 'Aesthetic'
    },
    {
      id: 'photo-21',
      src: '/photos/IMG_7530.JPG',
      title: 'Smoky Radiance',
      category: 'Cinematography'
    },
    {
      id: 'photo-22',
      src: '/photos/IMG_8403.JPG',
      title: 'Golden Dust',
      category: 'Atmospheric'
    },
    {
      id: 'photo-23',
      src: '/photos/IMG_8495.jpg',
      title: 'Cinematic Portraiture',
      category: 'Portrait'
    },
    {
      id: 'photo-24',
      src: '/photos/photo-output.jpeg',
      title: 'Abstract Hue Frame',
      category: 'Cinematography'
    }
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((prev) => (prev === 0 ? photos.length - 1 : (prev as number) - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((prev) => (prev === photos.length - 1 ? 0 : (prev as number) + 1));
    }
  };

  return (
    <section 
      id="gallery" 
      className="relative min-h-screen w-full bg-background py-24 lg:py-32 overflow-hidden px-6"
    >
      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-left mb-16 lg:mb-24">
          <span className="font-space text-xs lg:text-sm tracking-[0.3em] text-neutral-500 uppercase mb-4 block">
            VISUAL PORTFOLIO
          </span>
          <h2 className="font-space text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Photo Gallery
          </h2>
        </div>

        {/* Pinterest Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
          {photos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              onClick={() => setActivePhotoIdx(idx)}
              className="relative rounded-2xl overflow-hidden glass-panel border border-white/5 cursor-zoom-in group break-inside-avoid"
            >
              {/* Glass Reflection sweep */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.04] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

              <img 
                src={getAssetUrl(photo.src)} 
                alt={photo.title}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
              />

              {/* Cover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-6 text-left" />

              {/* Content overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between items-start z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded font-satoshi text-[9px] uppercase tracking-wider text-neutral-300">
                  {photo.category}
                </span>

                <div className="text-left mt-auto">
                  <h4 className="font-space text-base font-bold text-white mb-1">
                    {photo.title}
                  </h4>
                  <span className="font-satoshi text-[9px] text-neutral-400 uppercase tracking-widest flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> Open Lightbox
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhotoIdx(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhotoIdx(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all z-50"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev Image Button */}
            <button
              onClick={handlePrev}
              className="absolute left-6 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all z-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Image Button */}
            <button
              onClick={handleNext}
              className="absolute right-6 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all z-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Centered Image */}
            <motion.div
              key={activePhotoIdx}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-4xl max-h-[80vh] flex flex-col items-center justify-center pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getAssetUrl(photos[activePhotoIdx].src)}
                alt={photos[activePhotoIdx].title}
                className="max-w-full max-h-[75vh] object-contain rounded-xl border border-white/10 shadow-2xl"
              />

              <div className="absolute -bottom-16 left-0 right-0 text-center flex flex-col gap-1 select-none">
                <span className="font-space text-lg font-bold text-white">
                  {photos[activePhotoIdx].title}
                </span>
                <span className="font-satoshi text-xs text-neutral-400 uppercase tracking-widest">
                  {photos[activePhotoIdx].category}
                </span>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Gallery;
