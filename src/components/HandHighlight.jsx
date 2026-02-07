import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './HandHighlight.css';

/*  Hand-drawn text decoration component.
 *  Variants:
 *    - underline : wobbly hand-sketched underline beneath text
 *    - highlight : translucent marker-stroke behind text
 *    - circle    : rough hand-drawn circle around text
 *    - box       : sketchy rectangle around text
 *
 *  All variants use feTurbulence for pencil wobble and have colorful strokes.
 */

const COLORS = {
  violet: '#a78bfa',
  teal:   '#5eead4',
  amber:  '#fbbf24',
  rose:   '#fb7185',
  sky:    '#38bdf8',
};

const defaultColorMap = {
  underline: COLORS.violet,
  highlight: COLORS.amber,
  circle:    COLORS.teal,
  box:       COLORS.rose,
};

export default function HandHighlight({
  children,
  variant = 'underline',
  color,
  delay = 0.2,
  className = '',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const strokeColor = color || defaultColorMap[variant] || COLORS.violet;

  const drawTransition = {
    pathLength: { duration: 0.8, delay, ease: 'easeInOut' },
    opacity: { duration: 0.3, delay },
  };

  /* ── Underline ── */
  if (variant === 'underline') {
    return (
      <span ref={ref} className={`hand-hl hand-hl-underline ${className}`}>
        {children}
        <svg
          className="hand-hl-svg hand-hl-svg-underline"
          viewBox="0 0 200 12"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="hl-wobble-u">
              <feTurbulence type="turbulence" baseFrequency="0.06" numOctaves="4" seed="7" />
              <feDisplacementMap in="SourceGraphic" scale="4" />
            </filter>
          </defs>
          <motion.path
            d="M3 8 C30 3, 60 11, 100 6 S170 10, 197 5"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#hl-wobble-u)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={drawTransition}
          />
          {/* second pass for thick marker feel */}
          <motion.path
            d="M5 6 C35 10, 65 3, 102 8 S168 4, 195 7"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.4"
            filter="url(#hl-wobble-u)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
            transition={{ ...drawTransition, pathLength: { ...drawTransition.pathLength, delay: delay + 0.15 } }}
          />
        </svg>
      </span>
    );
  }

  /* ── Highlight (marker stroke behind text) ── */
  if (variant === 'highlight') {
    return (
      <span ref={ref} className={`hand-hl hand-hl-highlight ${className}`}>
        <svg
          className="hand-hl-svg hand-hl-svg-highlight"
          viewBox="0 0 200 30"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="hl-wobble-h">
              <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="4" seed="12" />
              <feDisplacementMap in="SourceGraphic" scale="3.5" />
            </filter>
          </defs>
          {/* Wide marker stroke */}
          <motion.path
            d="M2 15 C25 10, 50 20, 100 14 S175 18, 198 13"
            stroke={strokeColor}
            strokeWidth="22"
            strokeLinecap="round"
            opacity="0.25"
            filter="url(#hl-wobble-h)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.25 } : {}}
            transition={drawTransition}
          />
          {/* Second thinner pass */}
          <motion.path
            d="M4 16 C30 12, 55 19, 102 15 S172 19, 196 14"
            stroke={strokeColor}
            strokeWidth="18"
            strokeLinecap="round"
            opacity="0.15"
            filter="url(#hl-wobble-h)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.15 } : {}}
            transition={{ ...drawTransition, pathLength: { ...drawTransition.pathLength, delay: delay + 0.1 } }}
          />
        </svg>
        <span className="hand-hl-text">{children}</span>
      </span>
    );
  }

  /* ── Circle ── */
  if (variant === 'circle') {
    return (
      <span ref={ref} className={`hand-hl hand-hl-circle ${className}`}>
        <svg
          className="hand-hl-svg hand-hl-svg-circle"
          viewBox="0 0 220 70"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="hl-wobble-c">
              <feTurbulence type="turbulence" baseFrequency="0.06" numOctaves="4" seed="21" />
              <feDisplacementMap in="SourceGraphic" scale="4" />
            </filter>
          </defs>
          <motion.ellipse
            cx="110"
            cy="35"
            rx="100"
            ry="28"
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#hl-wobble-c)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.8 } : {}}
            transition={drawTransition}
          />
        </svg>
        <span className="hand-hl-text">{children}</span>
      </span>
    );
  }

  /* ── Box ── */
  if (variant === 'box') {
    return (
      <span ref={ref} className={`hand-hl hand-hl-box ${className}`}>
        <svg
          className="hand-hl-svg hand-hl-svg-box"
          viewBox="0 0 220 60"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="hl-wobble-b">
              <feTurbulence type="turbulence" baseFrequency="0.06" numOctaves="4" seed="33" />
              <feDisplacementMap in="SourceGraphic" scale="4" />
            </filter>
          </defs>
          <motion.path
            d="M8 5 L212 7 L210 53 L6 55 Z"
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#hl-wobble-b)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.8 } : {}}
            transition={drawTransition}
          />
        </svg>
        <span className="hand-hl-text">{children}</span>
      </span>
    );
  }

  /* Fallback */
  return <span className={className}>{children}</span>;
}
