import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { heroCards, personalInfo } from '../data/portfolioData';
import MagneticButton from './MagneticButton';
import AnimatedSketches from './AnimatedSketches';
import './Hero.css';

// Hero section - clean modern design
const Hero = () => {
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, url: personalInfo.social.github, label: 'github' },
    { icon: Linkedin, url: personalInfo.social.linkedin, label: 'linkedin' },
    { icon: Instagram, url: personalInfo.social.instagram, label: 'instagram' },
    { icon: Mail, url: `mailto:${personalInfo.email}`, label: 'email' },
  ];

  const firstName = personalInfo.name.split(' ')[0];
  const lastName = personalInfo.name.split(' ')[1] || '';

  return (
    <section id="home" className="hero">
      {/* Animated hand-drawn sketches */}
      <AnimatedSketches variant="hero" />

      {/* Main content */}
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Name with creative styling */}
          <div className="hero-name-wrapper">
            <motion.h1 className="hero-name">
              <span className="hero-name-first">
                {firstName.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    className="hero-letter"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.3 + i * 0.08,
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
              {lastName && (
                <span className="hero-name-last">
                  {lastName.split('').map((letter, i) => (
                    <motion.span
                      key={`last-${i}`}
                      className="hero-letter"
                      initial={{ opacity: 0, y: 60 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.3 + (firstName.length + 1 + i) * 0.08,
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              )}
            </motion.h1>

            {/* Hand-drawn underline */}
            <motion.svg
              className="hero-underline"
              viewBox="0 0 400 30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.path
                d="M5 20 Q100 5, 200 15 T395 10"
                fill="none"
                stroke="url(#hero-underline-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="hero-underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </motion.svg>
          </div>

          {/* Title */}
          <motion.p
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            {personalInfo.title}
          </motion.p>

          {/* Tagline */}
          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            {personalInfo.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <MagneticButton>
              <a href="#projects" className="btn btn-primary">
                See My Work
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="#contact" className="btn btn-secondary">
                Say Hi
              </a>
            </MagneticButton>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="hero-social"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <link.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Visual side with profile */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {/* Profile image */}
          <div className="hero-profile-container">
            <div className="hero-profile-frame">
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="hero-profile-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hero-profile-placeholder" style={{ display: 'none' }}>
                <span>{personalInfo.name.charAt(0)}</span>
              </div>
            </div>
          </div>

          {/* Floating cards */}
          {heroCards.map((card, index) => (
            <motion.div
              key={index}
              className="hero-floating-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.2 }}
              style={{
                '--card-index': index,
              }}
            >
              <span className="card-label">{card.label}</span>
              <span className="card-value">{card.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="hero-scroll"
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        aria-label="Scroll to about section"
      >
        <span className="scroll-text">Scroll</span>
        <motion.div
          className="scroll-arrow"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
