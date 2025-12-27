import { useState } from 'react';
import './ProjectHeadline.css'
import {
  useFloating,
  useClientPoint,
  offset,
  autoUpdate,
  useInteractions,
} from "@floating-ui/react";
import projectsCartoon from "../../assets/imgs/projectsCartoon.svg";

function ProjectHeadline() {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(8)], // optional offset
    whileElementsMounted: autoUpdate,
  });

  const clientPoint = useClientPoint(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    clientPoint,
  ]);

  return (
    <h1 className="headlineText">
      <span 
        className="headlineWrapper" 
        ref={refs.setReference}
        {...getReferenceProps({
          onMouseEnter: () => setOpen(true),
          onMouseLeave: () => setOpen(false),
        })}
      >
        an agency that <br />
        puts your brand in <br />
        the <span className="headlineHighlight">spotlight</span>
      
        <img
          src={projectsCartoon}
          alt="projectsCartoon"
          className="projectsCartoon"
        />
      
      </span>

      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps({
            className: "tooltip blue",
          })}
        >
            no shadows, only shine
        </div>)}
    </h1>
  )
}

export default ProjectHeadline

