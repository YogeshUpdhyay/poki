
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
  const [isBlinking, setIsBlinking] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [pageReady, setPageReady] = useState(false);
  const { setIsRevealed } = usePreloader();
  const pendingRef = useRef(null);
  const waitingForLoadRef = useRef(false);

  const logoVisibleSinceRef = useRef(0);

  const triggerReveal = useCallback(() => {
    // Ensure logo has been visible for at least 800ms
    const elapsed = Date.now() - logoVisibleSinceRef.current;
    const remaining = Math.max(0, 800 - elapsed);

    setTimeout(() => {
      // 1. Stop blinking and start fading out (duration is 0.3s)
      setIsBlinking(false);

      // 2. Wait exactly for the fade out to finish
      setTimeout(() => {
        setShowLogo(false); // Safely remove from DOM now that it's invisible
        document.body.classList.remove('splash-loading');
        setPhase('revealing'); // Start wiping
      }, 300);

    }, remaining);
  }, []);

  // Detect when page assets (images, videos) are fully loaded
  useEffect(() => {
    let checkInterval;
    let fallbackTimeout;
    setPageReady(false); // Mark new page as not ready immediately

    const checkAssets = () => {
      if (document.readyState !== 'complete') return;

      const images = Array.from(document.querySelectorAll('img:not([loading="lazy"])'));
      const videos = Array.from(document.querySelectorAll('video[autoplay]'));

      const allImagesReady = images.every(img => img.complete);
      const allVideosReady = videos.every(vid => vid.readyState >= 3);

      if (allImagesReady && allVideosReady) {
        completeLoad();
      }
    };

    const completeLoad = () => {
      setPageReady(true);
      clearInterval(checkInterval);
      clearTimeout(fallbackTimeout);
    };

    checkAssets();
    checkInterval = setInterval(checkAssets, 150);
    fallbackTimeout = setTimeout(completeLoad, 6000); // 6s max delay

    return () => {
      clearInterval(checkInterval);
      clearTimeout(fallbackTimeout);
    };
  }, [displayLocation]);

  // When page is ready AND we're waiting, trigger the reveal
  useEffect(() => {
    if (pageReady && waitingForLoadRef.current) {
      waitingForLoadRef.current = false;
      triggerReveal();
    }
  }, [pageReady, triggerReveal]);

  const handlePhaseComplete = useCallback((completedPhase) => {
    if (completedPhase === 'painting') {
      setShowLogo(true);
      setIsBlinking(true); // Start blinking
      logoVisibleSinceRef.current = Date.now();

      if (pendingRef.current) {
        setDisplayLocation(pendingRef.current);
        pendingRef.current = null;
        waitingForLoadRef.current = true;
      } else {
        if (pageReady) {
          triggerReveal();
        } else {
          waitingForLoadRef.current = true;
        }
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

      // For SPA route changes: the new components mount, but we wait for their assets
      // (This old artificial timeout is removed; the displayLocation hook handles it securely now)
    }
  }, [location, displayLocation.pathname, isInitialLoad, setIsRevealed]);

  return (
    <>
      <ScrollToTop location={displayLocation} />
      <Navbar location={displayLocation} />
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
            animate={{
              opacity: isBlinking ? [0.3, 1, 0.3] : 0,
              scale: isBlinking ? 1 : 0.95
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              opacity: isBlinking
                ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                : { duration: 0.3, ease: 'easeOut' },
              scale: { duration: 0.4, ease: 'easeOut' }
            }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10000002,
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
