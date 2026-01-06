import './Reviews.css'
import ReviewCard from './ReviewCard'
import reviewsBg from '../../assets/imgs/reviewsBg.svg'
import reviewsCartoon from '../../assets/imgs/reviewsCartoon.svg'
import HeroUnderline from '../../assets/underlines/heroUnderline.svg?react'
import AnimatedSvgLine from '../common/animatedSvgLine/animatedSvgLine'
import avatarImgSrc from '../../assets/imgs/avatar.png'
import { useState } from 'react'
import {
  useFloating,
  useClientPoint,
  offset,
  autoUpdate,
  useInteractions,
} from "@floating-ui/react";

export default function Reviews() {
  const colors = ['yellow', 'pink', 'blue', 'green', 'orange']
  const sampleNames = ['Jordan Lee', 'Aisha Khan', 'Mateo Silva', 'Priya Patel', 'Liam Ochoa', 'Sofia Rossi', 'Noah Kim', 'Camila Cruz']
  const sampleLocations = ['United States', 'India', 'Brazil', 'United Kingdom', 'Canada', 'Australia']
  const sampleReviews = [
    `Poki Design Studio transformed our brand with a stunning logo and cohesive design elements.`,
    `Great to work with — delivered on time and exceeded expectations.`,
    `Creative team, excellent communication, highly recommended!`,
    `Their attention to detail made our product shine visually.`,
  ]

  const reviewsData = Array.from({ length: 8 }).map((_, i) => ({
    reviewerName: sampleNames[i % sampleNames.length],
    location: sampleLocations[i % sampleLocations.length],
    reviewText: sampleReviews[i % sampleReviews.length],
    color: colors[i % colors.length],
    avatarSrc: avatarImgSrc,
  }))

  return (
    <section className="reviews">
      <ReviewHeadline />
      <img 
        src={reviewsBg} 
        alt="reviewsBg" 
        className="reviewsBg" 
      />
      <div className="reviewsCarousel">
        <div className="reviewsCarouselInner">
          {reviewsData.map((r, idx) => (
            <ReviewCard
              key={idx}
              reviewerName={r.reviewerName}
              location={r.location}
              reviewText={r.reviewText}
              color={r.color}
              avatarSrc={r.avatarSrc}
              reverse={idx % 2 === 1}
            />
          ))}
        </div>
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
