import './Projects.css'
import ProjectHeadline from '../projectheadline/ProjectHeadline'
import ProjectCard from '../projectcard/ProjectCard'
import Button from '../button/Button'
import projectBackground from "../../assets/imgs/projectBg.svg"
import projectCardImg from "../../assets/imgs/projectImg.png"

function Projects() {
  // Sample project data - you can replace this with your actual project data
  const projects = [
    { title: 'begun', image: projectCardImg },
  ]

  return (
    <section className="projects">
      <ProjectHeadline />
      <img src={projectBackground} alt="projectBackground" className='projectBg'/>
      <div className="projectCarousel">
        {projects.map((project, index) => (
          <ProjectCard 
            key={index}
            title={project.title}
            image={project.image}
            alt={`${project.title} project image`}
          />
        ))}
      </div>
      <div className="projectButtonContainer">
        <Button text="view all projects" />
      </div>
    </section>
  )
}

export default Projects

