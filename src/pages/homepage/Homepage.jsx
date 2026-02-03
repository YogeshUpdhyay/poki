import Hero from '../../components/hero/Hero'
import Projects from '../../components/projects/Projects'
import Team from '../../components/team/Team'
import BrandNeeds from '../../components/brandNeeds/BrandNeeds'
import Reviews from '../../components/reviews/Reviews'
import Collaborate from '../../components/collaborate/Collaborate'
import Footer from '../../components/footer/Footer'

function Homepage() {
  return (
    <>
      <Hero />
      <Projects />
      <Team />
      <BrandNeeds />
      <Reviews />
      <Collaborate />
      <Footer />
    </>
  )
}

export default Homepage
