import './BrandNeeds.css'
import { useState } from 'react'
import {
  useFloating,
  useClientPoint,
  offset,
  autoUpdate,
  useInteractions,
} from "@floating-ui/react";
import brandNeedsCartoon from '../../assets/imgs/brandNeedsCartoon.svg'
import offeringCardSvg1 from '../../assets/imgs/offeringText1.svg'
import Button from '../common/button/Button'
import { useInView } from "react-intersection-observer";
import orangeStar from '../../assets/imgs/stars/orange.svg'
import headerUnderlineSvg from '../../assets/underlines/heroUnderline.svg'
import { useCms } from '../../utils/context'

export default function BrandNeeds() {
  const { data } = useCms();
  const countMeInUrl = data?.hero?.countMeInUrl;

  return (
    <section className="brandNeeds" data-navbar="dark">
      <BrandNeedsHeadline />
      <Offerings
        offerCardSvg={offeringCardSvg1}
        title={<>{'log'} <br /> {'design'}</>}
        cardColor="green"
        offeringDescLines={[
          'ideation & moodboards',
          'custom logo creation',
        ]}
      />
      <div className="brandNeedsButton">
        <Button text="start a project" href={countMeInUrl} />
      </div>
    </section>
  )
}

function BrandNeedsHeadline() {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.5,
  });

  return (
    <h1 className="headlineText">
      <span className="headlineWrapper">
        <span className="headlineHighlight">everything</span><span className="brandNeedsBreak1"> </span>
        <span className="brandNeedsYour">your</span><span className="brandNeedsBreak2"> </span>
        <span className="brandNeedsBrand">brand</span><span className="brandNeedsBreak3"> </span>
        <span className="brandNeedsNeeds">needs</span>

        <img
          src={brandNeedsCartoon}
          alt="brandNeedsCartoon"
          className={`brandNeedsCartoon ${inView ? 'scaleInAnimation' : ''}`}
          ref={ref}
        />

      
        <img
          src={orangeStar}
          alt="brandNeedsStar"
          className='brandNeedsStar star'
        />
      </span>
    </h1>
  )
}

function Offerings() {
  const { data } = useCms()
  const offeringsData = data?.brandNeedsSection?.offerings || []
  
  return (
    <div className="offerings">
      {/* green card */}
      {offeringsData.map((offering, idx) => (
        <OfferingCard
          key={idx}
          idx={idx}
          cardColor={offering.color}
          offerCardSvg={offering.svg}
          title={offering.title}
          offeringDescLines={offering.lines}
        />
      ))}
    </div>
  )
}

const OfferingCard = ({idx, cardColor, offerCardSvg, title, offeringDescLines, rotation}) => {
  return (
    <div 
      className={`offeringCard ${cardColor}`} 
      key={idx}
    >
      <img
        src={offerCardSvg}
        alt={`offeringCardSvg-${idx}`}
        className="offeringCardSvg"
      />

      <div className="offeringCardTitle">
        {title.map((senctence, i) => (
          <><span key={i}>{senctence}</span> <br /></>
          ))}
      </div>

      {/* <img
        src={headerUnderlineSvg}
        alt={`offeringCardSeprator-${idx}`}
        className='offeringCardSeprator'
      /> */}

      <div className={`offeringCardSeprator ${cardColor}`}>
        <svg width="100%" height="12" viewBox="0 0 303 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.50012 6.95328C113.144 -3.91082 375.855 3.68784 281.375 10.5" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
        </svg>
      </div>
      


      <div className="offeringDesc">
        {offeringDescLines.map((line, i) => (
          <div className="offeringDescLine" key={i}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 0L11.1001 6.89989L18 9L11.1001 11.1001L9 18L6.89989 11.1001L0 9L6.89989 6.89989L9 0Z" fill="currentColor"/>
            </svg>
            {line}
          </div>
        ))}
      </div>
    </div>
  )
}
