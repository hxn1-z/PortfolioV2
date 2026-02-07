import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './SectionDoodle.css';

/**
 * SectionDoodle – colorful, hand-sketched SVG decorations.
 * Uses feTurbulence displacement for genuine pencil-wobble feel.
 */
const SectionDoodle = ({ variant, position = 'top-right', className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const draw = (dur = 1.2, del = 0) => ({
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: dur, ease: [0.4, 0, 0.2, 1], delay: del },
        opacity: { duration: 0.3, delay: del },
      },
    },
  });

  const pop = (del = 0) => ({
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'backOut', delay: del },
    },
  });

  // Colorful palette
  const violet = 'rgba(139, 92, 246, 0.55)';
  const violetLight = 'rgba(139, 92, 246, 0.35)';
  const teal = 'rgba(45, 212, 191, 0.50)';
  const tealLight = 'rgba(45, 212, 191, 0.30)';
  const amber = 'rgba(251, 191, 36, 0.50)';
  const amberLight = 'rgba(251, 191, 36, 0.30)';
  const rose = 'rgba(251, 113, 133, 0.50)';
  const roseLight = 'rgba(251, 113, 133, 0.30)';
  const sky = 'rgba(56, 189, 248, 0.50)';
  const skyLight = 'rgba(56, 189, 248, 0.30)';

  const SketchFilter = ({ id }) => (
    <defs>
      <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="4" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  );
  const f = (id) => `url(#${id})`;

  const doodles = {

    /* </> code tags */
    code: (
      <svg viewBox="0 0 90 55" fill="none" className="doodle-svg">
        <SketchFilter id="sf-code" />
        <motion.path d="M24 10 L7 26 L24 42" stroke={violet} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" filter={f('sf-code')} variants={draw(1,0)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M62 10 L79 26 L62 42" stroke={teal} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" filter={f('sf-code')} variants={draw(1,0.2)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M49 5 L37 47" stroke={amber} strokeWidth="2.2" strokeLinecap="round" filter={f('sf-code')} variants={draw(0.8,0.4)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.circle cx="3" cy="14" r="1.5" fill={roseLight} variants={pop(0.7)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.circle cx="84" cy="38" r="1.5" fill={skyLight} variants={pop(0.8)} initial="hidden" animate={isInView?'visible':'hidden'} />
      </svg>
    ),

    /* Laptop */
    laptop: (
      <svg viewBox="0 0 80 60" fill="none" className="doodle-svg">
        <SketchFilter id="sf-lap" />
        <motion.path d="M16 8 L64 9 L63 38 L17 37 Z" stroke={violet} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" filter={f('sf-lap')} variants={draw(1.2,0)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M10 44 L70 44 L64 38 L16 38 Z" stroke={teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter={f('sf-lap')} variants={draw(0.8,0.3)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M22 16 L38 16 M22 22 L50 22 M22 28 L44 28" stroke={amberLight} strokeWidth="1.6" strokeLinecap="round" filter={f('sf-lap')} variants={draw(0.8,0.5)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M52 15 L52 20" stroke={rose} strokeWidth="1.8" strokeLinecap="round" variants={draw(0.4,0.8)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.circle cx="74" cy="10" r="1.2" fill={skyLight} variants={pop(0.9)} initial="hidden" animate={isInView?'visible':'hidden'} />
      </svg>
    ),

    /* Notebook */
    notebook: (
      <svg viewBox="0 0 58 68" fill="none" className="doodle-svg">
        <SketchFilter id="sf-nb" />
        <motion.path d="M14 5 L46 6 L45 60 L13 59 Z" stroke={violet} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" filter={f('sf-nb')} variants={draw(1.2,0)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M20 18 L40 18 M20 26 L37 26 M20 34 L40 34 M20 42 L32 42" stroke={tealLight} strokeWidth="1.6" strokeLinecap="round" filter={f('sf-nb')} variants={draw(0.9,0.3)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M14 5 L14 59 M9 13 L14 13 M9 23 L14 23 M9 33 L14 33 M9 43 L14 43 M9 53 L14 53" stroke={amberLight} strokeWidth="1.6" strokeLinecap="round" filter={f('sf-nb')} variants={draw(0.8,0.5)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.circle cx="50" cy="3" r="1.3" fill={roseLight} variants={pop(0.8)} initial="hidden" animate={isInView?'visible':'hidden'} />
      </svg>
    ),

    /* Curly braces { } */
    brackets: (
      <svg viewBox="0 0 74 64" fill="none" className="doodle-svg">
        <SketchFilter id="sf-br" />
        <motion.path d="M22 5 C15 5,11 10,11 17 L11 25 C11 29,7 31,4 31 C7 31,11 33,11 37 L11 46 C11 52,15 57,22 57" stroke={violet} strokeWidth="2.8" strokeLinecap="round" fill="none" filter={f('sf-br')} variants={draw(1.1,0)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M52 5 C59 5,63 10,63 17 L63 25 C63 29,67 31,70 31 C67 31,63 33,63 37 L63 46 C63 52,59 57,52 57" stroke={teal} strokeWidth="2.8" strokeLinecap="round" fill="none" filter={f('sf-br')} variants={draw(1.1,0.15)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.circle cx="31" cy="31" r="2" fill={amber} variants={pop(0.5)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.circle cx="37" cy="31" r="2" fill={rose} variants={pop(0.6)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.circle cx="43" cy="31" r="2" fill={sky} variants={pop(0.7)} initial="hidden" animate={isInView?'visible':'hidden'} />
      </svg>
    ),

    /* Gear */
    gear: (
      <svg viewBox="0 0 62 62" fill="none" className="doodle-svg">
        <SketchFilter id="sf-gear" />
        <motion.path d="M31 11 C36 11,41 15,43 20 L49 18 L49 24 L45 26 C47 30,47 35,45 39 L49 41 L47 47 L41 45 C39 47,35 49,31 49 C27 49,23 47,21 45 L15 47 L13 41 L17 39 C15 35,15 30,17 26 L13 24 L13 18 L19 20 C21 15,26 11,31 11 Z" stroke={amber} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" filter={f('sf-gear')} variants={draw(1.4,0)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.circle cx="31" cy="30" r="7" stroke={violet} strokeWidth="2" fill="none" filter={f('sf-gear')} variants={draw(0.6,0.5)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.circle cx="31" cy="30" r="2" fill={tealLight} variants={pop(0.8)} initial="hidden" animate={isInView?'visible':'hidden'} />
      </svg>
    ),

    /* Hourglass / timeline */
    timeline: (
      <svg viewBox="0 0 52 64" fill="none" className="doodle-svg">
        <SketchFilter id="sf-tl" />
        <motion.path d="M12 7 L40 7 M12 56 L40 56" stroke={teal} strokeWidth="2.8" strokeLinecap="round" filter={f('sf-tl')} variants={draw(0.8,0)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M15 7 C15 22,26 27,26 31 C26 35,15 40,15 56 M37 7 C37 22,26 27,26 31 C26 35,37 40,37 56" stroke={violet} strokeWidth="2.2" strokeLinecap="round" filter={f('sf-tl')} variants={draw(1.2,0.2)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.circle cx="26" cy="22" r="1.3" fill={amberLight} variants={pop(0.6)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.circle cx="24" cy="44" r="1.3" fill={amberLight} variants={pop(0.7)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.circle cx="28" cy="46" r="1.3" fill={amberLight} variants={pop(0.8)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.circle cx="26" cy="48" r="1" fill={amber} variants={pop(0.9)} initial="hidden" animate={isInView?'visible':'hidden'} />
      </svg>
    ),

    /* Trophy */
    trophy: (
      <svg viewBox="0 0 64 68" fill="none" className="doodle-svg">
        <SketchFilter id="sf-trophy" />
        <motion.path d="M18 8 L44 9 L42 34 C40 44,33 48,31 48 C29 48,22 44,20 34 Z" stroke={amber} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" filter={f('sf-trophy')} variants={draw(1.2,0)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M18 12 C10 14,8 23,14 29 M44 12 C52 14,54 23,48 29" stroke={violetLight} strokeWidth="1.8" strokeLinecap="round" filter={f('sf-trophy')} variants={draw(0.8,0.3)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M31 48 L31 54 M23 56 L39 56 L39 60 L23 60 Z" stroke={teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter={f('sf-trophy')} variants={draw(0.7,0.5)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M31 18 L33 24 L39 24 L34 28 L36 34 L31 30 L26 34 L28 28 L23 24 L29 24 Z" stroke={rose} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" filter={f('sf-trophy')} variants={draw(0.6,0.7)} initial="hidden" animate={isInView?'visible':'hidden'} />
      </svg>
    ),

    /* Star – imperfect hand-drawn 5-pointed star */
    star: (
      <svg viewBox="0 0 54 54" fill="none" className="doodle-svg">
        <SketchFilter id="sf-star" />
        <motion.path d="M27 3 L30 18 L31 20 L46 20 L45 21 L34 28 L35 30 L39 44 L38 43 L27 35 L26 34 L16 43 L17 44 L20 30 L21 28 L8 21 L9 20 L24 20 Z" stroke={amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" filter={f('sf-star')} variants={draw(1.4,0)} initial="hidden" animate={isInView?'visible':'hidden'} />
        {/* Little sparkle marks */}
        <motion.path d="M46 6 L47 10 M44 8 L49 8" stroke={rose} strokeWidth="1.5" strokeLinecap="round" filter={f('sf-star')} variants={draw(0.4,0.5)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.circle cx="5" cy="44" r="1.5" fill={skyLight} variants={pop(0.6)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.circle cx="50" cy="42" r="1" fill={violetLight} variants={pop(0.7)} initial="hidden" animate={isInView?'visible':'hidden'} />
      </svg>
    ),

    /* Lightbulb */
    lightbulb: (
      <svg viewBox="0 0 52 72" fill="none" className="doodle-svg">
        <SketchFilter id="sf-lb" />
        <motion.path d="M26 8 C15 8,9 17,9 26 C9 33,14 38,19 43 L19 51 L33 51 L33 43 C38 38,43 33,43 26 C43 17,37 8,26 8 Z" stroke={amber} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" filter={f('sf-lb')} variants={draw(1.2,0)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M20 56 L32 56 M21 61 L31 61" stroke={violetLight} strokeWidth="2" strokeLinecap="round" filter={f('sf-lb')} variants={draw(0.6,0.3)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M26 0 L26 4 M44 8 L42 10 M49 26 L46 26 M8 8 L10 10 M3 26 L6 26" stroke={tealLight} strokeWidth="1.6" strokeLinecap="round" filter={f('sf-lb')} variants={draw(0.6,0.5)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.circle cx="46" cy="4" r="1.3" fill={roseLight} variants={pop(0.8)} initial="hidden" animate={isInView?'visible':'hidden'} />
      </svg>
    ),

    /* Paper airplane */
    mail: (
      <svg viewBox="0 0 74 58" fill="none" className="doodle-svg">
        <SketchFilter id="sf-mail" />
        <motion.path d="M6 32 L64 11 L40 47 Z" stroke={teal} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" filter={f('sf-mail')} variants={draw(1.1,0)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M64 11 L32 31 L40 47" stroke={violet} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" filter={f('sf-mail')} variants={draw(0.7,0.3)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M6 32 L32 31" stroke={amberLight} strokeWidth="1.6" strokeLinecap="round" filter={f('sf-mail')} variants={draw(0.5,0.4)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M3 36 C0 38,-2 34,1 32 M-3 40 L2 38" stroke={roseLight} strokeWidth="1.4" strokeLinecap="round" filter={f('sf-mail')} variants={draw(0.4,0.6)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.circle cx="68" cy="6" r="1.3" fill={skyLight} variants={pop(0.7)} initial="hidden" animate={isInView?'visible':'hidden'} />
      </svg>
    ),

    /* Bicycle */
    bicycle: (
      <svg viewBox="0 0 80 55" fill="none" className="doodle-svg">
        <SketchFilter id="sf-bike" />
        <motion.circle cx="20" cy="38" r="13" stroke={violet} strokeWidth="2" fill="none" filter={f('sf-bike')} variants={draw(1,0)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.circle cx="60" cy="38" r="13" stroke={teal} strokeWidth="2" fill="none" filter={f('sf-bike')} variants={draw(1,0.1)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M20 38 L36 16 L52 16 L60 38 L36 16 L20 38 M36 16 L40 38 L60 38" stroke={amber} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" filter={f('sf-bike')} variants={draw(1,0.3)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M52 16 L56 10 L60 12" stroke={roseLight} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" filter={f('sf-bike')} variants={draw(0.5,0.6)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M34 14 L38 14" stroke={roseLight} strokeWidth="2" strokeLinecap="round" filter={f('sf-bike')} variants={draw(0.3,0.7)} initial="hidden" animate={isInView?'visible':'hidden'} />
      </svg>
    ),

    /* Sparkles – hand-sketched 5-pointed stars */
    sparkles: (
      <svg viewBox="0 0 55 55" fill="none" className="doodle-svg">
        <SketchFilter id="sf-sp" />
        {/* Big wobbly 5-pointed star */}
        <motion.path d="M22 3 L25 16 L18 18 L26 21 L23 34 L28 23 L35 30 L31 20 L43 17 L30 16 Z" stroke={amber} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" filter={f('sf-sp')} variants={draw(1.2,0)} initial="hidden" animate={isInView?'visible':'hidden'} />
        {/* Small wobbly 5-pointed star */}
        <motion.path d="M42 37 L43 42 L39 40 L40 45 L37 42 L38 47 L42 44 L45 48 L44 43 L48 43 Z" stroke={rose} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" filter={f('sf-sp')} variants={draw(0.7,0.4)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.circle cx="8" cy="43" r="1.5" fill={skyLight} variants={pop(0.6)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.circle cx="46" cy="7" r="1.2" fill={violetLight} variants={pop(0.7)} initial="hidden" animate={isInView?'visible':'hidden'} />
      </svg>
    ),

    /* Coffee mug */
    coffee: (
      <svg viewBox="0 0 60 55" fill="none" className="doodle-svg">
        <SketchFilter id="sf-cof" />
        <motion.path d="M10 18 L10 44 C10 48,14 50,18 50 L38 50 C42 50,46 48,46 44 L46 18" stroke={amber} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" filter={f('sf-cof')} variants={draw(1.1,0)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M46 22 C52 22,54 28,54 32 C54 36,52 40,46 40" stroke={violetLight} strokeWidth="2" strokeLinecap="round" filter={f('sf-cof')} variants={draw(0.7,0.3)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M20 14 C20 10,24 10,24 6 M28 14 C28 8,32 8,32 2 M36 14 C36 10,40 10,40 6" stroke={tealLight} strokeWidth="1.5" strokeLinecap="round" filter={f('sf-cof')} variants={draw(0.7,0.5)} initial="hidden" animate={isInView?'visible':'hidden'} />
      </svg>
    ),

    /* Arrow */
    arrow: (
      <svg viewBox="0 0 50 50" fill="none" className="doodle-svg">
        <SketchFilter id="sf-arr" />
        <motion.path d="M8 42 C12 30,20 20,40 10" stroke={violet} strokeWidth="2.2" strokeLinecap="round" filter={f('sf-arr')} variants={draw(0.8,0)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.path d="M34 6 L40 10 L36 16" stroke={rose} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter={f('sf-arr')} variants={draw(0.5,0.3)} initial="hidden" animate={isInView?'visible':'hidden'} />
        <motion.circle cx="6" cy="44" r="1.5" fill={tealLight} variants={pop(0.5)} initial="hidden" animate={isInView?'visible':'hidden'} />
      </svg>
    ),
  };

  return (
    <div ref={ref} className={`section-doodle doodle-${position} ${className}`} aria-hidden="true">
      <motion.div
        className="doodle-float"
        animate={{ y: [0,-3,1,-2,0], rotate: [0,0.6,-0.4,0.2,0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      >
        {doodles[variant] || null}
      </motion.div>
    </div>
  );
};

export default SectionDoodle;
