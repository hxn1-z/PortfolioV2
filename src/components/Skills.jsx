import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skills } from '../data/portfolioData';
import AnimatedSketches from './AnimatedSketches';
import './Skills.css';

// Skills section - clean cards with subtle animations
const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="skills" ref={ref}>
      {/* Animated hand-drawn sketches */}
      <AnimatedSketches variant="skills" />
      
      {/* Section accent line */}
      <div className="section-accent-line" />
      
      <div className="skills-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{skills.title}</h2>
        </motion.div>

        <div className="skills-grid">
          {skills.categories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              className="skill-category"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <div className="category-header">
                <h3 className="category-title">{category.name}</h3>
              </div>
              
              <div className="skill-items">
                {category.items.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    whileHover={{ y: -2 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
