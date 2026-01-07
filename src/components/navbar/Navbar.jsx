import './Navbar.css'
import PokiLogo from '../../assets/imgs/logo.svg?react'
import Button from '../common/button/Button'
import { useCms } from '../../utils/context'
import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const { data } = useCms()
  const countMeInUrl = data?.hero?.countMeInUrl || '#'
  const [dark, setDark] = useState(false)
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

  return (
    <nav ref={navRef} className={`navbar ${dark ? 'dark' : ''}`}>
      <div className="navLinks">
        <a>work</a>
        <a>about</a>
        <a>i'm an agency</a>
      </div>
      {/* <img src={logo} alt="logo" className="logo" /> */}
      <PokiLogo className="logo" />
      <Button text="count me in" href={countMeInUrl} />
    </nav>
  )
}
