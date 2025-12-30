import './Reviews.css'
import ReviewCard from './ReviewCard'
import reviewsBg from '../../assets/imgs/reviewsBg.svg'
import reviewsCartoon from '../../assets/imgs/reviewsCartoon.svg'
import HeroUnderline from '../../assets/underlines/heroUnderline.svg?react'
import AnimatedSvgLine from '../common/animatedSvgLine/animatedSvgLine'
import { useState } from 'react'
import {
  useFloating,
  useClientPoint,
  offset,
  autoUpdate,
  useInteractions,
} from "@floating-ui/react";

export default function Reviews() {
  return (
    <section className="reviews">
      <ReviewHeadline />
      <img 
        src={reviewsBg} 
        alt="reviewsBg" 
        className="reviewsBg" 
      />
      <div className="reviewsCarousel">
        <ReviewCard />
      </div>
    </section>
  )
}

function ReviewHeadline() {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(8)],
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
        <span className="headlineHighlight">word</span> on <br />
        the street <br />

        <img
          src={reviewsCartoon}
          alt="reviewsCartoon"
          className="reviewsCartoon"
        />
        
        <div className="reviewUnderlinePosition">
          <AnimatedSvgLine Svg={HeroUnderline} />
        </div>
      
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
