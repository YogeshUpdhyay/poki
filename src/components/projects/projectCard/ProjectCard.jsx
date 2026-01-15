import './ProjectCard.css';
import { motion } from 'framer-motion';

const ProjectCard = ({ image, title, category, size = 'medium', index = 0 }) => {
  return (
    <motion.div 
      className={`project-card project-card--${size}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
    >
      <div className="project-card__image-wrapper">
        <img 
          src={image} 
          alt={title} 
          className="project-card__image"
        />
        <div className="project-card__overlay">
          <div className="project-card__content">
            <h3 className="project-card__title">{title}</h3>
            <p className="project-card__category">{category}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
