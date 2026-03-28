import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CursorTrail from './components/CursorTrail';

// Section 1: WHO I'M
import Hero from './sections/Hero';
import About from './sections/About';
import Education from './sections/Education';
import Experience from './sections/Experience';
import Highlights from './sections/Highlights';

// Section 2: EXPERTISE
import Skills from './sections/Skills';
import Certifications from './sections/Certifications';

// Section 3: CREATIONS
import SignatureProjects from './sections/Projects';
import ProfessionalEngagements from './sections/ProfessionalEngagements';
import Research from './sections/Research';
import Presentations from './sections/Presentations';

// Section 4: CONNECT
import Contact from './sections/Contact';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const WhoIm = () => (
  <>
    <Hero />
    <About />
    <Education />
    <Experience />
    <Highlights />
  </>
);

const Expertise = () => (
  <div className="pt-10 md:pt-16">
    <Skills />
    <Certifications />
  </div>
);

const Creations = () => (
  <div className="pt-10 md:pt-16">
    <SignatureProjects />
    <ProfessionalEngagements />
    <Research />
    <Presentations />
  </div>
);

const Connect = () => (
  <div className="pt-10 md:pt-16">
    <Contact />
  </div>
);

function App() {
  // Ensure we start with the correct theme
  useEffect(() => {
    // Default to dark mode unless user has explicitly set light
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme !== 'light'; // dark unless explicitly set to light

    if (isDark) {
      document.documentElement.classList.add('dark');
      if (!savedTheme) localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen font-sans flex flex-col">
        <CursorTrail />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/who-im" replace />} />
            <Route path="/who-im" element={<WhoIm />} />
            <Route path="/expertise" element={<Expertise />} />
            <Route path="/creations" element={<Creations />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="*" element={<Navigate to="/who-im" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
