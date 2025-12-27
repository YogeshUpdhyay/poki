
import './App.css'
import Hero from './components/hero/Hero'
import Map from './components/map/map'
import Projects from './components/projects/Projects'
import {
  useFloating,
  useClientPoint,
  offset,
  autoUpdate,
  useInteractions,
} from "@floating-ui/react";
import teamCartoon from "./assets/imgs/teamCartoon.svg";
import { useState } from 'react';

function App() {

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
    <>
      <Hero />
      <Projects />
      <section className="team">
        <div className="map">
          <Map />
        </div>
        <div className="teamHeadline">
          <h1 className="headlineText white">
            <span
              className="headlineWrapper"
              ref={refs.setReference}
              {...getReferenceProps({
                onMouseEnter: () => setOpen(true),
                onMouseLeave: () => setOpen(false),
              })}
            >
              a crew of 6 <br />
              <span className="headlineHighlight">dominating</span> the <br />
              whole world

              <img
                src={teamCartoon}
                alt="teamCartoon"
                className="teamCartoon"
              />

            </span>

            {open && (
              <div
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps({
                  className: "tooltip pink",
                })}
              >
                born digital - raised on chai
              </div>)}
          </h1>
        </div>
        <div className="teammates">
          
        </div>
      </section>
    </>
  )
}

export default App
