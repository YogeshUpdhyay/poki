import './Reviews.css'
import ReviewCard from './ReviewCard'
import reviewsBg from '../../assets/imgs/reviewsBg.svg'
import reviewsCartoon from '../../assets/imgs/reviewsCartoon.svg'
import HeroUnderline from '../../assets/underlines/heroUnderline.svg?react'
import AnimatedSvgLine from '../common/animatedSvgLine/animatedSvgLine'
import { realReviews } from '../../data/reviewsData'
import { useState } from 'react'
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

export default function Reviews() {
  // Duplicate reviews for infinite scroll effect
  const reviewsData = [...realReviews, ...realReviews, ...realReviews]

  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0);
  const totalWidth = (reviewsData.length * 386) / 3;

  useAnimationFrame((t, delta) => {
    // duration in milliseconds: 120 seconds base, 240 seconds on hover
    const duration = isHovered ? 120000 : 60000;
    const speed = totalWidth / duration; // pixels per millisecond

    let newX = x.get() - Math.max(speed * delta, 0); // avoid negative delta jumps just in case
    if (newX <= -totalWidth) {
      newX += totalWidth;
    }
    x.set(newX);
  });

  return (
    <section className="reviews">
      <ReviewHeadline />
      <img
        src={reviewsBg}
        alt="reviewsBg"
        className="reviewsBg"
      />
      <div
        className="reviewsCarousel"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="reviewsCarouselInner"
          style={{ x }}
        >
          {reviewsData.map((r, idx) => (
            <ReviewCard
              key={idx}
              reviewerName={r.reviewerName}
              location={r.location}
              reviewText={r.reviewText}
              color={r.color}
              avatarSrc={r.avatarSrc}
              projectImage={r.projectImage}
              edgeSvg={r.edgeSvg}
              edgeSvgPosition={r.edgeSvgPosition}
              reverse={idx % 2 === 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ReviewHeadline() {
  return (
    <h1 className="headlineText">
      <span className="headlineWrapper">
        <span className="headlineHighlight">word</span> on <br />
        the <span className='underlinedWord'>street <div className="reviewsUnderlinePosition"><AnimatedSvgLine Svg={HeroUnderline} /></div></span> <br />
        <img
          src={reviewsCartoon}
          alt="reviewsCartoon"
          className="reviewsCartoon"
        />
      </span>
    </h1>
  )
}
