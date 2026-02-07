import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { aboutMe, personalInfo } from '../data/portfolioData';
import SectionDoodle from './SectionDoodle';
import HandHighlight from './HandHighlight';
import './About.css';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="about" ref={ref}>
      <SectionDoodle variant="notebook" position="top-right" />
      <SectionDoodle variant="coffee" position="bottom-left" />


      <div className="about-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title"><HandHighlight variant="underline" color="var(--accent-primary)">{aboutMe.title}</HandHighlight></h2>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-image-section"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="about-image-wrapper">
              <div className="about-image-frame">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="about-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="about-image-placeholder" style={{ display: 'none' }}>
                  <span>{personalInfo.name.charAt(0)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-text-section"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="about-description">
              {aboutMe.description.split('\n\n').map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {paragraph.trim()}
                </motion.p>
              ))}
            </div>

            <div className="about-highlights">
              <h3 className="highlights-title">
                <HandHighlight variant="underline" color="var(--accent-primary)" delay={0.2}>
                  Highlights
                </HandHighlight>
              </h3>

              <ul className="highlights-list">
                {aboutMe.highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    className="highlight-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <span className="highlight-bullet">→</span>
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              className="about-cta"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <a href="#contact" className="btn btn-secondary">
                Let's Connect
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
