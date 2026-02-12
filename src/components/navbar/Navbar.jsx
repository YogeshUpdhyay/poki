import './Navbar.css'
import PokiLogo from '../../assets/imgs/logo.svg?react'
import Button from '../common/button/Button'
import buttonImg from '../../assets/imgs/button.png'
import { useCms } from '../../utils/context'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { usePreloader } from '../../utils/PreloaderContext'

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

  return (
    <>
      {/* Backdrop overlay - shown when menu is open */}
      {menuOpen && (
        <div 
          className="menu-backdrop" 
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav ref={navRef} className={`navbar ${dark ? 'dark' : ''} ${pageClass}`}>
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
        <div className={`navLinks ${menuOpen ? 'open' : ''}`}>
          <Link to="/work" onClick={() => setMenuOpen(false)}>work</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>about</Link>
          <Link to="/agency" onClick={() => setMenuOpen(false)}>i'm an agency</Link>
        </div>

        {/* Logo */}
        <Link to="/" className="logo-link">
          <PokiLogo className={`logo ${dark ? 'dark' : ''}`} />
        </Link>

        {/* Desktop Button - Full text button */}
        <div className="navbar-cta-desktop">
          <Button text="count me in" href={countMeInUrl} />
        </div>

        {/* Mobile Button - Image button */}
        <a href={countMeInUrl} className="navbar-cta-mobile">
          <img src={buttonImg} alt="count me in" className="navbar-button-img" />
        </a>
      </nav>
    </>
  )
}
