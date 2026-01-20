import './Navbar.css'
import PokiLogo from '../../assets/imgs/logo.svg?react'
import Button from '../common/button/Button'
import buttonImg from '../../assets/imgs/button.png'
import { useCms } from '../../utils/context'
import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const { data } = useCms()
  const countMeInUrl = data?.hero?.countMeInUrl || '#'
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

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
    handleScroll() // call once on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

      <nav ref={navRef} className={`navbar ${dark ? 'dark' : ''}`}>
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
          <a href="/work" onClick={() => setMenuOpen(false)}>work</a>
          <a href="/about" onClick={() => setMenuOpen(false)}>about</a>
          <a href="/agency" onClick={() => setMenuOpen(false)}>i'm an agency</a>
        </div>

        {/* Logo */}
        <PokiLogo className={`logo ${dark ? 'dark' : ''}`} />

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
