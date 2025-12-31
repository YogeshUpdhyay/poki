import './Hero.css'
import logo from '../../assets/imgs/logo.svg'
import Button from '../common/button/Button'
import heroBackgroundMedia from '../../assets/imgs/heroBackground.png'
import heroCartoon from '../../assets/imgs/heroCartoon.svg'
import Star from '../star/star'
import AnimatedSvgLine from '../common/animatedSvgLine/animatedSvgLine'
import HeroUnderline from "../../assets/underlines/heroUnderline.svg?react";
import { Headline } from '../common/headline/Headline';
import { useCms } from '../../utils/context'
import { useInView } from "react-intersection-observer";

function Hero() {
  const { data } = useCms()
  const heroData = data?.hero || {}
  const lines = heroData.lines || ['we make your brand,', 'sharper and louder']
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
      <Navbar countMeInUrl={countMeInUrl} />
      <div className='heroHeadline'>
        <HeroHeadline lines={lines} highlight={highlight}/>
      </div>
    </div>
  )
}

function Navbar({ countMeInUrl }) {
  return (
    <nav className="navbar">
      <div className="navLinks">
        <a>work</a>
        <a>about</a>
        <a>i'm an agency</a>
      </div>
      <img src={logo} alt="logo" className="logo" />
      <Button text="count me in" href={countMeInUrl} />
    </nav>
  )
}

function HeroHeadline({lines, highlight}) {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.5,
  });
  
  return (
    <Headline lines={lines} highlight={highlight}>
      <img
        src={heroCartoon}
        alt="heroCartoon"
        className={`heroCartoon ${inView ? 'scaleInAnimation' : ''}`}
        ref={ref}
      />

      <div className="heroStar">
        <Star />
      </div>

      <div className="heroUnderlinePosition">
        <AnimatedSvgLine Svg={HeroUnderline} />
      </div>
    </Headline>
  )
}

export default Hero

