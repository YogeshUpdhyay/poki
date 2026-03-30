import './Projects.css'
import Button from '../common/button/Button'
import projectBackground from "../../assets/imgs/projectBg.svg"
import { NavLink } from 'react-router-dom'
import { getFeaturedProjects } from '../../data/projectsData'
import { Headline, popInVariants } from '../common/headline/Headline'
import projectsCartoon from "../../assets/imgs/projectsCartoon.svg";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  useFloating,
  useClientPoint,
  offset,
  autoUpdate,
  useInteractions,
} from "@floating-ui/react";
import { useRef, useState, useLayoutEffect, useEffect } from 'react';


function Projects() {
  const featuredProjects = getFeaturedProjects();
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
  const projects = featuredProjects.length ? featuredProjects : [{ slug: 'begun', title: 'begun', cardImage: projectBackground }];

  // Duplicate projects for infinite scroll effect
  const projectsData = [...projects, ...projects, ...projects, ...projects];

  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  // Each project card is min-width: 300px + margin-left: 26px = 326px total per item
  const totalWidth = projects.length * 326;

  useAnimationFrame((t, delta) => {
    // duration in milliseconds: 60s base, 120s on hover
    const duration = isHovered ? 120000 : 60000;
    const speed = totalWidth / duration; // pixels per millisecond

    let newX = x.get() - Math.max(speed * delta, 0);
    if (newX <= -totalWidth) {
      newX += totalWidth;
    }
    x.set(newX);
  });

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
      <div
        className="projectCarousel"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="projectCarouselInner"
          style={{ x }}
        >
          {projectsData.map((project, index) => (
            <ProjectCard
              key={`${project.id || project.slug}-${index}`}
              project={project}
            />
          ))}
        </motion.div>
      </div>

      <div className="projectButtonContainer">
        <Button text="view all projects" href="/work" />
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  const { title, cardImage: image, slug, hero } = project;
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset({
      mainAxis: -40,
      crossAxis: 25
    })],
    whileElementsMounted: autoUpdate,
  });

  const clientPoint = useClientPoint(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    clientPoint,
  ]);

  const tooltipColor = hero?.tooltipColor || 'blue';
  const tooltipText = hero?.tooltipItems?.[0] || title;

  return (
    <>
      <NavLink
        to={`/work/${slug}`}
        className="projectCard"
        style={{
          textDecoration: 'none',
          cursor: "url('/tooltip.svg'), pointer"
        }}
        ref={refs.setReference}
        {...getReferenceProps({
          onMouseEnter: () => setOpen(true),
          onMouseLeave: () => setOpen(false),
        })}
      >
        <img src={image} alt={`${title} project image`} className="projectCardImage" loading="lazy" />
        <div className="projectCardTitle">{title}</div>
      </NavLink>

      <AnimatePresence>
        {open && (
          <div
            ref={refs.setFloating}
            style={{ ...floatingStyles, zIndex: 1000 }}
            {...getFloatingProps()}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={popInVariants}
              className={`tooltip ${tooltipColor}`}
              style={{ transformOrigin: 'bottom left' }}
            >
              {tooltipText}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Projects

