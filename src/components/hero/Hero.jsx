import './Hero.css'
import heroBackgroundMedia from '../../assets/imgs/heroBackground.png'
import heroCartoon from '../../assets/imgs/heroCartoon.svg'
import yellowStar from '../../assets/imgs/stars/yellow.svg'
import AnimatedSvgLine from '../common/animatedSvgLine/animatedSvgLine'
import HeroUnderline from "../../assets/underlines/heroUnderline.svg?react";
import { motion } from 'framer-motion';
import { Headline, letterVariants } from '../common/headline/Headline';
import { useCms } from '../../utils/context'
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from 'react'
import { usePreloader } from '../../utils/PreloaderContext';

function Hero() {
  const { data } = useCms()
  const heroData = data?.hero || {}
  const [isMobile, setIsMobile] = useState(false)
  
  // Check screen size and update isMobile state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    // Check on mount
    checkMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Use different line breaks based on screen size
  const desktopLines = heroData.lines || ['we make your brand,', 'sharper and louder']
  const mobileLines = ['we make', 'your brand,', 'sharper and', 'louder']
  const lines = isMobile ? mobileLines : desktopLines
  
  const highlight = heroData.highlight || 'sharper'
  const backgroundSrc = heroData.backgroundMedia || heroBackgroundMedia
  const countMeInUrl = heroData.countMeInUrl || '#'

  return (
    <div className="hero">
      <img 
        className="heroBackgroundMedia" 
        src={backgroundSrc} 
        alt="heroBackgroundMedia" 
      />
      <div className='heroHeadline'>
        <HeroHeadline lines={lines} highlight={highlight}/>
      </div>
    </div>
  )
}

// Navbar moved to App.jsx so it sits above the page content

function HeroHeadline({lines, highlight}) {
  const { isRevealed } = usePreloader();
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const shouldAnimate = inView && isRevealed;
  
  const [showUnderline, setShowUnderline] = useState(false);

  useEffect(() => {
    if (shouldAnimate) {
      // Trigger underline after letters/star fly in
      const timer = setTimeout(() => setShowUnderline(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [shouldAnimate]);
  
  return (
    <Headline lines={lines} highlight={highlight} animated={true}>
      <div 
        className={`heroCartoonWrapper ${shouldAnimate ? 'slideInRotateAnimation' : ''}`}
        ref={ref}
      >
        <img
          src={heroCartoon}
          alt="heroCartoon"
          className="heroCartoon"
        />
      </div>

      <motion.div 
        className="heroStar"
        variants={letterVariants}
      >
        <img src={yellowStar} alt="yellowStar"/>
      </motion.div>

      <div className="heroUnderlinePosition">
        <AnimatedSvgLine Svg={HeroUnderline} forceAnimate={showUnderline} />
      </div>
    </Headline>
  )
}

export default Hero

