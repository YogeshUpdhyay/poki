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

import { Headline, popInVariants } from '../common/headline/Headline';
import { motion, AnimatePresence, useInView } from 'framer-motion';

export default function Team() {
  const teamCartoonRef = useRef(null);
  const teamCartoonInView = useInView(teamCartoonRef, {
    amoount: 0.3,
  });
  const lines = ['a crew of 6', 'dominating the', 'whole world']
  const highlight = 'dominating'
  const Separator = (
    <svg style={{margin: '0 3px 0 3px'}} width="2" height="10" viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" width="10" height="1.5" rx="0.75" transform="rotate(90 1.5 0)" fill="#000000ff"/>
    </svg>
  );
  const teammates = {
    1: { image: TeammateOneIamge, tooltip: <>Robin{Separator}Co-founder</>, borderRadius: '18px 18px 18px 0px' },
    2: { image: TeammateTwoImage, tooltip: <>Asha{Separator}Product</>, borderRadius: '100px 100px 100px 0px' },
    3: { image: TeammateThreeImage, tooltip: <>Kunal{Separator}Engineering</>, borderRadius: '18px 18px 18px 0px' },
    4: { image: TeammateFourImage, tooltip: <>Meera{Separator}Design</>, borderRadius: '100px 100px 0px 100px' },
    5: { image: TeammateFiveImage, tooltip: <>Sahil{Separator}Growth</>, borderRadius: '18px 18px 18px 0px' },
    6: { image: TeammateSixImage, tooltip: <>Nisha{Separator}Ops</>, borderRadius: '100px 100px 0px 100px' },
  }

  return (
    <section className="team">
      <div className="map">
        <Map />
      </div>
      <div className="teamHeadline">
        <Headline 
          lines={lines} 
          highlight={highlight}
        >
          <img
            src={teamCartoon}
            alt="teamCartoon"
            className={`teamCartoon ${teamCartoonInView ? 'scaleInAnimation' : ''}`}
            ref={teamCartoonRef}
          />

          <div className="teamPill">
            born digital - raised on chai
          </div>

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
    middleware: [offset({ crossAxis: 90, mainAxis: -40 })], // optional offset
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
        viewBox="0 0 1009.6727 665.96301"
        preserveAspectRatio="xMidYMid meet"
      />
      <AnimatePresence>
        {open && hoveredInfo && (
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
              className='tooltip orange'
              style={{ transformOrigin: 'bottom left' }}
            >
              {hoveredInfo?.dataName || ''} 
              <svg style={{margin: '0 3px 0 3px'}} width="2" height="10" viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.5" width="10" height="1.5" rx="0.75" transform="rotate(90 1.5 0)" fill="#ffffffff"/>
              </svg>
              320 projects
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Teammates = ({ teammates = {} }) => {
  const svgList = [
    TeammateOneSvg,
    TeammateTwoSvg,
    Teammate3Svg,
    Teammate4Svg,
    Teammate5Svg,
    Teammate6Svg,
  ]

  const rOverrides = [0.3, 0.8, 0.55, 0.5, 0.3, 0.55]

  // Ensure we have exactly six items; read numeric keys 1..6 from the object
  const items = [1,2,3,4,5,6].map(i => teammates[i] || { image: undefined, tooltip: '', borderRadius: undefined });

  return(
    <div className="teammates">
      <img src={TeamGreenBlob} alt="" className="teammateGreenBlob" />
      <img src={TeamPinkBlob} alt="" className="teammatePinkBlob" />

      <div className="teamCols">
        <div className="teamRow">
          <TeammateCard
            svgSrc={svgList[0]}
            imageSrc={items[0].image}
            tooltipText={items[0].tooltip}
            borderRadius={items[0].borderRadius}
            svgLeft='80%'
            svgTop='20%'
            r={rOverrides[0]}
            calloutLeft='90%'
            calloutTop='80%'
          />

          <TeammateCard
            svgSrc={svgList[1]}
            imageSrc={items[1].image}
            tooltipText={items[1].tooltip}
            borderRadius={items[1].borderRadius}
            svgRight='80%'
            svgTop='50%'
            r={rOverrides[1]}
            calloutLeft='90%'
            calloutTop='20%'
          />

          <TeammateCard
            svgSrc={svgList[2]}
            imageSrc={items[2].image}
            tooltipText={items[2].tooltip}
            borderRadius={items[2].borderRadius}
            svgLeft='80%'
            svgTop='90%'
            calloutLeft='90%'
            calloutTop='10%'
            r={rOverrides[2]}
          />
        </div>

        <div className="teamRow">
          <TeammateCard
            svgSrc={svgList[3]}
            imageSrc={items[3].image}
            tooltipText={items[3].tooltip}
            borderRadius={items[3].borderRadius}
            svgLeft='80%'
            svgTop='5%'
            r={rOverrides[3]}
            calloutRight='80%'
            calloutBottom='10%'
          />

          <TeammateCard
            svgSrc={svgList[4]}
            imageSrc={items[4].image}
            tooltipText={items[4].tooltip}
            borderRadius={items[4].borderRadius}
            svgRight='80%'
            svgBottom='20%'
            r={rOverrides[4]}
            calloutLeft='90%'
            calloutBottom='20%'
          />

          <TeammateCard
            svgSrc={svgList[5]}
            imageSrc={items[5].image}
            tooltipText={items[5].tooltip}
            borderRadius={items[5].borderRadius}
            svgLeft='70%'
            svgTop='-33%'
            r={rOverrides[5]}
            calloutRight='80%'
            calloutBottom='20%'
          />
        </div>
      </div>
    </div>
  )
}


const TeammateCard = ({
  svgSrc = TeammateOneSvg,
  imageSrc = TeammateOneIamge,
  tooltipText = 'Robin',
  borderRadius = '100px 100px 100px 0px',
  svgLeft = 'auto',
  svgRight = 'auto',
  svgTop = 'auto',
  svgBottom = 'auto',
  r = 0.6,
  calloutLeft = 'auto',
  calloutRight = 'auto',
  calloutTop = 'auto',
  calloutBottom = 'auto',
}) => {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, {
    amount: 0.3,
  });

  return (
    <>
      <div
        className="teammateCard"
        style={{ '--r': r }}
        ref={cardRef}
      >
        <div className="teammateImageWrap">
          <img src={imageSrc} alt="teammateImage" className="teammateCardImage" />
          <img
            src={svgSrc}
            alt="teammateSvg"
            className={cardInView ? 'teammateSvgPop' : ''}
            style={{
              position: 'absolute',
              left: svgLeft ?? 'auto',
              right: svgRight ?? 'auto',
              top: svgTop ?? 'auto',
              bottom: svgBottom ?? 'auto',
            }}
          />
          <motion.div 
            className='teammateCallout'
            initial="hidden"
            animate={cardInView ? "visible" : "hidden"}
            variants={popInVariants}
            style={{
              left: calloutLeft ?? 'auto',
              right: calloutRight ?? 'auto',
              top: calloutTop ?? 'auto',
              bottom: calloutBottom ?? 'auto',
              borderRadius: borderRadius,
              transformOrigin: calloutRight !== 'auto' ? 'bottom right' : 'bottom left'
            }}
          >
            {tooltipText}
          </motion.div>
        </div>
      </div>
    </>
  )
}

