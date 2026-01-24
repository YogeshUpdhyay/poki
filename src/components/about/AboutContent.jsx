import AboutFlexItem from './AboutFlexItem'
import warmingUpFlex from '../../assets/svgs/about/warmingUp.svg'
import aFullHomeFlex from '../../assets/svgs/about/afullhome.svg'
import nailedItFlex from '../../assets/svgs/about/nailedit.svg'
import seprator from '../../assets/svgs/about/seprator.svg'

function AboutContent() {
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
      </div>
      <AboutFlexItem 
        title="6+ years"
        svg={warmingUpFlex}
        r="-50%"
        text="With 6 years behind us, we've mastered the processes and skills to create designs that work anywhere in the world."
        extraClass="yearsItem"
      />
      <img 
        src={seprator} 
        alt="seprator" 
        className="aboutSeprator" 
      />
      <AboutFlexItem 
        title="400+ brands"
        svg={aFullHomeFlex}
        r="-70%"
        text="Over 400 brands, each with a story we brought to life, turning bold ideas into designs that move people and markets."
        extraClass="brandsItem"
      />
      <img 
        src={seprator} 
        alt="seprator" 
        className="aboutSeprator" 
      />
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
