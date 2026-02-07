import { Github, Linkedin, Instagram, Heart } from 'lucide-react';
import { footer, personalInfo } from '../data/portfolioData';
import './Footer.css';

const Footer = () => {
  const socialLinks = [
    { icon: Github, url: personalInfo.social.github, label: 'GitHub' },
    { icon: Linkedin, url: personalInfo.social.linkedin, label: 'LinkedIn' },
    { icon: Instagram, url: personalInfo.social.instagram, label: 'Instagram' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">{personalInfo.name.split(' ')[0]}.</span>
            <p className="footer-tagline">{personalInfo.tagline}</p>
          </div>

          <div className="footer-social">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label={link.label}
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-made">
            Made with <Heart size={14} className="heart-icon" /> by {footer.text.replace('Designed & Built by ', '')}
          </p>
          <p className="footer-copyright">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
