import './Navbar.css'
import PokiLogo from '../../assets/imgs/logo.svg?react'
import Button from '../common/button/Button'
import ButtonImg from '../../assets/imgs/button.svg?react'
import { useCms } from '../../utils/context'
import { useEffect, useRef, useState } from 'react'
import footerSvg from '../../assets/svgs/footer/footer.svg'
import footer1Svg from '../../assets/svgs/footer/footer1.svg'
import { Link, useLocation } from 'react-router-dom'
import { usePreloader } from '../../utils/PreloaderContext'
import { motion, AnimatePresence } from 'framer-motion'

// Animation variants for staggered menu items
const overlayVariants = {
  hidden: { y: '-100%' },
  visible: { 
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 200,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: { 
    y: '-100%',
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
}

export default function Navbar({ location: locationProp }) {
  const { data } = useCms()
  const immediateLocation = useLocation()
  const location = locationProp || immediateLocation
  const { isRevealed } = usePreloader()
  const countMeInUrl = data?.hero?.countMeInUrl || '#'
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  // Get current page class (e.g., /about -> page-about)
  const pageClass = location.pathname === '/' ? 'page-home' : `page-${location.pathname.substring(1).replace(/\//g, '-')}`

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-navbar="dark"]')
      if (!sections || sections.length === 0) {
        setDark(false)
        return
      }

      // Check if any dark section overlaps with navbar bounds (top 0-64px of viewport)
      let isDark = false
      const navbarBottom = 64 // navbar height

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        // Check if section top is above navbar bottom and section bottom is below navbar top
        if (rect.top < navbarBottom && rect.bottom > 0) {
          isDark = true
        }
      })

      setDark(isDark)
    }

    window.addEventListener('scroll', handleScroll)

    // Call handleScroll whenever location changes or page is revealed
    if (isRevealed) {
      // Use requestAnimationFrame to ensure DOM is updated before checking
      requestAnimationFrame(() => {
        handleScroll()
      })
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname, isRevealed]) // Re-run when route changes or revealed

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.touchAction = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.touchAction = 'unset'
    }
  }, [menuOpen])

  return (
    <>
      <nav ref={navRef} className={`navbar ${dark ? 'dark' : ''} ${pageClass} ${menuOpen ? 'menu-open-active' : ''}`}>
        {/* Hamburger Menu Button - Hidden on desktop */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
        </button>

        {/* Desktop Nav Links */}
        <div className="navLinks-desktop">
          <Link to="/work">work</Link>
          <Link to="/about">about</Link>
          <Link to="/agency">i'm an agency</Link>
        </div>

        {/* Logo */}
        <Link to="/" className="logo-link">
          <PokiLogo className={`logo ${dark ? 'dark' : ''}`} />
        </Link>

        {/* Desktop CTA */}
        <div className="navbar-cta-desktop">
          <Button text="count me in" href={countMeInUrl} />
        </div>

        {/* Mobile CTA (Elevated via z-index in CSS) */}
        <a href={countMeInUrl} className={`navbar-cta-mobile ${menuOpen ? 'menu-open-cta' : ''}`} aria-label="count me in">
          <ButtonImg className="navbar-button-img" />
        </a>
      </nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="menu-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Navigation Links centered in overlay */}

            {/* Centered Navigation Links */}
            <div className="menu-content">
              <motion.div variants={itemVariants}>
                <Link to="/work" onClick={() => setMenuOpen(false)}>work</Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link to="/about" onClick={() => setMenuOpen(false)}>about</Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link to="/agency" onClick={() => setMenuOpen(false)}>i'm an agency</Link>
              </motion.div>
            </div>

            {/* Overlay Footer: Socials & Logo */}
            <motion.div className="menu-footer" variants={itemVariants}>
              <div className="menu-socials">
                <a href="https://instagram.com/pokistudios" target="_blank" rel="noreferrer">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 16C20 16.7911 19.7654 17.5645 19.3259 18.2223C18.8864 18.8801 18.2616 19.3928 17.5307 19.6955C16.7998 19.9983 15.9956 20.0775 15.2196 19.9231C14.4437 19.7688 13.731 19.3878 13.1716 18.8284C12.6122 18.269 12.2312 17.5563 12.0769 16.7804C11.9225 16.0044 12.0017 15.2002 12.3045 14.4693C12.6072 13.7384 13.1199 13.1136 13.7777 12.6741C14.4355 12.2346 15.2002 12 16 12C17.0609 12 18.0783 12.4214 18.8284 13.1716C19.5786 13.9217 20 14.9391 20 16ZM29 10V22C28.998 23.8559 28.2599 25.6352 26.9476 26.9476C25.6352 28.2599 23.8559 28.998 22 29H10C8.14409 28.998 6.36477 28.2599 5.05245 26.9476C3.74012 25.6352 3.00199 23.8559 3 22V10C3.00199 8.14409 3.74012 6.36477 5.05245 5.05245C6.36477 3.74012 8.14409 3.00199 10 3H22C23.8559 3.00199 25.6352 3.74012 26.9476 5.05245C28.2599 6.36477 28.998 8.14409 29 10ZM22 16C22 14.8133 21.6481 13.6533 20.9888 12.6666C20.3295 11.6799 19.3925 10.9108 18.2961 10.4567C17.1997 10.0026 15.9933 9.88378 14.8295 10.1153C13.6656 10.3468 12.5965 10.9182 11.7574 11.7574C10.9182 12.5965 10.3468 13.6656 10.1153 14.8295C9.88378 15.9933 10.0026 17.1997 10.4567 18.2961C10.9108 19.3925 11.6799 20.3295 12.6666 20.9888C13.6533 21.6481 14.8133 22 16 22C17.5908 21.9983 19.116 21.3657 20.2408 20.2408C21.3657 19.116 21.9983 17.5908 22 16ZM25 8.5C25 8.20333 24.912 7.91332 24.7472 7.66664C24.5824 7.41997 24.3481 7.22771 24.074 7.11418C23.7999 7.00065 23.4983 6.97094 23.2074 7.02882C22.9164 7.0867 22.6491 7.22956 22.4393 7.43934C22.2296 7.64912 22.0867 7.91639 22.0288 8.20736C21.9709 8.49834 22.0007 8.79994 22.1142 9.07403C22.2277 9.34811 22.42 9.58238 22.6666 9.7472C22.9133 9.91203 23.2033 10 23.5 10C23.8978 10 24.2794 9.84196 24.5607 9.56066C24.842 9.27936 25 8.89782 25 8.5Z" fill="var(--color-white)" />
                  </svg>
                </a>
                <a href="https://linkedin.com/company/pokistudios" target="_blank" rel="noreferrer">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V27C3 27.5304 3.21071 28.0391 3.58579 28.4142C3.96086 28.7893 4.46957 29 5 29H27C27.5304 29 28.0391 28.7893 28.4142 28.4142C28.7893 28.0391 29 27.5304 29 27V5C29 4.46957 28.7893 3.96086 28.4142 3.58579C28.0391 3.21071 27.5304 3 27 3ZM12 22C12 22.2652 11.8946 22.5196 11.7071 22.7071C11.5196 22.8946 11.2652 23 11 23C10.7348 23 10.4804 22.8946 10.2929 22.7071C10.1054 22.5196 10 22.2652 10 22V14C10 13.7348 10.1054 13.4804 10.2929 13.2929C10.4804 13.1054 10.7348 13 11 13C11.2652 13 11.5196 13.1054 11.7071 13.2929C11.8946 13.4804 12 13.7348 12 14V22ZM11 12C10.7033 12 10.4133 11.912 10.1666 11.7472C9.91997 11.5824 9.72771 11.3481 9.61418 11.074C9.50065 10.7999 9.47094 10.4983 9.52882 10.2074C9.5867 9.91639 9.72956 9.64912 9.93934 9.43934C10.1491 9.22956 10.4164 9.0867 10.7074 9.02882C10.9983 8.97094 11.2999 9.00065 11.574 9.11418C11.8481 9.22771 12.0824 9.41997 12.2472 9.66665C12.412 9.91332 12.5 10.2033 12.5 10.5C12.5 10.8978 12.342 11.2794 12.0607 11.5607C11.7794 11.842 11.3978 12 11 12ZM23 22C23 22.2652 22.8946 22.5196 22.7071 22.7071C22.5196 22.8946 22.2652 23 22 23C21.7348 23 21.4804 22.8946 21.2929 22.7071C21.1054 22.5196 21 22.2652 21 22V17.5C21 16.837 20.7366 16.2011 20.2678 15.7322C19.7989 15.2634 19.163 15 18.5 15C17.837 15 17.2011 15.2634 16.7322 15.7322C16.2634 16.2011 16 16.837 16 17.5V22C16 22.2652 15.8946 22.5196 15.7071 22.7071C15.5196 22.8946 15.2652 23 15 23C14.7348 23 14.4804 22.8946 14.2929 22.7071C14.1054 22.5196 14 22.2652 14 22V14C14.0012 13.7551 14.0923 13.5191 14.256 13.3369C14.4197 13.1546 14.6446 13.0388 14.888 13.0114C15.1314 12.9839 15.3764 13.0468 15.5765 13.188C15.7767 13.3292 15.918 13.539 15.9738 13.7775C16.6502 13.3186 17.4389 13.0526 18.2552 13.0081C19.0714 12.9637 19.8844 13.1424 20.6067 13.5251C21.329 13.9078 21.9335 14.48 22.3551 15.1803C22.7768 15.8806 22.9997 16.6825 23 17.5V22Z" fill="var(--color-white)" />
                  </svg>
                </a>
              </div>
              <img src={footer1Svg} alt="Poki" className="menu-footer-svg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
