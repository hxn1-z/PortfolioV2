import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { achievements } from '../data/portfolioData';
import './Achievements.css';

// Achievements section
const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="achievements" ref={ref}>
      {/* Section accent line */}
      <div className="section-accent-line" />

      <div className="achievements-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{achievements.title}</h2>
        </motion.div>

        <div className="achievements-grid">
          {achievements.items.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                className="achievement-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="achievement-content">
                  <h3 className="achievement-title">{item.title}</h3>
                  <span className="achievement-org">{item.organization}</span>
                  <p className="achievement-description">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
