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
import TeammateTwoImage from '../../assets/imgs/teammateTwo.png'
import TeammateThreeImage from '../../assets/imgs/teammateThree.png'
import TeammateFourImage from '../../assets/imgs/teammateFour.png'
import TeammateFiveImage from '../../assets/imgs/teammateFive.png'
import TeammateSixImage from '../../assets/imgs/teammateSix.png'
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
  const teammates = [
    { imageSrc: TeammateOneIamge, tooltipText: 'Robin | Co-founder' },
    { imageSrc: TeammateTwoImage, tooltipText: 'Asha | Product' },
    { imageSrc: TeammateThreeImage, tooltipText: 'Kunal | Engineering' },
    { imageSrc: TeammateFourImage, tooltipText: 'Meera | Design' },
    { imageSrc: TeammateFiveImage, tooltipText: 'Sahil | Growth' },
    { imageSrc: TeammateSixImage, tooltipText: 'Nisha | Ops' },
  ]

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
      <Teammates teammates={teammates} />
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

const Teammates = ({ teammates = [] }) => {
  const svgList = [
    TeammateOneSvg,
    TeammateTwoSvg,
    Teammate3Svg,
    Teammate4Svg,
    Teammate5Svg,
    Teammate6Svg,
  ]

  const rOverrides = [undefined, 0.3, 0.4, undefined, undefined, undefined]

  return(
    <div className="teammates">
      <img src={TeamGreenBlob} alt="" className="teammateGreenBlob" />
      <img src={TeamPinkBlob} alt="" className="teammatePinkBlob" />

      <div className="teamCols">
        {[0, 1].map((rowIdx) => (
          <div className="teamRow" key={rowIdx}>
            {teammates.slice(rowIdx * 3, rowIdx * 3 + 3).map((t, i) => {
              const idx = rowIdx * 3 + i
              return (
                <TeamMateCard
                  key={idx}
                  svgSrc={svgList[idx]}
                  imageSrc={t.imageSrc}
                  tooltipText={t.tooltipText}
                  svgLeft='80%'
                  svgTop='20%'
                  r={rOverrides[idx]}
                />
              )
            })}
          </div>
        ))}
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
  calloutLeft = '100%',
  calloutRight = 'auto',
  calloutTop = 'auto',
  calloutBottom = 'auto',
}) => {

  return (
    <>
      <div
        className="teammateCard"
        style={{ '--r': r }}
      >
        <div className="teammateImageWrap">
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
          <div 
            className='teammateCallout'
            style={{
              left: calloutLeft ?? 'auto',
              right: calloutRight ?? 'auto',
              top: calloutTop ?? 'auto',
              bottom: calloutBottom ?? 'auto',
            }}
          >
            {tooltipText}
          </div>
        </div>
      </div>
    </>
  )
}

