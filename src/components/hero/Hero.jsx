import './Hero.css'
import Navbar from '../navbar/Navbar'
import HeadlineContainer from '../headlinecontainer/HeadlineContainer'
import heroBackgroundMedia from '../../assets/imgs/heroBackground.png'

function Hero() {
  return (
    <div className="hero">
      <img 
        className="heroBackgroundMedia" 
        src={heroBackgroundMedia} 
        alt="heroBackgroundMedia" 
      />
      <Navbar />
      <HeadlineContainer />
    </div>
  )
}

export default Hero

