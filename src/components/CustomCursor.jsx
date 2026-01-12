import { useEffect, useState, useRef, useCallback } from 'react';
import './CustomCursor.css';

// Large fluid blob cursor effect - like antigravity.google
// Takes up significant screen space with organic stretchy motion
const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const dotsRef = useRef([]);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Configuration - MUCH LARGER
  // Configuration - MUCH LARGER & DEEPER
  const LAYERS = [
    { count: 6, radius: 50, sizeBase: 18, sizeVar: 4, opacity: 0.9 },
    { count: 12, radius: 120, sizeBase: 14, sizeVar: 3, opacity: 0.7 },
    { count: 18, radius: 200, sizeBase: 10, sizeVar: 3, opacity: 0.45 },
    { count: 24, radius: 300, sizeBase: 6, sizeVar: 2, opacity: 0.25 },
    { count: 32, radius: 450, sizeBase: 4, sizeVar: 1, opacity: 0.12 },
  ];

  // Very soft physics for ultra-fluid motion
  const ELASTIC_FACTOR = 0.02;
  const DAMPING = 0.93;
  const MOUSE_INFLUENCE = 0.25;

  // Initialize dots
  useEffect(() => {
    const dots = [];
    let id = 0;

    LAYERS.forEach((layer, layerIdx) => {
      for (let i = 0; i < layer.count; i++) {
        const angle = (i / layer.count) * Math.PI * 2 + (layerIdx * 0.3);
        const baseX = Math.cos(angle) * layer.radius;
        const baseY = Math.sin(angle) * layer.radius;

        dots.push({
          id: id++,
          x: baseX,
          y: baseY,
          baseX,
          baseY,
          vx: 0,
          vy: 0,
          size: layer.sizeBase + Math.random() * layer.sizeVar,
          opacity: layer.opacity * (0.8 + Math.random() * 0.4),
          layerIdx,
          angle,
          floatOffset: Math.random() * Math.PI * 2,
          floatSpeed: 0.2 + Math.random() * 0.3,
          floatAmplitude: 8 + Math.random() * 15 + layerIdx * 5,
          mouseOffset: { x: 0, y: 0 },
        });
      }
    });

    dotsRef.current = dots;
  }, []);

  // Mouse tracking with velocity
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(max-width: 768px)').matches) return;

    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      mousePosRef.current = { x: e.clientX, y: e.clientY, dx, dy };
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Animation loop - fluid blob physics
  const animate = useCallback(() => {
    const time = Date.now() * 0.001;
    const mouse = mousePosRef.current;

    dotsRef.current.forEach((dot, i) => {
      const layer = LAYERS[dot.layerIdx];

      // Organic floating motion
      const floatX = Math.sin(time * dot.floatSpeed + dot.floatOffset) * dot.floatAmplitude;
      const floatY = Math.cos(time * dot.floatSpeed * 0.7 + dot.floatOffset + Math.PI / 2.5) * dot.floatAmplitude;

      // Slow rotation - outer layers rotate slower
      const rotationSpeed = 0.08 - dot.layerIdx * 0.012;
      const rotatedAngle = dot.angle + time * rotationSpeed;
      const rotatedBaseX = Math.cos(rotatedAngle) * layer.radius;
      const rotatedBaseY = Math.sin(rotatedAngle) * layer.radius;

      // Mouse velocity influence - dots push away from fast mouse movement
      // PARALLAX: Outer layers move MUCH slower/less than inner layers to create depth
      const parallax = 1 / (1 + dot.layerIdx * 1.5);
      const mouseInfluence = MOUSE_INFLUENCE * parallax;
      const pushX = (mouse.dx || 0) * mouseInfluence * 0.5;
      const pushY = (mouse.dy || 0) * mouseInfluence * 0.5;

      // Breathing/pulsing effect
      const breathe = Math.sin(time * 0.5 + dot.layerIdx * 0.5) * 10;

      // Target position
      const targetX = rotatedBaseX + floatX + pushX + (breathe * Math.cos(dot.angle));
      const targetY = rotatedBaseY + floatY + pushY + (breathe * Math.sin(dot.angle));

      // Ultra-soft spring physics
      const dx = targetX - dot.x;
      const dy = targetY - dot.y;

      dot.vx += dx * ELASTIC_FACTOR;
      dot.vy += dy * ELASTIC_FACTOR;

      dot.vx *= DAMPING;
      dot.vy *= DAMPING;

      dot.x += dot.vx;
      dot.y += dot.vy;
    });

    // Update DOM
    if (containerRef.current) {
      const dots = containerRef.current.querySelectorAll('.fluid-dot');
      dots.forEach((dotEl, i) => {
        const dot = dotsRef.current[i];
        if (dot && dotEl) {
          dotEl.style.transform = `translate(${dot.x}px, ${dot.y}px)`;
        }
      });
    }

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // Start animation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(max-width: 768px)').matches) return;

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`fluid-cursor-container ${isVisible ? 'visible' : 'hidden'}`}
      style={{
        left: mousePos.x,
        top: mousePos.y,
      }}
    >
      {dotsRef.current.map((dot) => (
        <div
          key={dot.id}
          className={`fluid-dot layer-${dot.layerIdx}`}
          style={{
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity,
            transform: `translate(${dot.x}px, ${dot.y}px)`,
          }}
        />
      ))}
    </div>
  );
};

export default CustomCursor;
