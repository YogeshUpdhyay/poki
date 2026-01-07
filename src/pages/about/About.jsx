import './About.css'
import Navbar from '../../components/navbar/Navbar'
import { Headline } from '../../components/common/headline/Headline'
import aboutHeroCartoon from '../../assets/svgs/about/heroCartoon.svg'
import aboutHeroImg from '../../assets/imgs/about/about.png'
import { useInView } from 'react-intersection-observer'
import Button from '../../components/common/button/Button'

function About() {
  return (
    <div className="about">
        <Navbar />
        <AboutHero />
        <section className="aboutImage" data-navbar="dark">
            <img 
                src={aboutHeroImg} 
                alt="aboutHeroImg" 
                className='aboutHeroImg' 
            />
        </section>
        <section className="aboutContent">
            <div className="aboutContentText">
                Founded in 2021, we partner with ambitious startups, founders, and 
                growing businesses to bring clarity, creativity, and conversion-driven 
                design to their biggest opportunities. Whether it’s launching a new 
                brand, refining a product, or reimagining online presence, we turn bold 
                ideas into impactful realities. 
                <br />
                We don’t just think outside the box — we redesign the box, the logo on 
                it, and the unboxing experience.
            </div>
        </section>
    </div>
  )
}

function AboutHero() {
  return (
    <section className="aboutHero" data-navbar="dark">
        <AboutHeadline />
        <div className="aboutHeroButton">
            <Button text='the math checks out' color='green'/>
        </div>
    </section>
  )
}

function AboutHeadline() {
  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  return (
    <div className="aboutHeadline">
        <Headline 
            lines={['agile design', 'agency born to', 'make brands shine']}
            highlight="shine"
            tooltip="we put the 'fun' in functional design"
            tooltipColor="blue"
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

export default About
