import { motion } from 'framer-motion';
import './AnimatedSketches.css';

// Hand-drawn pencil sketches - organic, imperfect, human-looking
const AnimatedSketches = ({ variant = 'default' }) => {

  // Pencil texture filter - creates that grainy graphite look
  const PencilFilter = ({ idSuffix }) => (
    <defs>
      <filter id={`pencil-${idSuffix}`} x="-20%" y="-20%" width="140%" height="140%">
        {/* Subtle grain texture */}
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" result="displaced" />
        {/* Add slight roughness to edges */}
        <feMorphology operator="dilate" radius="0.3" in="displaced" result="thickened" />
        <feGaussianBlur in="thickened" stdDeviation="0.2" result="blurred" />
        <feComposite in="blurred" in2="SourceGraphic" operator="atop" />
      </filter>
    </defs>
  );

  // Sketchy line animation - draws like a human would
  const sketchDraw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.7,
      transition: {
        pathLength: { duration: 1.8, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.3 }
      }
    }
  };

  // Gentle floating wobble
  const float = {
    animate: {
      y: [0, -3, 1, -2, 0],
      rotate: [0, 0.5, -0.3, 0.2, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Pencil colors - soft graphite on dark
  const pencilLight = "rgba(200, 200, 200, 0.6)";
  const pencilMedium = "rgba(160, 160, 160, 0.5)";
  const pencilAccent = "rgba(120, 120, 120, 0.6)";

  // Hero - Loose gestural swirls suggesting creativity
  const HeroSketches = () => (
    <motion.g variants={float} animate="animate">
      <svg className="sketch sketch-hero-swirl" viewBox="0 0 200 200" fill="none">
        <PencilFilter idSuffix="hero" />
        {/* Main flowing gesture line */}
        <motion.path
          d="M20 180 C35 160, 28 140, 45 125 C62 110, 50 85, 70 75 C90 65, 85 45, 110 40 C135 35, 140 55, 160 50 C180 45, 175 30, 185 25"
          stroke={pencilLight}
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#pencil-hero)"
          variants={sketchDraw}
          initial="hidden"
          animate="visible"
        />
        {/* Second lighter trace - like a re-sketch */}
        <motion.path
          d="M22 178 C38 158, 30 142, 47 127 C63 113, 52 88, 72 77"
          stroke={pencilMedium}
          strokeWidth="0.8"
          strokeLinecap="round"
          filter="url(#pencil-hero)"
          variants={sketchDraw}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        />
        {/* Small accent curl */}
        <motion.path
          d="M165 45 C170 42, 175 48, 172 55 C169 62, 178 60, 182 52"
          stroke={pencilAccent}
          strokeWidth="1"
          strokeLinecap="round"
          filter="url(#pencil-hero)"
          variants={sketchDraw}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        />
      </svg>

      {/* Small scattered marks - like doodle marks */}
      <svg className="sketch sketch-hero-marks" viewBox="0 0 60 60" fill="none">
        <PencilFilter idSuffix="hero2" />
        <motion.path
          d="M10 30 L18 28 M20 35 L26 38 M30 25 L35 22"
          stroke={pencilMedium}
          strokeWidth="1"
          strokeLinecap="round"
          filter="url(#pencil-hero2)"
          variants={sketchDraw}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        />
      </svg>
    </motion.g>
  );

  // About - Soft hand-drawn brackets/frames
  const AboutSketches = () => (
    <motion.g variants={float} animate="animate">
      {/* Left bracket - sketchy, imperfect */}
      <svg className="sketch sketch-about-left" viewBox="0 0 50 180" fill="none">
        <PencilFilter idSuffix="about" />
        {/* Main bracket stroke */}
        <motion.path
          d="M40 15 C25 18, 18 30, 16 50 C14 70, 15 90, 15 100 C15 110, 14 130, 16 150 C18 165, 25 175, 40 178"
          stroke={pencilLight}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          filter="url(#pencil-about)"
          variants={sketchDraw}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        {/* Light re-trace for pencil effect */}
        <motion.path
          d="M38 17 C24 20, 20 32, 18 52"
          stroke={pencilMedium}
          strokeWidth="0.7"
          strokeLinecap="round"
          fill="none"
          filter="url(#pencil-about)"
          variants={sketchDraw}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        />
      </svg>

      {/* Right bracket */}
      <svg className="sketch sketch-about-right" viewBox="0 0 50 180" fill="none">
        <PencilFilter idSuffix="about2" />
        <motion.path
          d="M10 15 C25 18, 32 30, 34 50 C36 70, 35 90, 35 100 C35 110, 36 130, 34 150 C32 165, 25 175, 10 178"
          stroke={pencilLight}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          filter="url(#pencil-about2)"
          variants={sketchDraw}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.path
          d="M12 17 C26 20, 30 32, 32 52"
          stroke={pencilMedium}
          strokeWidth="0.7"
          strokeLinecap="round"
          fill="none"
          filter="url(#pencil-about2)"
          variants={sketchDraw}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        />
      </svg>
    </motion.g>
  );

  // Skills - Scattered geometric doodles like margin sketches
  const SkillsSketches = () => (
    <motion.g variants={float} animate="animate">
      <svg className="sketch sketch-skills-doodles" viewBox="0 0 120 120" fill="none">
        <PencilFilter idSuffix="skills" />
        {/* Loose circle - not perfect */}
        <motion.path
          d="M25 55 C27 45, 38 42, 48 45 C58 48, 62 58, 58 68 C54 78, 42 80, 32 75 C22 70, 20 62, 25 55"
          stroke={pencilLight}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          filter="url(#pencil-skills)"
          variants={sketchDraw}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        {/* Quick triangle sketch */}
        <motion.path
          d="M78 35 L95 70 L62 68 L78 35"
          stroke={pencilMedium}
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#pencil-skills)"
          variants={sketchDraw}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        />
        {/* Small x mark */}
        <motion.path
          d="M100 95 L110 105 M110 95 L100 105"
          stroke={pencilAccent}
          strokeWidth="1"
          strokeLinecap="round"
          filter="url(#pencil-skills)"
          variants={sketchDraw}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        />
        {/* Small square */}
        <motion.path
          d="M15 90 L28 88 L30 102 L16 104 L15 90"
          stroke={pencilMedium}
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#pencil-skills)"
          variants={sketchDraw}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        />
      </svg>
    </motion.g>
  );

  // Projects - Simple folder/document sketch
  const ProjectsSketches = () => (
    <motion.g variants={float} animate="animate">
      <svg className="sketch sketch-projects-folder" viewBox="0 0 100 80" fill="none">
        <PencilFilter idSuffix="projects" />
        {/* Folder shape - hand drawn */}
        <motion.path
          d="M10 25 L10 65 C11 67, 13 68, 15 68 L85 67 C87 67, 89 65, 89 63 L90 28 L55 27 L48 18 L15 18 C12 18, 10 21, 10 25"
          stroke={pencilLight}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#pencil-projects)"
          variants={sketchDraw}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        {/* Tab detail */}
        <motion.path
          d="M48 18 L48 27 L55 27"
          stroke={pencilMedium}
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
          filter="url(#pencil-projects)"
          variants={sketchDraw}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        />
        {/* Lines suggesting content */}
        <motion.path
          d="M22 40 L68 41 M22 50 L55 51"
          stroke={pencilMedium}
          strokeWidth="0.7"
          strokeLinecap="round"
          filter="url(#pencil-projects)"
          variants={sketchDraw}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        />
      </svg>
    </motion.g>
  );

  // Experience - Winding path suggesting journey
  const ExperienceSketches = () => (
    <motion.g variants={float} animate="animate">
      <svg className="sketch sketch-exp-path" viewBox="0 0 60 200" fill="none">
        <PencilFilter idSuffix="experience" />
        {/* Winding path */}
        <motion.path
          d="M30 15 C45 25, 48 40, 35 55 C22 70, 20 85, 32 100 C44 115, 42 130, 30 145 C18 160, 22 175, 30 190"
          stroke={pencilLight}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          filter="url(#pencil-experience)"
          variants={sketchDraw}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        {/* Small milestone dots */}
        <motion.circle cx="30" cy="15" r="3" fill={pencilAccent} filter="url(#pencil-experience)"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.6, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        />
        <motion.circle cx="35" cy="55" r="2.5" fill={pencilMedium} filter="url(#pencil-experience)"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        />
        <motion.circle cx="30" cy="100" r="2.5" fill={pencilMedium} filter="url(#pencil-experience)"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
        />
        <motion.circle cx="30" cy="145" r="2.5" fill={pencilMedium} filter="url(#pencil-experience)"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1 }}
        />
        <motion.circle cx="30" cy="190" r="3" fill={pencilAccent} filter="url(#pencil-experience)"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.6, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3 }}
        />
      </svg>
    </motion.g>
  );

  // Contact - Paper airplane sketch
  const ContactSketches = () => (
    <motion.g variants={float} animate="animate">
      <svg className="sketch sketch-contact-plane" viewBox="0 0 100 80" fill="none">
        <PencilFilter idSuffix="contact" />
        {/* Paper airplane - hand folded look */}
        <motion.path
          d="M15 45 L85 25 L50 55 L15 45"
          stroke={pencilLight}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#pencil-contact)"
          variants={sketchDraw}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        {/* Fold line */}
        <motion.path
          d="M85 25 L42 42 L50 55"
          stroke={pencilMedium}
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#pencil-contact)"
          variants={sketchDraw}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        />
        {/* Motion trail */}
        <motion.path
          d="M8 50 C5 52, 3 48, 6 46 M2 55 L8 53"
          stroke={pencilMedium}
          strokeWidth="0.7"
          strokeLinecap="round"
          filter="url(#pencil-contact)"
          variants={sketchDraw}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        />
      </svg>
    </motion.g>
  );

  // About - Specific circle around "Highlights"
  const CircleSketch = () => (
    <motion.g variants={float} animate="animate">
      <svg className="sketch sketch-circle-highlight" viewBox="0 0 200 80" fill="none" style={{ position: 'absolute', top: '55%', left: '10%', width: '180px', height: '60px', overflow: 'visible', pointerEvents: 'none', zIndex: 0 }}>
        <motion.path
          d="M20 40 C20 20, 60 10, 100 15 C150 20, 170 30, 160 50 C150 70, 50 70, 30 55 C25 50, 20 45, 20 40"
          stroke={pencilAccent}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          // Removed filter for visibility
          variants={sketchDraw}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.path
          d="M25 42 C40 25, 80 18, 120 22"
          stroke={pencilLight}
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
          // Removed filter for visibility
          variants={sketchDraw}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        />
      </svg>
    </motion.g >
  );

  const renderSketches = () => {
    switch (variant) {
      case 'hero': return <HeroSketches />;
      case 'about': return <AboutSketches />;
      case 'skills': return <SkillsSketches />;
      case 'projects': return <ProjectsSketches />;
      case 'experience': return <ExperienceSketches />;
      case 'contact': return <ContactSketches />;
      case 'circle': return <CircleSketch />;
      default: return null;
    }
  };

  return (
    <div className={`animated-sketches sketches-${variant}`}>
      {renderSketches()}
    </div>
  );
};

export default AnimatedSketches;
