import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Loader2, ArrowRight } from 'lucide-react';
import { contact, personalInfo } from '../data/portfolioData';
import SectionDoodle from './SectionDoodle';
import HandHighlight from './HandHighlight';
import './Contact.css';

const FORMSPREE_ID = (import.meta.env.VITE_FORMSPREE_ID || '').trim();
const CONTACT_API_ENDPOINT = '';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      if (FORMSPREE_ID) {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        });
        if (!response.ok) throw new Error('Failed to send message');
      } else if (CONTACT_API_ENDPOINT) {
        const response = await fetch(CONTACT_API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        });
        if (!response.ok) throw new Error('Failed to send message');
      } else {
        const subject = encodeURIComponent(formState.subject);
        const body = encodeURIComponent(
          `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
        );
        window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
      }

      setSubmitStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus(null);
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <section id="contact" className="contact" ref={ref}>
      <SectionDoodle variant="mail" position="bottom-right" />
      <SectionDoodle variant="arrow" position="top-left" />


      <div className="contact-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title"><HandHighlight variant="underline" color="var(--accent-primary)">{contact.title}</HandHighlight></h2>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="contact-description">{contact.description}</p>

            <div className="contact-details">
              <a href={`mailto:${personalInfo.email}`} className="contact-item">
                <div className="contact-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-item-text">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">{personalInfo.email}</span>
                </div>
                <ArrowRight size={16} className="contact-arrow" />
              </a>

              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={20} />
                </div>
                <div className="contact-item-text">
                  <span className="contact-label">Location</span>
                  <span className="contact-value">{personalInfo.location}</span>
                </div>
              </div>
            </div>

            <div className="contact-quick-note">
              <p>i usually reply within a day or two</p>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                rows={5}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                </>
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="submit-message success">
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="submit-message error">
                ✗ {errorMessage}
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
