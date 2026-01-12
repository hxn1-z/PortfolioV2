import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { introAnimation } from '../data/portfolioData';
import './IntroAnimation.css';

// Minimal, hand-drawn style intro animation
const IntroAnimation = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef(null);

  // Draw hand-drawn style elements on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Draw a wobbly/sketchy line
    const drawSketchyLine = (x1, y1, x2, y2, progress) => {
      if (progress <= 0) return;
      
      const steps = 20;
      const actualSteps = Math.floor(steps * Math.min(progress, 1));
      
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.3)';
      ctx.lineWidth = 1.5;
      
      for (let i = 0; i < actualSteps; i++) {
        const t = i / steps;
        const x = x1 + (x2 - x1) * t;
        const y = y1 + (y2 - y1) * t;
        // Add slight wobble
        const wobble = Math.sin(t * 10 + Date.now() * 0.002) * 2;
        
        if (i === 0) {
          ctx.moveTo(x + wobble, y + wobble);
        } else {
          ctx.lineTo(x + wobble, y + wobble);
        }
      }
      ctx.stroke();
    };

    // Draw sketchy circle
    const drawSketchyCircle = (cx, cy, r, progress) => {
      if (progress <= 0) return;
      
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.2)';
      ctx.lineWidth = 1;
      
      const points = 40;
      const actualPoints = Math.floor(points * Math.min(progress, 1));
      
      for (let i = 0; i <= actualPoints; i++) {
        const angle = (i / points) * Math.PI * 2;
        const wobble = Math.sin(angle * 5 + Date.now() * 0.001) * 3;
        const x = cx + (r + wobble) * Math.cos(angle);
        const y = cy + (r + wobble) * Math.sin(angle);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    };

    let startTime = Date.now();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const elapsed = (Date.now() - startTime) / 1000;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw decorative sketchy circles that animate in
      drawSketchyCircle(centerX, centerY, 150, elapsed * 0.5);
      drawSketchyCircle(centerX, centerY, 200, (elapsed - 0.3) * 0.5);

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    // Simplified animation phases
    const timers = [
      setTimeout(() => setPhase(1), 200),    // Name starts
      setTimeout(() => setPhase(2), 1200),   // Underline draws
      setTimeout(() => setPhase(3), 2000),   // Tagline appears
      setTimeout(() => setPhase(4), 3000),   // Exit begins
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 3500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const nameLetters = introAnimation.name.split('');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Sketchy canvas background */}
          <canvas ref={canvasRef} className="intro-canvas" />

          {/* Main content - simple and clean */}
          <div className="intro-content">
            {/* Name with hand-drawn feel */}
            <motion.div 
              className="intro-name-container"
              initial={{ opacity: 0 }}
              animate={phase >= 1 ? { opacity: 1 } : {}}
            >
              <div className="intro-name">
                {nameLetters.map((letter, i) => (
                  <motion.span
                    key={i}
                    className="intro-letter"
                    initial={{ 
                      opacity: 0, 
                      y: 30,
                    }}
                    animate={phase >= 1 ? { 
                      opacity: 1, 
                      y: 0,
                    } : {}}
                    transition={{ 
                      duration: 0.4,
                      delay: i * 0.06,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              
              {/* Hand-drawn underline */}
              <motion.svg
                className="intro-underline-svg"
                viewBox="0 0 300 30"
                initial={{ opacity: 0 }}
                animate={phase >= 2 ? { opacity: 1 } : {}}
              >
                <motion.path
                  d="M10 15 C50 8, 80 22, 120 12 S180 20, 220 14 S260 18, 290 12"
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={phase >= 2 ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                {/* Small scribble accent */}
                <motion.path
                  d="M140 22 Q150 18, 160 24"
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={phase >= 2 ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5, ease: "easeOut" }}
                />
              </motion.svg>
            </motion.div>

            {/* Tagline - simple fade in */}
            <motion.div
              className="intro-tagline"
              initial={{ opacity: 0, y: 10 }}
              animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
            >
              {introAnimation.tagline}
            </motion.div>
          </div>

          {/* Simple wipe transition */}
          <motion.div
            className="intro-wipe"
            initial={{ scaleY: 0 }}
            animate={phase >= 4 ? { scaleY: 1 } : {}}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
