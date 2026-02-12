
import './App.css'
import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import PokiLogo from './assets/imgs/logo.svg?react';
import { CmsProvider } from './utils/context'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Homepage from './pages/homepage/Homepage';
import About from './pages/about/About';
import Agency from './pages/agency/Agency';
import Work from './pages/work/Work';
import Website from './pages/website/Website';
import Project from './pages/project/Project';
import Navbar from './components/navbar/Navbar';
import ScrollToTop from './components/common/ScrollToTop';
import DiagonalWipe from './components/common/DiagonalWipe';
import { PreloaderProvider, usePreloader } from './utils/PreloaderContext';

function AppContent() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [phase, setPhase] = useState('idle');
  const [showLogo, setShowLogo] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [pageReady, setPageReady] = useState(false);
  const { setIsRevealed } = usePreloader();
  const pendingRef = useRef(null);
  const waitingForLoadRef = useRef(false);

  // Detect when page is fully loaded (images, fonts, etc.)
  useEffect(() => {
    if (document.readyState === 'complete') {
      setPageReady(true);
    } else {
      const handleLoad = () => setPageReady(true);
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // When page is ready AND we're waiting, trigger the reveal
  useEffect(() => {
    if (pageReady && waitingForLoadRef.current) {
      waitingForLoadRef.current = false;
      // Brief pause after load to let content settle
      setTimeout(() => {
        setShowLogo(false);
        setTimeout(() => {
          setPhase('revealing');
        }, 300);
      }, 500);
    }
  }, [pageReady]);

  const handlePhaseComplete = useCallback((completedPhase) => {
    if (completedPhase === 'painting') {
      // Swap route behind the curtain
      if (pendingRef.current) {
        setDisplayLocation(pendingRef.current);
        pendingRef.current = null;
      }
      // Show logo
      setShowLogo(true);

      if (pageReady) {
        // Page already loaded — hold logo briefly, then reveal
        setTimeout(() => {
          setShowLogo(false);
          setTimeout(() => {
            setPhase('revealing');
          }, 300);
        }, 800);
      } else {
        // Page still loading — wait for load event
        waitingForLoadRef.current = true;
      }
    } else if (completedPhase === 'revealing') {
      setPhase('idle');
      setIsRevealed(true);
      setIsInitialLoad(false);
      document.body.classList.remove('diagonal-wipe-active');
    }
  }, [pageReady, setIsRevealed]);

  // Initial load — start painting
  useEffect(() => {
    document.body.classList.add('diagonal-wipe-active');
    setPhase('painting');
  }, []);

  // Route changes — start painting
  useEffect(() => {
    if (location.pathname !== displayLocation.pathname && !isInitialLoad) {
      document.body.classList.add('diagonal-wipe-active');
      setPageReady(false); // Reset load state for new route
      setIsRevealed(false); // Reset reveal state
      pendingRef.current = location;
      setPhase('painting');

      // For SPA route changes, content is ready almost immediately
      // Set a minimum wait time, then mark as ready
      setTimeout(() => setPageReady(true), 200);
    }
  }, [location, displayLocation.pathname, isInitialLoad, setIsRevealed]);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <DiagonalWipe
        phase={phase}
        color="#5168E8"
        onPhaseComplete={handlePhaseComplete}
      />

      {/* Poki Logo — visible while page loads behind the curtain */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000001,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <PokiLogo style={{ width: '180px', height: 'auto', fill: '#EFEBE7' }} />
          </motion.div>
        )}
      </AnimatePresence>

      <Routes location={displayLocation}>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/agency" element={<Agency />} />
        <Route path="/work" element={<Work />} />
        <Route path="/website" element={<Website />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <CmsProvider>
      <PreloaderProvider>
        <Router>
          <AppContent />
        </Router>
      </PreloaderProvider>
    </CmsProvider>
  )
}

export default App
