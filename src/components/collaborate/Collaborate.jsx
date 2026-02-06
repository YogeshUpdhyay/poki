import './Collaborate.css'
import Button from '../common/button/Button'
import collaborateCartoon from '../../assets/svgs/collaborate/collaborateCartoon.svg'
import { useState, useEffect } from 'react'
import {
  useFloating,
  useClientPoint,
  offset,
  autoUpdate,
  useInteractions,
} from "@floating-ui/react";

import { useCms } from '../../utils/context'

export default function Collaborate() {
  const { data } = useCms();
  const countMeInUrl = data?.hero?.countMeInUrl;

  return (
    <section className="letsCollab" data-navbar="dark">
      <div className="collabHeadline">
        <CollabHeadline />
      </div>
      <div className="collabText">
        We collaborate with agencies on recurring projects 
        with partner pricing, and we’re just as excited to 
        take on one-time projects. Whatever you need, 
        we’ve got you covered.
      </div>
      <div className="collabButtons">
        <Button text='start a project' href={countMeInUrl} />
        <Button text={`i'm an agency`} color='green' href="/agency" />
      </div>
    </section>
  )
}

function CollabHeadline() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsive line breaks
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset({
      mainAxis: -40,
      crossAxis: 70
    })],
    whileElementsMounted: autoUpdate,
  });

  const clientPoint = useClientPoint(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    clientPoint,
  ]);

  return (
    <h1 className="headlineText large">
      <span 
        className="headlineWrapper" 
        ref={refs.setReference}
        {...getReferenceProps({
          onMouseEnter: () => setOpen(true),
          onMouseLeave: () => setOpen(false),
        })}
      >
        <span className="headlineHighlight">let's</span>{isMobile ? <br /> : ' '}collaborate 
        <img
          src={collaborateCartoon}
          alt="collaborateCartoon"
          className="collaborateCartoon"
        />
      </span>

      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps({
            className: "tooltip green",
          })}
        >
          start a project
        </div>)}
    </h1>
  )
}
