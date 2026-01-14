import './Reviews.css'
import ReviewCard from './ReviewCard'
import reviewsBg from '../../assets/imgs/reviewsBg.svg'
import reviewsCartoon from '../../assets/imgs/reviewsCartoon.svg'
import HeroUnderline from '../../assets/underlines/heroUnderline.svg?react'
import AnimatedSvgLine from '../common/animatedSvgLine/animatedSvgLine'
import avatarImgSrc from '../../assets/imgs/avatar.png'
import { useState, useEffect, useRef } from 'react'
import {
  useFloating,
  useClientPoint,
  offset,
  autoUpdate,
  useInteractions,
} from "@floating-ui/react";
import { motion } from "framer-motion";

export default function Reviews() {
  // Real reviews data - replace with your actual reviews
  const realReviews = [
    {
      reviewerName: 'Nikolas Gregory',
      location: 'United States',
      reviewText: 'Amazing work all around. An excellent understanding of my ask and delivered an amazing website design paying attention to every little detail that I had asked for. Super polite and professional from start to finish. Thank you Poki Studios!',
      color: 'yellow',
      avatarSrc: avatarImgSrc,
    },
    {
      reviewerName: 'Gaurav Anand',
      location: 'NY, United States',
      reviewText: 'Beyond expectations! Delivered a design that aligns with our brand vision. Took feedback and suggestions with a very open mindset and WOWED me! I rarely write reviews but Poki Studios totally deserves it! It’s a but pricey but 100% worth it.',
      color: 'pink',
      avatarSrc: avatarImgSrc,
    },
    {
      reviewerName: 'Devon McPherson',
      location: 'California, United States',
      reviewText: 'Poki was exceptional in their work and delivery of the Figma project. The team can operate with very little information provided, letting their creativity take over. They are easy to work with and reliable when it comes to quality and meeting delivery timelines.',
      color: 'blue',
      avatarSrc: avatarImgSrc,
    },
    {
      reviewerName: 'Darac',
      location: 'United Arab Emirates',
      reviewText: 'I now view these guys as long-term partners for all of my creative needs - their work is exceptional, and they are a joy to work with. True Creatives! I will come back again and again and have no need to ever use anyone else. You guys rock!',
      color: 'green',
      avatarSrc: avatarImgSrc,
    },
    {
      reviewerName: 'Aisha Khan',
      location: 'London, UK',
      reviewText: 'Professional service and beautiful designs. Worth every penny!',
      color: 'orange',
      avatarSrc: avatarImgSrc,
    },
  ]

  // Duplicate reviews for infinite scroll effect
  const reviewsData = [...realReviews, ...realReviews, ...realReviews]

  const [isHovered, setIsHovered] = useState(false)

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
          animate={{
            x: [0, -reviewsData.length * 386 / 3], // 360px card + 26px gap
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: isHovered ? 60 : 30, // Slow down on hover
              ease: "linear",
            },
          }}
        >
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
    </h1>
  )
}
