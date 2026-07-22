import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'play' | 'drag' | 'inspect' | 'record'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 350, mass: 0.3 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const cursorAttr = target.closest('[data-cursor]');
      if (cursorAttr) {
        const val = cursorAttr.getAttribute('data-cursor');
        if (val && ['play', 'drag', 'inspect', 'pointer', 'record'].includes(val)) {
          setCursorType(val as any);
          return;
        }
      }

      const clickable = target.closest('a, button, [role="button"], video, input, select');
      if (clickable) {
        if (clickable.closest('video') || clickable.getAttribute('data-video')) {
          setCursorType('play');
        } else {
          setCursorType('pointer');
        }
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Reticle / Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-timecode hidden lg:flex"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        {cursorType === 'default' && (
          <div className="relative w-8 h-8 flex items-center justify-center">
            {/* Camera Reticle Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/60" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/60" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/60" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/60" />
            {/* Center dot */}
            <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#00f0ff]" />
            {/* Coordinates Badge */}
            <span className="absolute left-10 top-1/2 -translate-y-1/2 text-[9px] text-white/50 tracking-wider whitespace-nowrap bg-black/70 px-1.5 py-0.5 rounded border border-white/10 backdrop-blur-md">
              [X:{coords.x} Y:{coords.y}]
            </span>
          </div>
        )}

        {cursorType === 'pointer' && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-12 h-12 rounded-full border border-cyan-400/80 bg-cyan-400/10 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
          </motion.div>
        )}

        {cursorType === 'play' && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-full bg-white text-black font-black text-[10px] tracking-widest flex items-center justify-center gap-1 shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
            </svg>
            PLAY
          </motion.div>
        )}

        {cursorType === 'drag' && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-full border-2 border-white/80 bg-black/80 text-white font-mono text-[10px] tracking-wider flex items-center justify-center backdrop-blur-md"
          >
            ← SCRUB →
          </motion.div>
        )}

        {cursorType === 'inspect' && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 rounded-full border border-yellow-400/80 bg-yellow-400/10 text-yellow-400 text-[9px] font-bold tracking-wider flex items-center justify-center backdrop-blur-md"
          >
            INSPECT
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
