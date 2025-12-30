import './Projects.css'
import ProjectHeadline from '../projectheadline/ProjectHeadline'
import ProjectCard from '../projectcard/ProjectCard'
import Button from '../common/button/Button'
import projectBackground from "../../assets/imgs/projectBg.svg"
import { useCms } from '../../utils/context'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}

function Projects() {
  const { data } = useCms();
  // read projects from CMS data, fallback to a single sample
  const projects = (data && data.projects && data.projects.length) ? data.projects : [{ title: 'begun', image: projectBackground }]

  return (
    <section className="projects">
      <ProjectHeadline />
      <img src={projectBackground} alt="projectBackground" className='projectBg'/>
      <Carousel 
        className="projectCarousel" 
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={false}
        showDots={false}
        draggable={true}
        swipeable={true}
      >
        {projects.map((project, index) => (
          <ProjectCard 
            key={index}
            title={project.title}
            image={project.image}
            alt={`${project.title} project image`}
          />
        ))}
      </Carousel>
      <div className="projectButtonContainer">
        <Button text="view all projects" />
      </div>
    </section>
  )
}

export default Projects

