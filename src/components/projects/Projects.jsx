import './Projects.css'
import Button from '../common/button/Button'
import projectBackground from "../../assets/imgs/projectBg.svg"
import { useCms } from '../../utils/context'
import 'react-multi-carousel/lib/styles.css';
import { Headline, popInVariants } from '../common/headline/Headline'
import { GenericCarousel } from '../../components/common/genericCarousel/GenericCarousel'
import projectsCartoon from "../../assets/imgs/projectsCartoon.svg";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useInView,
} from "framer-motion";
import { useRef, useState, useLayoutEffect, useEffect } from 'react';


function Projects() {
  const { data } = useCms();
  const [isMobile, setIsMobile] = useState(false);
  
  // Check screen size and update isMobile state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on mount
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Original desktop lines (unchanged)
  const originalLines = ['an agency that', 'puts your brand in', 'the spotlight'];
  // Mobile-only 4-line split
  const mobileLines = ['an agency', 'that puts', 'your brand in', 'the spotlight'];
  // Use mobile lines only on mobile, otherwise keep original
  const lines = isMobile ? mobileLines : originalLines;
  
  const highlight = 'spotlight';
  const tooltipText = 'no shadows, only shine';
  const tooltipColor = 'blue';
  const projects = (data && data.projects && data.projects.length) ? data.projects : [{ title: 'begun', image: projectBackground }];
  
  const projectsCartoonRef = useRef(null);
  const projectCartoonInView = useInView(projectsCartoonRef, {
    amoount: 0.5,
  });

  return (
    <section className="projects" data-navbar="dark">
      <Headline lines={lines} highlight={highlight}>
        <img
          src={projectsCartoon}
          alt="projectsCartoon"
          className={`projectsCartoon ${projectCartoonInView ? 'teammateSvgPop' : ''}`}
          ref={projectsCartoonRef}
        />
        <motion.div 
          className="projectsPill"
          initial="hidden"
          animate={projectCartoonInView ? "visible" : "hidden"}
          variants={popInVariants}
          style={{ transformOrigin: 'bottom left' }}
        >
          {tooltipText}
        </motion.div>
      </Headline>
      <img 
        src={projectBackground} 
        alt="projectBackground" 
        className={`projectBg`}
      />
      <div className="projectCarousel">
        <GenericCarousel>
        {projects.map(({title, image}, index) => (
          <ProjectCard 
            key={index}
            title={title}
            image={image}
            alt={`${title} project image`}
            // wrapTick={wrapTick}
          />
        ))}
      </GenericCarousel>
      </div>
      
      <div className="projectButtonContainer">
        <Button text="view all projects" href="/work" />
      </div>
    </section>
  )
}

function ProjectCard({ title, image, alt, wrapTick }) {

  return (
    <div className="projectCard">
      <img src={image} alt={alt || "projectCardImage"} className="projectCardImage" />
      <div className="projectCardTitle">{title}</div>
    </div>
  )
}

export default Projects

