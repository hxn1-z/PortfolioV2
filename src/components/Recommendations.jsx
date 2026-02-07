import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Lock, Unlock, FileText, Download, Eye, X } from 'lucide-react';
import { recommendations } from '../data/portfolioData';
import SectionDoodle from './SectionDoodle';
import HandHighlight from './HandHighlight';
import './Recommendations.css';

const ACCESS_CODE = import.meta.env.VITE_RECOMMENDATIONS_CODE;

const Recommendations = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');
  const [previewPdf, setPreviewPdf] = useState(null);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (inputCode === ACCESS_CODE) {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Invalid access code');
      setInputCode('');
    }
  };

  const handlePreview = (pdfUrl) => {
    setPreviewPdf(pdfUrl);
  };

  const closePreview = () => {
    setPreviewPdf(null);
  };

  return (
    <section id="recommendations" className="recommendations" ref={ref}>
      <SectionDoodle variant="lightbulb" position="top-right" />
      <SectionDoodle variant="sparkles" position="bottom-left" />

      
      <div className="recommendations-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title"><HandHighlight variant="underline" color="var(--accent-primary)">{recommendations.title}</HandHighlight></h2>
        </motion.div>

        {!isUnlocked ? (
          <motion.div
            className="recommendations-locked"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="lock-container">
              <div className="lock-icon-wrapper">
                <Lock size={32} />
              </div>
              <h3 className="lock-title">Locked</h3>
              <p className="lock-description">
                got a code? enter it below
              </p>
              <form onSubmit={handleUnlock} className="unlock-form">
                <input
                  type="password"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Enter access code"
                  className="unlock-input"
                  autoComplete="off"
                />
                <button type="submit" className="unlock-button">
                  <Unlock size={16} />
                  <span>Unlock</span>
                </button>
              </form>
              {error && <p className="unlock-error">{error}</p>}
            </div>
          </motion.div>
        ) : (
          <>
            <div className="recommendations-grid">
              {recommendations.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="recommendation-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="recommendation-header">
                    <div className="recommendation-icon">
                      <FileText size={24} />
                    </div>
                    <span className="recommendation-number">#{index + 1}</span>
                  </div>
                  
                  <div className="recommendation-content">
                    <h3 className="recommendation-title">{item.title}</h3>
                    <p className="recommendation-author">{item.author}</p>
                    <p className="recommendation-role">{item.role}</p>
                  </div>
                  
                  <div className="recommendation-actions">
                    <button 
                      className="action-btn preview-btn"
                      onClick={() => handlePreview(item.pdfUrl)}
                      aria-label="Preview PDF"
                    >
                      <Eye size={18} />
                      <span>Preview</span>
                    </button>
                    <a 
                      href={item.pdfUrl} 
                      download
                      className="action-btn download-btn"
                      aria-label="Download PDF"
                    >
                      <Download size={18} />
                      <span>Download</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {previewPdf && (
              <motion.div 
                className="pdf-modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closePreview}
              >
                <motion.div 
                  className="pdf-modal"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="pdf-modal-close" onClick={closePreview}>
                    <X size={24} />
                  </button>
                  <iframe
                    src={previewPdf}
                    title="PDF Preview"
                    className="pdf-viewer"
                  />
                </motion.div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Recommendations;
