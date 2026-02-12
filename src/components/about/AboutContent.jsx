import AboutFlexItem from './AboutFlexItem'
import warmingUpFlex from '../../assets/svgs/about/warmingUp.svg'
import aFullHomeFlex from '../../assets/svgs/about/afullhome.svg'
import nailedItFlex from '../../assets/svgs/about/nailedit.svg'
import seprator from '../../assets/svgs/about/seprator.svg'
import { motion } from 'framer-motion'
import {popInVariants} from '../common/headline/Headline'
import { useState, useEffect } from 'react'

function AboutContent() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const MobileSeparator = () => (
    <svg className="aboutSeprator" width="322" height="6" viewBox="0 0 322 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 3.42368C120.087 -1.40481 400.312 1.97237 299.533 5" stroke="#EFEBE7" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )

  const DesktopSeparator = () => (
    <img 
      src={seprator} 
      alt="seprator" 
      className="aboutSeprator" 
    />
  )

  return (
    <section className="aboutContent">
      <div className="aboutContentText">
        Founded in 2021, we partner with ambitious startups, founders, and 
        growing businesses to bring clarity, creativity, and conversion-driven 
        design to their biggest opportunities. Whether it's launching a new 
        brand, refining a product, or reimagining online presence, we turn bold 
        ideas into impactful realities. 
        <br />
        <br/>
        We don't just think outside the box — we redesign the box, the logo on 
        it, and the unboxing experience.
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5}}
            variants={popInVariants}
            className='aboutHeroTooltip tooltip pink-pill'
            style={{ transformOrigin: 'bottom left' }}
        >
          ^ and fun
        </motion.div>
      </div>
      <AboutFlexItem 
        title="6+ years"
        svg={warmingUpFlex}
        r="-50%"
        text="With 6 years behind us, we've mastered the processes and skills to create designs that work anywhere in the world."
        extraClass="yearsItem"
      />
      {isMobile ? <MobileSeparator /> : <DesktopSeparator />}
      <AboutFlexItem 
        title="400+ brands"
        svg={aFullHomeFlex}
        r="-70%"
        text="Over 400 brands, each with a story we brought to life, turning bold ideas into designs that move people and markets."
        extraClass="brandsItem"
      />
      {isMobile ? <MobileSeparator /> : <DesktopSeparator />}
      <AboutFlexItem 
        title="600+ projects"
        svg={nailedItFlex}
        r="-100%"
        text="A collection of problems solved, dreams designed, and visions brought to life."
        extraClass="projectsItem"
      />
    </section>
  )
}

export default AboutContent
