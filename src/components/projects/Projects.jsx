import './Projects.css'
import Button from '../common/button/Button'
import projectBackground from "../../assets/imgs/projectBg.svg"
import { useCms } from '../../utils/context'
import 'react-multi-carousel/lib/styles.css';
import { Headline, popInVariants } from '../common/headline/Headline'
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
      <ProjectsCarousel projects={projects} />
      <div className="projectButtonContainer">
        <Button text="view all projects" href="/work" />
      </div>
    </section>
  )
}

const ProjectsCarousel = ({projects}) => { 
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  // track motion value (x translate)
  const x = useMotionValue(0);

  // autoplay state
  const [dragging, setDragging] = useState(false);
  const [halfWidth, setHalfWidth] = useState(0);

  useLayoutEffect(() => {
    if (!trackRef.current) return;

    const measure = () => {
      const full = trackRef.current.scrollWidth; // includes duplicates
      setHalfWidth(full / 2);
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  // autoplay: move left at constant speed; wrap seamlessly
  const speedPxPerSec = 150; // tweak: higher = faster
  const [wrapTick, setWrapTick] = useState(0);
  useAnimationFrame((t, delta) => {
    if (!halfWidth) return;
    if (dragging) return;

    const dx = (speedPxPerSec * delta) / 1000; // pixels this frame
    const rawNext  = x.get() - dx;

    // wrap detection (we expect x to stay in [-halfWidth, 0))
    const didWrap = rawNext < -halfWidth || rawNext >= 0;

    const next = modRange(rawNext, -halfWidth, 0);
    x.set(next);

    if (didWrap) setWrapTick((v) => v + 1);
  });

  // drag constraints: allow free dragging (we’ll wrap on end)
  const onDragStart = () => setDragging(true);
  const onDragEnd = () => {
    setDragging(false);
    if (!halfWidth) return;

    // After drag, snap x back into [-halfWidth, 0)
    x.set(modRange(x.get(), -halfWidth, 0));
  };

  return (
    <motion.div className="projectCarousel"  ref={containerRef}>
      <motion.div
        ref={trackRef}
        drag="x"
        dragElastic={0.08}
        dragMomentum={true}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        style={{
          x,
          display: "flex",
          cursor: dragging ? "grabbing" : "grab",
          userSelect: "none",
        }}
      >
        {projects.map((project, index) => (
        <ProjectCard 
          key={index}
          title={project.title}
          image={project.image}
          alt={`${project.title} project image`}
          wrapTick={wrapTick}
        />
      ))}
      {projects.map((project, index) => (
        <ProjectCard 
          key={index+projects.length}
          title={project.title}
          image={project.image}
          alt={`${project.title} project image`}
          wrapTick={wrapTick}
        />
      ))}
      {projects.map((project, index) => (
        <ProjectCard 
          key={index+projects.length*2}
          title={project.title}
          image={project.image}
          alt={`${project.title} project image`}
          wrapTick={wrapTick}
        />
      ))}
      </motion.div>
    </motion.div>
  )
}

function modRange(x, min, max) {
  // keeps x in [min, max)
  const range = max - min;
  return ((((x - min) % range) + range) % range) + min;
}

function ProjectCard({ title, image, alt, wrapTick }) {
  const ref = useRef(null);

  // When the card is visible, it rises to y=0; when not, it sits lower (falls).
  const inView = useInView(ref, {
    margin: "-10% 0px -10% 0px",
    amount: 0.3,
  });

  const [suppress, setSuppress] = useState(false);
  useEffect(() => {
    setSuppress(true);
    const id = requestAnimationFrame(() => setSuppress(false));
    return () => cancelAnimationFrame(id);
  }, [wrapTick]);

  return (
    <motion.div 
      className="projectCard"
      ref={ref}
      initial={false}
      animate={inView ? "in" : "out"}
      variants={{
        out: { y: 140, opacity: 1 },
        in: { y: 0, opacity: 1 },
      }}
        transition={
        suppress
          ? { duration: 0 } // kills the “everyone re-animates” moment
          : { type: 'tween', ease: 'easeOut', duration: 1 } // your normal speed
      }
    >
      <img src={image} alt={alt || "projectCardImage"} className="projectCardImage" />
      <div className="projectCardTitle">
        {title}
      </div>
    </motion.div>
  )
}

export default Projects

