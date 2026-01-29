import { Headline } from '../common/headline/Headline'
import aboutHeroCartoon from '../../assets/svgs/about/heroCartoon.svg'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'

function AboutHeadline() {
  const { ref, inView } = useInView({
    threshold: 0.5,
  })

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
    <div className="aboutHeadline">
        <Headline 
            lines={isMobile ? mobileLines : desktopLines}
            highlight="shine"
            tooltip="we put the 'fun' in functional design"
            tooltipColor="blue"
            forceOpen={true}
        >
        <img 
            src={aboutHeroCartoon} 
            alt="aboutHeroCartoon" 
            className={`aboutHeroCartoon ${inView ? 'scaleInAnimation' : ''}`}
            ref={ref}
        />
        </Headline>
    </div>
  )
}

export default AboutHeadline
