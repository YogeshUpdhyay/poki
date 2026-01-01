import './Team.css'
import { useState, useRef } from 'react'
import {
  useFloating,
  useClientPoint,
  offset,
  autoUpdate,
  useInteractions,
} from "@floating-ui/react";
import AnimatedSvgLine from '../common/animatedSvgLine/animatedSvgLine'
import TeamUnderline from '../../assets/underlines/teamUnderline.svg?react'
import teamCartoon from '../../assets/imgs/teamCartoon.svg'
import TeamGreenBlob from '../../assets/imgs/teammateGreen.svg'
import TeamPinkBlob from '../../assets/imgs/teammatePink.svg'

import TeammateOneIamge from '../../assets/imgs/teammateOne.png'
import TeammateOneSvg from '../../assets/imgs/teammateOne.svg'
import TeammateTwoSvg from '../../assets/imgs/teammateTwo.svg'
import Teammate3Svg from '../../assets/imgs/teammate3.svg'
import Teammate4Svg from '../../assets/imgs/teammate4.svg'
import Teammate5Svg from '../../assets/imgs/teammate5.svg'
import Teammate6Svg from '../../assets/imgs/teammate6.svg'
import WorldMap from '../../assets/world.svg?react'

import { Headline } from '../common/headline/Headline';
import { useInView } from 'framer-motion';

export default function Team() {
  const teamCartoonRef = useRef(null);
  const teamCartoonInView = useInView(teamCartoonRef, {
    amoount: 0.3,
  });
  const lines = ['a crew of 6', 'dominating', 'the whole world']
  const highlight = 'dominating'

  return (
    <section className="team">
      <div className="map">
        <Map />
      </div>
      <div className="teamHeadline">
        <Headline 
          lines={lines} 
          highlight={highlight} 
          tooltip="born digital - raised on chai"
          tooltipColor="pink"
        >
          <img
            src={teamCartoon}
            alt="teamCartoon"
            className={`teamCartoon ${teamCartoonInView ? 'scaleInAnimation' : ''}`}
            ref={teamCartoonRef}
          />

          <div className="teamUnderline">
            <AnimatedSvgLine Svg={TeamUnderline} />
          </div>
        </Headline>
      </div>
      <Teammates />
    </section>
  )
}

const Map = () => {
  const [hoveredInfo, setHoveredInfo] = useState(null);
  const [open , setOpen] = useState(false);
  const lastPathIdRef = useRef(null);

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

  function findPathEl(target) {
    let el = target;
    while (el && el.tagName && el.tagName.toLowerCase() !== "path") {
      // stop if we reached the svg root (optional)
      if (el.tagName.toLowerCase() === "svg") return null;
      el = el.parentNode;
    }
    return el && el.tagName?.toLowerCase() === "path" ? el : null;
  }

  function onMouseMove(e) {
    const pathEl = findPathEl(e.target);

    if (!pathEl) {
      if (lastPathIdRef.current !== null) {
        console.log("Moved off paths");
        lastPathIdRef.current = null;
        setOpen(false);
        setHoveredInfo(null);
      }
      return;
    }

    // choose a stable identity (id is best; fallback if needed)
    const id = pathEl.id || pathEl.getAttribute("data-id") || "__no_id__";

    // only update when path actually changed
    if (lastPathIdRef.current === id) return;

    lastPathIdRef.current = id;

    const info = {
      id: pathEl.id || null,
      dataName: pathEl.getAttribute("title") || pathEl.getAttribute("name") || null,
    };

    console.log("Switched to path:", info);
    setHoveredInfo(info);
    setOpen(true);
  }

  function onMouseLeave() {
    console.log("Mouse left the map");
    lastPathIdRef.current = null;
    setOpen(false);
    setHoveredInfo(null);
  }

  return (
    <div className="mapContainer">
      <WorldMap 
        ref={refs.setReference} 
        {...getReferenceProps({
          onMouseMove: onMouseMove,
          onMouseLeave: onMouseLeave,
        })}
        className="mapSVG" 
        id='worldMap' 
      />
      {open && hoveredInfo && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps({
            className: 'tooltip orange',
          })}
        >
          {`${hoveredInfo?.dataName || ''} | 320 projects`}
        </div>
      )}
    </div>
  )
}

const Teammates = () => {
  return(
    <div className="teammates">
      <img src={TeamGreenBlob} alt="" className="teammateGreenBlob" />
      <img src={TeamPinkBlob} alt="" className="teammatePinkBlob" />

      <div className="teamCols">
        <div className="teamRow">
          <TeamMateCard svgSrc={TeammateOneSvg} svgLeft='80%' svgTop='20%' />
          <TeamMateCard svgSrc={TeammateTwoSvg} svgLeft='80%' svgTop='20%' r={0.3}/>
          <TeamMateCard svgSrc={Teammate3Svg} svgLeft='80%' svgTop='20%' r={0.4}/>
        </div>
        <div className="teamRow">
          <TeamMateCard svgSrc={Teammate4Svg} svgLeft='80%' svgTop='20%'/>
          <TeamMateCard svgSrc={Teammate5Svg} svgLeft='80%' svgTop='20%'/>
          <TeamMateCard svgSrc={Teammate6Svg} svgLeft='80%' svgTop='20%'/>
        </div>
      </div>
    </div>
  )
}


const TeamMateCard = ({
  svgSrc = TeammateOneSvg,
  imageSrc = TeammateOneIamge,
  tooltipText = 'Robin | Co-founder',
  svgLeft = 'auto',
  svgRight = 'auto',
  svgTop = 'auto',
  svgBottom = 'auto',
  r = 0.6,
}) => {
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
      <div
        className="teammateCard"
        ref={refs.setReference}
        {...getReferenceProps({
          onMouseEnter: () => setOpen(true),
          onMouseLeave: () => setOpen(false),
        })}
        style={{ '--r': r }}
      >
        <img src={imageSrc} alt="teammateImage" className="teammateCardImage" />
        <img
          src={svgSrc}
          alt="teammateSvg"
          style={{
            position: 'absolute',
            left: svgLeft ?? 'auto',
            right: svgRight ?? 'auto',
            top: svgTop ?? 'auto',
            bottom: svgBottom ?? 'auto',
          }}
        />
      </div>

      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps({
            className: 'tooltip yellow',
          })}
        >
          {tooltipText}
        </div>
      )}
    </>
  )
}

