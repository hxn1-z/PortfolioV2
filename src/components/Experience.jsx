import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Image, ChevronDown, ChevronUp } from 'lucide-react';
import { experience } from '../data/portfolioData';
import AnimatedSketches from './AnimatedSketches';
import './Experience.css';

// Experience section - timeline with clean design
const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedMedia, setExpandedMedia] = useState(null);

  const toggleMedia = (itemId) => {
    setExpandedMedia(expandedMedia === itemId ? null : itemId);
  };

  return (
    <section id="experience" className="experience" ref={ref}>
      {/* Animated hand-drawn sketches */}
      <AnimatedSketches variant="experience" />
      
      {/* Section accent line */}
      <div className="section-accent-line" />

      <div className="experience-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{experience.title}</h2>
        </motion.div>

        <div className="timeline">
          {experience.items.map((item, index) => {
            const primaryMedia = item.media?.[0];
            const additionalMedia = item.media?.slice(1) || [];
            const hasAdditionalMedia = additionalMedia.length > 0;

            return (
              <motion.div
                key={item.id}
                className="timeline-item"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {/* Timeline marker */}
                <div className="timeline-marker">
                  <div className="timeline-dot" />
                  <div className="timeline-line" />
                </div>

                {/* Content card */}
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3 className="timeline-role">{item.role}</h3>
                    <span className="timeline-company">{item.company}</span>
                  </div>

                  <div className={`timeline-body${primaryMedia ? ' with-media' : ''}`}>
                    <div className="timeline-details">
                      <p className="timeline-description">{item.description}</p>

                      <ul className="timeline-highlights">
                        {item.highlights.map((highlight, hIndex) => (
                          <li key={hIndex}>
                            <span className="highlight-arrow">→</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      {hasAdditionalMedia && (
                        <button
                          className="experience-media-toggle"
                          onClick={() => toggleMedia(item.id)}
                        >
                          <Image size={14} />
                          <span>
                            {expandedMedia === item.id
                              ? 'Hide Media'
                              : `View More (${additionalMedia.length})`}
                          </span>
                          {expandedMedia === item.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      )}
                    </div>

                    {primaryMedia && (
                      <div className="experience-media-preview">
                        {primaryMedia.type === 'image' ? (
                          <img
                            src={primaryMedia.url}
                            alt={primaryMedia.caption || `${item.role} media`}
                            className="experience-media-image"
                            loading="lazy"
                          />
                        ) : primaryMedia.type === 'video' ? (
                          <video
                            src={primaryMedia.url}
                            controls
                            className="experience-media-video"
                          />
                        ) : null}
                        {primaryMedia.caption && (
                          <span className="experience-media-caption">{primaryMedia.caption}</span>
                        )}
                      </div>
                    )}
                  </div>

                  {hasAdditionalMedia && expandedMedia === item.id && (
                    <motion.div
                      className="experience-media-gallery"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="experience-media-grid">
                        {additionalMedia.map((mediaItem, mIndex) => (
                          <div key={mIndex} className="experience-media-item">
                            {mediaItem.type === 'image' ? (
                              <img
                                src={mediaItem.url}
                                alt={mediaItem.caption || `${item.role} image ${mIndex + 1}`}
                                className="experience-media-image"
                                loading="lazy"
                              />
                            ) : mediaItem.type === 'video' ? (
                              <video
                                src={mediaItem.url}
                                controls
                                className="experience-media-video"
                              />
                            ) : null}
                            {mediaItem.caption && (
                              <span className="experience-media-caption">{mediaItem.caption}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
