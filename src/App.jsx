import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import IntroAnimation from './components/IntroAnimation';
import InteractiveBackground from './components/InteractiveBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Recommendations from './components/Recommendations';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SectionDivider from './components/SectionDivider';

function App() {
  // intro animation state
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {/* intro animation */}
      {!introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      )}

      {/* background effect - fluid dots on home page only */}
      <InteractiveBackground heroOnly={true} />

      <div className={`app ${introComplete ? 'app-visible' : 'app-hidden'}`}>
        {/* a11y skip link */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Header navigation */}
        <Header />

        <main id="main-content" className="main-content">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Hero />
            <SectionDivider />
            <About />
            <SectionDivider variant="wave" />
            <Skills />
            <SectionDivider variant="sketch" />
            <Projects />
            <SectionDivider />
            <Experience />
            <SectionDivider variant="wave" />
            <Achievements />
            <SectionDivider variant="sketch" />
            <Recommendations />
            <SectionDivider />
            <Contact />
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App
