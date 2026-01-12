import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './PageNavigation.css';

// Page data for the multi-page experience
const pages = [
  { id: 'home', name: 'Home', number: '01' },
  { id: 'about', name: 'About', number: '02' },
  { id: 'skills', name: 'Skills', number: '03' },
  { id: 'projects', name: 'Projects', number: '04' },
  { id: 'experience', name: 'Experience', number: '05' },
  { id: 'achievements', name: 'Achievements', number: '06' },
  { id: 'recommendations', name: 'Recommendations', number: '07' },
  { id: 'contact', name: 'Contact', number: '08' },
];

// Multi-page navigation component with visible menu
const PageNavigation = ({ currentPage, onPageChange, isHome = false }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [hoveredPage, setHoveredPage] = useState(null);

  const currentIndex = pages.findIndex(p => p.id === currentPage);
  const currentPageData = pages[currentIndex] || pages[0];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isNavOpen) {
        if (e.key === 'Escape') {
          setIsNavOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isNavOpen]);

  const handlePageClick = (pageId) => {
    onPageChange(pageId);
    setIsNavOpen(false);
  };

  return (
    <>
      {/* Visible navigation bar - always shown, more prominent on home */}
      <motion.nav 
        className={`main-nav ${currentPage === 'home' ? 'nav-home' : 'nav-scrolled'}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="nav-container">
          {/* Logo */}
          <button 
            className="nav-logo" 
            onClick={() => handlePageClick('home')}
          >
            <span className="logo-text">HXN</span>
            <span className="logo-dot">.</span>
          </button>

          {/* Desktop navigation links */}
          <div className="nav-links-desktop">
            {pages.slice(1, 6).map((page) => (
              <button
                key={page.id}
                className={`nav-link ${currentPage === page.id ? 'active' : ''}`}
                onClick={() => handlePageClick(page.id)}
              >
                {page.name}
                {currentPage === page.id && (
                  <motion.div 
                    className="nav-link-underline"
                    layoutId="navUnderline"
                  />
                )}
              </button>
            ))}
            <button
              className={`nav-link nav-link-cta ${currentPage === 'contact' ? 'active' : ''}`}
              onClick={() => handlePageClick('contact')}
            >
              Contact
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="nav-menu-btn"
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-label="Open navigation"
          >
            <span className="menu-line"></span>
            <span className="menu-line"></span>
            <span className="menu-line"></span>
          </button>
        </div>
      </motion.nav>

      {/* Page indicator dots - side */}
      <div className="page-dots-side">
        {pages.map((page) => (
          <button
            key={page.id}
            className={`side-dot ${currentPage === page.id ? 'active' : ''}`}
            onClick={() => handlePageClick(page.id)}
            aria-label={`Go to ${page.name}`}
          />
        ))}
      </div>

      {/* Full screen mobile navigation overlay with liquid effect */}
      <AnimatePresence>
        {isNavOpen && (
          <>
            {/* Liquid blob background */}
            <motion.div
              className="nav-liquid-bg"
              initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
              animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
              exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            />

            <motion.div
              className="page-nav-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close button */}
              <motion.button
                className="nav-close-btn"
                onClick={() => setIsNavOpen(false)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: 0.3 }}
                aria-label="Close navigation"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Navigation links */}
              <nav className="nav-links-container">
                {pages.map((page, index) => (
                  <motion.button
                    key={page.id}
                    className={`nav-page-link ${currentPage === page.id ? 'active' : ''}`}
                    onClick={() => handlePageClick(page.id)}
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 60 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                    onMouseEnter={() => setHoveredPage(page.id)}
                    onMouseLeave={() => setHoveredPage(null)}
                  >
                    <span className="link-number">{page.number}</span>
                    <span className="link-name">{page.name}</span>
                    <motion.span 
                      className="link-arrow"
                      animate={{ x: hoveredPage === page.id ? 15 : 0 }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                ))}
              </nav>

              {/* Current page indicator */}
              <motion.div 
                className="nav-current-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="indicator-text">Currently on</span>
                <span className="indicator-page">{currentPageData.name}</span>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default PageNavigation;
