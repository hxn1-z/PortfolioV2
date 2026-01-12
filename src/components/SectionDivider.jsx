import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './SectionDivider.css';

// Hand-drawn style section divider with animated SVG
const SectionDivider = ({ variant = 'wave' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const dividers = {
    wave: (
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="divider-svg">
        <motion.path
          d="M0,30 Q150,10 300,30 T600,30 T900,30 T1200,30"
          fill="none"
          stroke="url(#divider-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="divider-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="rgba(124, 58, 237, 0.4)" />
            <stop offset="50%" stopColor="rgba(168, 85, 247, 0.3)" />
            <stop offset="80%" stopColor="rgba(124, 58, 237, 0.4)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    ),
    dots: (
      <div className="divider-dots">
        {[...Array(7)].map((_, i) => (
          <motion.span
            key={i}
            className="divider-dot"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          />
        ))}
      </div>
    ),
    line: (
      <svg viewBox="0 0 1200 20" preserveAspectRatio="none" className="divider-svg">
        <motion.path
          d="M0,10 L1200,10"
          fill="none"
          stroke="url(#divider-gradient-line)"
          strokeWidth="1"
          strokeDasharray="8 6"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="divider-gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="rgba(124, 58, 237, 0.4)" />
            <stop offset="70%" stopColor="rgba(124, 58, 237, 0.4)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    ),
    sketch: (
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="divider-svg">
        {/* Main "rough" line */}
        <motion.path
          d="M0,20 C100,10 150,30 250,20 S350,15 450,25 S550,15 650,20 S750,25 850,20 S950,15 1050,25 S1150,20 1200,20"
          fill="none"
          stroke="rgba(150, 150, 150, 0.5)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ opacity: 0.8 }}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        {/* Secondary "sketch" line for messy pencil look */}
        <motion.path
          d="M5,22 C105,12 155,32 255,22 S355,17 455,27 S555,17 655,22 S755,27 855,22 S955,17 1055,27 S1155,22 1200,22"
          fill="none"
          stroke="rgba(150, 150, 150, 0.4)"
          strokeWidth="1"
          strokeLinecap="round"
          style={{ opacity: 0.6 }}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.1, ease: "easeOut" }}
        />
      </svg>
    ),
  };

  return (
    <div ref={ref} className={`section-divider divider-${variant}`}>
      {dividers[variant]}
    </div>
  );
};

export default SectionDivider;
