import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'play' | 'drag' | 'arrow'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check for elements or parents with cursor attributes
      const clickable = target.closest('a, button, [role="button"], select, input, textarea, .custom-hover');
      const cursorAttr = target.closest('[data-cursor]');

      if (cursorAttr) {
        const val = cursorAttr.getAttribute('data-cursor');
        if (val === 'play' || val === 'drag' || val === 'arrow' || val === 'pointer') {
          setCursorType(val as any);
          return;
        }
      }

      if (clickable) {
        // If it's a navbar link, make it 'arrow' or 'pointer'
        if (clickable.closest('nav')) {
          setCursorType('arrow');
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

  // Variants for cursor styling based on cursorType
  const variants = {
    default: {
      width: 16,
      height: 16,
      backgroundColor: '#ffffff',
      border: '0px solid rgba(255,255,255,0)',
    },
    pointer: {
      width: 64,
      height: 64,
      backgroundColor: '#ffffff',
      mixBlendMode: 'difference' as any,
      border: '0px solid rgba(255,255,255,0)',
    },
    play: {
      width: 80,
      height: 80,
      backgroundColor: '#ffffff',
      color: '#080808',
      border: '0px solid rgba(255,255,255,0)',
    },
    drag: {
      width: 80,
      height: 80,
      backgroundColor: '#ffffff',
      color: '#080808',
      border: '0px solid rgba(255,255,255,0)',
    },
    arrow: {
      width: 48,
      height: 48,
      backgroundColor: 'transparent',
      border: '2px solid #ffffff',
      mixBlendMode: 'normal' as any,
    }
  };

  return (
    <>
      {/* Main Outer Cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-satoshi font-bold text-xs uppercase tracking-widest overflow-hidden hidden lg:flex"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={cursorType}
        variants={variants}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
      >
        {cursorType === 'play' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1 text-[10px] font-black text-background"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
            </svg>
            PLAY
          </motion.div>
        )}
        {cursorType === 'drag' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1 text-[10px] font-black text-background"
          >
            ← DRAG →
          </motion.div>
        )}
        {cursorType === 'arrow' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </motion.div>
        )}
      </motion.div>

      {/* Inner Dot (only visible when in default/arrow states for precise aiming) */}
      {cursorType === 'default' && (
        <motion.div
          className="fixed w-1.5 h-1.5 bg-accent rounded-full pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
          style={{
            x: cursorX,
            y: cursorY,
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;
