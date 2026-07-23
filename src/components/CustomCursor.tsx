import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'play' | 'drag' | 'shutter' | 'arrow'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [magnetEl, setMagnetEl] = useState<HTMLElement | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring configuration for lag-free 120fps feel
  const ringSpringX = useSpring(cursorX, { damping: 35, stiffness: 280, mass: 0.35 });
  const ringSpringY = useSpring(cursorY, { damping: 35, stiffness: 280, mass: 0.35 });

  const dotSpringX = useSpring(cursorX, { damping: 15, stiffness: 600 });
  const dotSpringY = useSpring(cursorY, { damping: 15, stiffness: 600 });

  // Canvas particle trail setup
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; alpha: number; size: number }>>([]);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const updateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.025; // Fade out rate
        
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      requestRef.current = requestAnimationFrame(updateParticles);
    };

    requestRef.current = requestAnimationFrame(updateParticles);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (magnetEl) {
        const rect = magnetEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Snaps to the center of the magnetic button while leaving a small percentage of play
        const pullX = centerX + (e.clientX - centerX) * 0.22;
        const pullY = centerY + (e.clientY - centerY) * 0.22;
        cursorX.set(pullX);
        cursorY.set(pullY);
      } else {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
      
      if (!isVisible) setIsVisible(true);

      // Spawn trail particles on movement
      if (Math.random() < 0.35) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.4, // float slightly upward
          alpha: 0.8,
          size: Math.random() * 2 + 1
        });
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const clickable = target.closest('a, button, [role="button"], select, input, textarea, .custom-hover');
      const cursorAttr = target.closest('[data-cursor]');

      // Snaps to elements with clickability
      if (clickable) {
        setMagnetEl(clickable as HTMLElement);
        if (clickable.closest('nav')) {
          setCursorType('arrow');
        } else {
          setCursorType('pointer');
        }
      } else {
        setMagnetEl(null);
        setCursorType('default');
      }

      if (cursorAttr) {
        const val = cursorAttr.getAttribute('data-cursor');
        if (val === 'play' || val === 'drag' || val === 'arrow' || val === 'shutter') {
          setCursorType(val as any);
        }
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
  }, [cursorX, cursorY, isVisible, magnetEl]);

  if (!isVisible) return null;

  // Variants for cursor shape based on cursorType
  const variants = {
    default: {
      width: 22,
      height: 22,
      backgroundColor: 'transparent',
      border: '1.5px solid rgba(255, 255, 255, 0.4)',
    },
    pointer: {
      width: 60,
      height: 60,
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
    shutter: {
      width: 72,
      height: 72,
      backgroundColor: 'transparent',
      border: '2px dashed rgba(6, 182, 212, 0.8)',
    },
    arrow: {
      width: 44,
      height: 44,
      backgroundColor: 'transparent',
      border: '1.5px solid #ffffff',
      mixBlendMode: 'normal' as any,
    }
  };

  return (
    <>
      {/* Lag-free canvas trailing particles layer */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998] hidden lg:block"
      />

      {/* Main Outer Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-space font-bold text-[10px] tracking-widest overflow-hidden hidden lg:flex"
        style={{
          x: ringSpringX,
          y: ringSpringY,
        }}
        animate={cursorType}
        variants={variants}
        transition={{ type: 'spring', damping: 30, stiffness: 220 }}
      >
        {cursorType === 'play' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1 text-[9px] font-black text-background"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
            </svg>
            PLAY
          </motion.div>
        )}
        {cursorType === 'drag' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1 text-[9px] font-black text-background"
          >
            ← DRAG →
          </motion.div>
        )}
        {cursorType === 'shutter' && (
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="text-cyan-400"
          >
            {/* Shutter Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 opacity-85">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a10 10 0 0 1 7.54 16.54L12 12" />
              <path d="M22 12a10 10 0 0 1-16.54 7.54L12 12" />
              <path d="M12 22a10 10 0 0 1-7.54-16.54L12 12" />
              <path d="M2 12a10 10 0 0 1 16.54-7.54L12 12" />
            </svg>
          </motion.div>
        )}
        {cursorType === 'arrow' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </motion.div>
        )}
      </motion.div>

      {/* Inner Dot for precise targeting (only default/shutter/arrow states) */}
      {(cursorType === 'default' || cursorType === 'shutter' || cursorType === 'arrow') && (
        <motion.div
          className="fixed w-1.5 h-1.5 bg-[#ffffff] rounded-full pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
          style={{
            x: dotSpringX,
            y: dotSpringY,
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;
