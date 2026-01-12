import { useEffect, useRef, useState, useCallback } from 'react';
import './InteractiveBackground.css';

/**
 * CONTINUOUS ORGANIC FLUID
 * 
 * - MOVEMENT: 
 *   1. Swarm Center tracks mouse.
 *   2. CONTINUOUS ELASTICITY:
 *      Every particle has a UNIQUE elasticity based on its exact Z-depth + random noise.
 *      NO discrete layers.
 *      NO grouping.
 *      Every dot reacts at its own unique split-second timing.
 */
const InteractiveBackground = ({ heroOnly = false }) => {
  const canvasRef = useRef(null);
  const [isHeroSection, setIsHeroSection] = useState(true);

  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const swarmCenterRef = useRef({ x: 0, y: 0 });

  const requestRef = useRef(null);
  const timeRef = useRef(0);
  const isInitializedRef = useRef(false);

  // ═══════════════════════════════════════════════════════════════
  // CONFIGURATION
  // ═══════════════════════════════════════════════════════════════

  const CONFIG = {
    PARTICLE_COUNT: 500,
    RADIUS: 680,
    HUE: 230,
    SAT: 72,

    SWARM_FOLLOW_SPEED: 0.004,
  };

  const initializeParticles = useCallback(() => {
    if (typeof window === 'undefined') return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const particles = [];

    for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
      // Z-DEPTH (-1 to 1) - Continuous
      const zDepth = (Math.random() * 2 - 1);

      // Position
      const r = CONFIG.RADIUS * Math.sqrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;

      const offX = r * Math.cos(theta);
      const offY = r * Math.sin(theta);

      // SIZE
      const baseSize = zDepth > 0
        ? 2.5 + Math.random() * 3.5 + (zDepth * 2)
        : 1.5 + Math.random() * 1.5;

      const baseOpacity = zDepth > 0
        ? 0.7 + Math.random() * 0.3
        : 0.2 + Math.random() * 0.4;

      // ════════════════════════════════════════════════════════
      // UNIQUE ELASTICITY
      // ════════════════════════════════════════════════════════
      // Calculate a unique "drag" for this specific particle.
      // Base it on depth (so front is faster), but add noise.
      // Range: 0.005 (Back) to 0.12 (Front)
      // BUT continuous, not stepped.

      // Normalize Z (-1 -> 1) to (0 -> 1)
      const normZ = (zDepth + 1) / 2;

      // Base curve: square it to exaggerate front speed
      // Front (1) -> 1, Back (0) -> 0
      const speedCurve = Math.pow(normZ, 1.5);

      // Map to range [0.005, 0.12]
      let myElasticity = 0.005 + (speedCurve * 0.115);

      // Add 10% randomness so neighbors with similar Z don't lock together
      // unique randomness for every single pill
      myElasticity *= (0.9 + Math.random() * 0.2);

      particles.push({
        offX,
        offY,
        zDepth,
        elasticity: myElasticity, // UNIQUE for every pill

        // Current Position
        x: centerX + offX,
        y: centerY + offY,

        // Organic Life
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.3 + Math.random() * 0.3,
        swayRange: 5 + Math.random() * 10,

        pulsePhase: r * 0.01 + Math.random(),

        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.005,

        // Appearance
        baseSize,
        elongation: 1.2 + Math.random() * 1.5,
        lightness: 55 + (zDepth * 8),
        baseOpacity,
      });
    }

    mouseRef.current = { x: centerX, y: centerY };
    swarmCenterRef.current = { x: centerX, y: centerY };
    particlesRef.current = particles;
    isInitializedRef.current = true;
  }, []);

  useEffect(() => {
    initializeParticles();
  }, [initializeParticles]);

  useEffect(() => {
    if (!heroOnly) return;
    const handleScroll = () => {
      const hero = document.getElementById('home');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setIsHeroSection(rect.bottom > window.innerHeight * 0.3);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroOnly]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInitializedRef.current) return;

    const ctx = canvas.getContext('2d');
    const particles = particlesRef.current;

    const mouse = mouseRef.current;
    const swarm = swarmCenterRef.current;

    const render = () => {
      timeRef.current += 0.016;
      const time = timeRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (heroOnly && !isHeroSection) {
        requestRef.current = requestAnimationFrame(render);
        return;
      }

      // 1. MOVE SWARM CENTER
      const swarmDx = mouse.x - swarm.x;
      const swarmDy = mouse.y - swarm.y;
      swarm.x += swarmDx * CONFIG.SWARM_FOLLOW_SPEED;
      swarm.y += swarmDy * CONFIG.SWARM_FOLLOW_SPEED;

      // 2. MOVE PARTICLES
      particles.forEach(p => {
        const idealX = swarm.x + p.offX;
        const idealY = swarm.y + p.offY;

        // UNIQUE ELASTICITY
        // No grouped layers. Every pill has its own unique speed.
        p.x += (idealX - p.x) * p.elasticity;
        p.y += (idealY - p.y) * p.elasticity;

        // SWAY & PULSE
        const swayX = Math.sin(time * p.swaySpeed + p.swayPhase) * p.swayRange;
        const swayY = Math.cos(time * p.swaySpeed * 0.9 + p.swayPhase + 1) * p.swayRange;
        const pulse = Math.sin(time * 0.6 - p.pulsePhase);
        const currentSize = p.baseSize * (1 + pulse * 0.15);
        p.rotation += p.rotSpeed;

        // DRAW
        const drawX = p.x + swayX;
        const drawY = p.y + swayY;

        // FADE
        const dRx = drawX - swarm.x;
        const dRy = drawY - swarm.y;
        const distFromSwarm = Math.sqrt(dRx * dRx + dRy * dRy);
        const edgeFade = Math.max(0, 1 - Math.pow(distFromSwarm / CONFIG.RADIUS, 3));
        const finalOpacity = p.baseOpacity * edgeFade * (0.8 + 0.2 * pulse);

        if (finalOpacity <= 0.01) return;

        ctx.save();
        ctx.translate(drawX, drawY);
        ctx.rotate(p.rotation);

        ctx.fillStyle = `hsla(${CONFIG.HUE}, ${CONFIG.SAT}%, ${p.lightness}%, ${finalOpacity})`;

        const w = currentSize * p.elongation;
        const h = currentSize;
        const r = h / 2;

        ctx.beginPath();
        ctx.roundRect(-w / 2, -h / 2, w, h, r);
        ctx.fill();

        ctx.restore();
      });

      requestRef.current = requestAnimationFrame(render);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    resize();
    mouseRef.current.x = window.innerWidth / 2;
    mouseRef.current.y = window.innerHeight / 2;
    swarmCenterRef.current.x = window.innerWidth / 2;
    swarmCenterRef.current.y = window.innerHeight / 2;

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [heroOnly, isHeroSection]);

  return (
    <div className="interactive-bg">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default InteractiveBackground;
