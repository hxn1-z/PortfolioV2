import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ChevronDown, ChevronUp, Play } from 'lucide-react';
import { projects } from '../data/portfolioData';
import AnimatedSketches from './AnimatedSketches';
import './Projects.css';

// Projects section - clean cards with expand functionality
const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedProject, setExpandedProject] = useState(null);

  const toggleExpand = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <section id="projects" className="projects" ref={ref}>
      {/* Animated hand-drawn sketches */}
      <AnimatedSketches variant="projects" />
      
      {/* Section accent line */}
      <div className="section-accent-line" />

      <div className="projects-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{projects.title}</h2>
        </motion.div>

        <div className="projects-grid">
          {projects.items.map((project, index) => (
            <motion.article
              key={project.id}
              className={`project-card ${expandedProject === project.id ? 'expanded' : ''} ${project.featured ? 'featured' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Project number label */}
              <span className="project-number">0{index + 1}</span>

              {/* Image */}
              <div className="project-image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="project-image-placeholder" style={{ display: 'none' }}>
                  <span>{project.title.charAt(0)}</span>
                </div>

                {/* Overlay with links */}
                <div className="project-overlay">
                  <div className="project-links">
                    {!project.showGithubOnly && project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label="View live project"
                      >
                        <ExternalLink size={18} />
                        <span>Live</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label="View source code"
                      >
                        <Github size={18} />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                {/* Tags */}
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>

                {/* Expand button */}
                {(project.fullDescription || (project.media && project.media.length > 0)) && (
                  <button
                    className="project-expand-btn"
                    onClick={() => toggleExpand(project.id)}
                    aria-expanded={expandedProject === project.id}
                  >
                    {expandedProject === project.id ? (
                      <>Show Less <ChevronUp size={16} /></>
                    ) : (
                      <>View Details <ChevronDown size={16} /></>
                    )}
                  </button>
                )}
              </div>

              {/* Expanded content */}
              <AnimatePresence>
                {expandedProject === project.id && (
                  <motion.div
                    className="project-expanded"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="project-expanded-content">
                      {project.fullDescription && (
                        <div className="project-full-description">
                          {project.fullDescription.split('\n').map((line, i) => (
                            line.trim() && <p key={i}>{line.trim()}</p>
                          ))}
                        </div>
                      )}

                      {project.media && project.media.length > 0 && (
                        <div className="project-media-gallery">
                          <h4 className="media-title">Gallery</h4>
                          <div className="media-grid">
                            {project.media.map((item, i) => (
                              <div key={i} className="media-item">
                                {item.type === 'image' ? (
                                  <img
                                    src={item.url}
                                    alt={item.caption || `${project.title} image ${i + 1}`}
                                    className="media-image"
                                  />
                                ) : item.type === 'video' ? (
                                  <div className="media-video-wrapper">
                                    <video src={item.url} controls className="media-video" />
                                    <Play size={24} className="media-play-icon" />
                                  </div>
                                ) : null}
                                {item.caption && (
                                  <span className="media-caption">{item.caption}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
