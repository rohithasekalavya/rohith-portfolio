import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, Aperture } from 'lucide-react';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: string;
  exif: string;
}

export const Gallery: React.FC = () => {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  const photos: GalleryItem[] = [
    {
      id: 'photo-1',
      src: '/photos/WhatsApp Image 2026-06-27 at 15.44.21.jpeg',
      title: 'Monochromatic Director Portrait',
      category: 'Portraiture',
      exif: '50mm • f/1.8 • 1/1000s • ISO 100'
    },
    {
      id: 'photo-2',
      src: '/photos/WhatsApp Image 2026-06-27 at 15.44.22.jpeg',
      title: 'Cinematic Ambient Frame',
      category: 'Cinematography',
      exif: '35mm • f/2.0 • 1/500s • ISO 200'
    },
    {
      id: 'photo-3',
      src: '/photos/WhatsApp Image 2026-06-27 at 15.44.18.jpeg',
      title: 'Atmospheric Rain Study',
      category: 'Atmospheric',
      exif: '85mm • f/1.4 • 1/2000s • ISO 100'
    },
    {
      id: 'photo-4',
      src: '/photos/WhatsApp Image 2026-06-27 at 15.38.42.jpeg',
      title: 'Shadow & Chiaroscuro Outline',
      category: 'Cinematography',
      exif: '24mm • f/2.8 • 1/250s • ISO 400'
    },
    {
      id: 'photo-5',
      src: '/photos/20240218_205629.jpg',
      title: 'Urban Neon Vignette',
      category: 'Urban',
      exif: '50mm • f/1.4 • 1/125s • ISO 800'
    },
    {
      id: 'photo-6',
      src: '/photos/IMG_2561.jpg',
      title: 'Editorial Composition',
      category: 'Portraiture',
      exif: '85mm • f/1.8 • 1/1000s • ISO 100'
    },
    {
      id: 'photo-7',
      src: '/photos/IMG_8495.jpg',
      title: 'Cinematic Stills Frame',
      category: 'Short Film Still',
      exif: '35mm • f/1.4 • 1/1600s • ISO 100'
    },
    {
      id: 'photo-8',
      src: '/photos/IMG_0213.jpg',
      title: 'Horizon Silhouette Study',
      category: 'Atmospheric',
      exif: '50mm • f/4.0 • 1/4000s • ISO 100'
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
    <section id="gallery" className="relative w-full py-28 bg-[#050507] px-4 lg:px-12 overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-timecode text-xs text-cyan-400 font-bold tracking-widest uppercase mb-2">
              <Aperture className="w-4 h-4" />
              <span>CINEMATOGRAPHY STILLS & EXIF METADATA</span>
            </div>
            <h2 className="font-mono text-4xl lg:text-7xl font-black tracking-tight text-white uppercase">
              STILLS <span className="text-cyan-400">GALLERY</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md font-sans text-sm leading-relaxed">
            A curated gallery of cinematography stills, lighting studies, and visual mood boards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => setActivePhotoIdx(idx)}
              data-cursor="inspect"
              className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-panel border border-white/10 group cursor-pointer shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
            >
              <img 
                src={photo.src} 
                alt={photo.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center font-timecode text-[10px]">
                  <span className="px-2.5 py-1 rounded bg-black/70 border border-white/10 text-cyan-400 font-bold">
                    {photo.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-mono text-base font-black text-white uppercase mb-1 group-hover:text-cyan-400 transition-colors">
                    {photo.title}
                  </h3>
                  <div className="font-timecode text-[10px] text-white/50 flex items-center gap-1">
                    <Camera className="w-3 h-3 text-cyan-400" />
                    <span>{photo.exif}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <AnimatePresence>
        {activePhotoIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhotoIdx(null)}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
          >
            <button
              onClick={() => setActivePhotoIdx(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-cyan-400 hover:text-black transition-all border border-white/10 z-50"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-6 p-3 rounded-full bg-white/10 text-white hover:bg-cyan-400 hover:text-black transition-all border border-white/10 z-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-6 p-3 rounded-full bg-white/10 text-white hover:bg-cyan-400 hover:text-black transition-all border border-white/10 z-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div 
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center font-timecode"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={photos[activePhotoIdx].src}
                alt={photos[activePhotoIdx].title}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-white/15 shadow-2xl"
              />
              <div className="mt-4 text-center">
                <h4 className="font-mono text-xl font-black text-white uppercase">
                  {photos[activePhotoIdx].title}
                </h4>
                <div className="text-xs text-cyan-400 mt-1">
                  {photos[activePhotoIdx].exif}
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Gallery;
