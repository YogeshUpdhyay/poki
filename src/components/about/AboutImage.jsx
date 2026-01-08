import aboutHeroImg from '../../assets/imgs/about/about.png'

function AboutImage() {
  return (
    <section className="aboutImage" data-navbar="dark">
      <img 
        src={aboutHeroImg} 
        alt="aboutHeroImg" 
        className='aboutHeroImg' 
      />
    </section>
  )
}

export default AboutImage
