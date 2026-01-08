import './About.css'
import Navbar from '../../components/navbar/Navbar'
import AboutHero from '../../components/about/AboutHero'
import AboutImage from '../../components/about/AboutImage'
import AboutContent from '../../components/about/AboutContent'

function About() {
  return (
    <div className="about">
        <Navbar />
        <AboutHero />
        <AboutImage />
        <AboutContent />
    </div>
  )
}

export default About
