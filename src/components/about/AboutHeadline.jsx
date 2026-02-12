import { motion } from 'framer-motion'
import { Headline, letterVariants } from '../common/headline/Headline'
import aboutHeroCartoon from '../../assets/svgs/about/heroCartoon.svg'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'

function AboutHeadline() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const popInVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  };

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const desktopLines = ['agile design', 'agency. born to', 'make brands shine']
  const mobileLines = ['agile design', 'agency. born', 'to make', 'brands shine']

  return (
    <div className="aboutHeadline" ref={ref}>
        <Headline 
            lines={isMobile ? mobileLines : desktopLines}
            highlight="shine"
            animated={true} 
            // tooltip="we put the 'fun' in functional design"
            // tooltipColor="blue"
        >
        <motion.div 
            variants={letterVariants}
            className="aboutHeroCartoon"
        >
          <img 
              src={aboutHeroCartoon} 
              alt="aboutHeroCartoon" 
              style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </motion.div>
        <motion.div 
            variants={popInVariants}
            className='aboutHeroTooltip tooltip blue'
            style={{ transformOrigin: 'bottom left' }}
        >
          we put the 'fun' in functional design
        </motion.div>
        </Headline>
    </div>
  )
}

export default AboutHeadline
