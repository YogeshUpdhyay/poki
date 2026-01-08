import Button from '../common/button/Button'
import AboutHeadline from './AboutHeadline'

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

export default AboutHero
