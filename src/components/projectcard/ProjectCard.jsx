import './ProjectCard.css'

function ProjectCard({ title, image, alt }) {
  return (
    <div className="projectCard">
      <img src={image} alt={alt || "projectCardImage"} className="projectCardImage" />
      <div className="projectCardTitle">
        {title}
      </div>
    </div>
  )
}

export default ProjectCard

