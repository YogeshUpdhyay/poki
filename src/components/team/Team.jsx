import './Team.css'
import { useState } from 'react'
import {
  useFloating,
  useClientPoint,
  offset,
  autoUpdate,
  useInteractions,
} from "@floating-ui/react";
import Map from '../map/map'
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

export default function Team() {
  return (
    <section className="team">
      <div className="map">
        <Map />
      </div>
      <TeamHeadline />
      <Teammates />
    </section>
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


const TeamHeadline = () => {
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

          <div className="teamUnderline">
            <AnimatedSvgLine Svg={TeamUnderline} />
          </div>

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
  )
}
