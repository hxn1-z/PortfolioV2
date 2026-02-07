import { useState } from 'react';
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

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      )}

      <InteractiveBackground heroOnly={true} />

      <div className={`app ${introComplete ? 'app-visible' : 'app-hidden'}`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Header />

        <main id="main-content" className="main-content">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Achievements />
            <Recommendations />
            <Contact />
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App
