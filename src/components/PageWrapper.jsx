import { motion, AnimatePresence } from 'framer-motion';
import './PageWrapper.css';

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.98,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: [0.55, 0.055, 0.675, 0.19],
    },
  },
};

// Content fade in variants
const contentVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
};

// Page wrapper component with animated transitions
const PageWrapper = ({ children, pageId, isActive }) => {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={pageId}
          className="page-wrapper"
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {/* Page transition overlay */}
          <motion.div
            className="page-transition-overlay"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          />
          
          {/* Content */}
          <motion.div 
            className="page-content"
            variants={contentVariants}
          >
            {children}
          </motion.div>

          {/* Page number indicator */}
          <motion.div
            className="page-number-indicator"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="page-label">Section</span>
            <span className="page-num">{pageId}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageWrapper;
