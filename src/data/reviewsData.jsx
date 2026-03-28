import React from 'react'

// Images
import asherImg from '../assets/imgs/reviews/asher.png'
import basemyntImg from '../assets/imgs/reviews/basemynt.png'
import begunImg from '../assets/imgs/reviews/begun.png'
import biddleeImg from '../assets/imgs/reviews/biddlee.png'
import cocinaschileImg from '../assets/imgs/reviews/cocinaschile.png'
import crawfordImg from '../assets/imgs/reviews/crawford.png'
import dillidilliImg from '../assets/imgs/reviews/dillidilli.png'
import katielevinImg from '../assets/imgs/reviews/katielevin.png'
import madehereImg from '../assets/imgs/reviews/madehere.png'
import studioeliasImg from '../assets/imgs/reviews/studioelias.png'
import sweatmateImg from '../assets/imgs/reviews/sweatmate.png'
import tbpImg from '../assets/imgs/reviews/tbp.png'
import wildmateImg from '../assets/imgs/reviews/wildmate.png'
import rentlyimg from '../assets/imgs/reviews/rently.png'

// Avatars
import asherAvt from '../assets/imgs/reviews-avatar/asher_avt.png'
import basemyntAvt from '../assets/imgs/reviews-avatar/basemynt_avt.png'
import begunAvt from '../assets/imgs/reviews-avatar/begun_avt.png'
import biddleeAvt from '../assets/imgs/reviews-avatar/biddlee_avt.png'
import cocinaschileAvt from '../assets/imgs/reviews-avatar/cocinaschile_avt.png'
import crawfordAvt from '../assets/imgs/reviews-avatar/crawford_avt.png'
import dillidilliAvt from '../assets/imgs/reviews-avatar/dillidilli_avt.png'
import katielevineAvt from '../assets/imgs/reviews-avatar/katielevine_avt.png'
import madehereAvt from '../assets/imgs/reviews-avatar/madehere_avt.png'
import studioeliasAvt from '../assets/imgs/reviews-avatar/studioelias_avt.png'
import sweatmateAvt from '../assets/imgs/reviews-avatar/sweatmate_avt.png'
import tbpAvt from '../assets/imgs/reviews-avatar/tbp_avt.png'
import wildmateAvt from '../assets/imgs/reviews-avatar/wildmate_avt.png'
import rentlyavt from '../assets/imgs/reviews-avatar/rently_avt.png'

// Edge SVGs
import AsherSvg from '../assets/svgs/reviews/asher.svg?react'
import BasemyntSvg from '../assets/svgs/reviews/basemynt.svg?react'
import BegunSvg from '../assets/svgs/reviews/begun.svg?react'
import BiddleeSvg from '../assets/svgs/reviews/biddlee.svg?react'
import CocinaschileSvg from '../assets/svgs/reviews/cocinaschile.svg?react'
import CrawfordSvg from '../assets/svgs/reviews/crawford.svg?react'
import DilliDilliSvg from '../assets/svgs/reviews/dillidilli.svg?react'
import KatielevineSvg from '../assets/svgs/reviews/katielevine.svg?react'
import MadeHereSvg from '../assets/svgs/reviews/madehere.svg?react'
import MakunaSvg from '../assets/svgs/reviews/makuna.svg?react'
import StudioeliasSvg from '../assets/svgs/reviews/studioelias.svg?react'
import SweatmateSvg from '../assets/svgs/reviews/sweatmate.svg?react'
import TbpSvg from '../assets/svgs/reviews/tbp.svg?react'
import WildmateSvg from '../assets/svgs/reviews/wildmate.svg?react'
import RentlySvg from '../assets/svgs/reviews/rently.svg?react'
import { color } from 'framer-motion'

export const realReviews = [
  {
    reviewerName: 'Nikolas Bentel',
    location: 'New York',
    reviewText: 'Amazing work all around. An excellent understanding of my ask and delivered an amazing website design paying attention to every little detail that I had asked for. Super polite and professional from start to finish. Thank you Poki Studios!',
    color: 'cream',
    avatarSrc: madehereAvt,
    projectImage: madehereImg,
    edgeSvg: <MadeHereSvg />,
    edgeSvgPosition: 'top',
  },
  {
    reviewerName: 'Gaurav Anand',
    location: 'New York',
    reviewText: 'Beyond expectations! Delivered a design that aligns with our brand vision. Took feedback and suggestions with a very open mindset and WOWED me! I rarely write reviews but Poki Studios totally deserves it! It’s a but pricey but 100% worth it.',
    color: 'lightblue',
    avatarSrc: dillidilliAvt,
    projectImage: dillidilliImg,
    edgeSvg: <DilliDilliSvg />,
    edgeSvgPosition: 'bottom',
  },
  {
    reviewerName: 'Devon McPherson',
    location: 'California',
    reviewText: 'Poki was exceptional in their work and delivery of the Figma project. The team can operate with very little information provided, letting their creativity take over. They are easy to work with and reliable when it comes to quality and meeting delivery timelines.',
    color: 'orange',
    avatarSrc: wildmateAvt,
    projectImage: wildmateImg,
    edgeSvg: <WildmateSvg />,
    edgeSvgPosition: 'top',
  },
  {
    reviewerName: 'Darac',
    location: 'United Arab Emirates',
    reviewText: 'I now view these guys as long-term partners for all of my creative needs - their work is exceptional, and they are a joy to work with. True Creatives! I will come back again and again and have no need to ever use anyone else. You guys rock!',
    color: 'pink',
    avatarSrc: basemyntAvt,
    projectImage: basemyntImg,
    edgeSvg: <BasemyntSvg />,
    edgeSvgPosition: 'bottom',
  },
  {
    reviewerName: 'Shawn Pery',
    location: 'United States',
    reviewText: 'Incredible experience from start to finish. The team offers great communication, quality design, and quick to reply. Look forward to working with them again!',
    color: 'cream',
    avatarSrc: tbpAvt,
    projectImage: tbpImg,
    edgeSvg: <TbpSvg />,
    edgeSvgPosition: 'top',
  },
  {
    reviewerName: 'Cindy Dow',
    location: 'United States',
    reviewText: 'Highly recommend this team because they always go above and beyond the work asked of them. I appreciate their keen attention to details and willingness to ensure everything turns out exactly (and more) as you\'d hope for. I will continue working with them on more projects!',
    color: 'lightblue',
    avatarSrc: asherAvt,
    projectImage: asherImg,
    edgeSvg: <AsherSvg />,
    edgeSvgPosition: 'bottom',
  },
  {
    reviewerName: 'Patrick Nooren',
    location: 'Canada',
    reviewText: 'It was a pleasure working with Poki Studios. Robin got the concept and feel for exactly the look we were trying to obtain. We wanted a luxury, very professional look and we got that on the first try! It was a pleasure working with Poki Studios and we would highly recommend.',
    color: 'orange',
    avatarSrc: biddleeAvt,
    projectImage: biddleeImg,
    edgeSvg: <BiddleeSvg />,
    edgeSvgPosition: 'top',
  },
  {
    reviewerName: 'Sam Crawford',
    location: 'United Kingdom',
    reviewText: 'It was absolutely fantastic to work with Poki Studios on this project. We have now worked together many times and Robin is my go-to guy for all things design. The attention to detail here is exceptional!',
    color: 'pink',
    avatarSrc: crawfordAvt,
    projectImage: crawfordImg,
    edgeSvg: <CrawfordSvg />,
    edgeSvgPosition: 'bottom',
  },

  {
    reviewerName: 'Advit Gharat',
    location: 'Mumbai',
    reviewText: 'Incredible experience from start to finish. The team offers great communication, quality design, and quick to reply. Look forward to working with them again!',
    color: 'cream',
    avatarSrc: begunAvt,
    projectImage: begunImg,
    edgeSvg: <BegunSvg />,
    edgeSvgPosition: 'top',
  },
  {
    reviewerName: 'Katie Levine',
    location: 'Los Angeles',
    reviewText: 'I had an outstanding experience working with Poki Studios. Turnaround time was fast, delivery and organized. If you’re looking for someone who gets brand, usability & visual polish, not just “a webpage” this is the person you want. 100% recommended.',
    color: 'lightblue',
    avatarSrc: katielevineAvt,
    projectImage: katielevinImg,
    edgeSvg: <KatielevineSvg />,
    edgeSvgPosition: 'bottom',
  },
  {
    reviewerName: 'George',
    location: 'United States',
    reviewText: 'This is my THIRD time working with Poki Studios. They go above and beyond every single time. They have truly exceeded my expectations for brand kit creation, logo idenitity, label design, and now digital mockups. They are reliable, quick, kind, professional, and extremely articulate. 10/10',
    color: 'orange',
    avatarSrc: sweatmateAvt,
    projectImage: sweatmateImg,
    edgeSvg: <SweatmateSvg />,
    edgeSvgPosition: 'top',
  },
  {
    reviewerName: 'Mikka Cruz',
    location: 'Philippines',
    reviewText: 'Poki Studio delivered beyond expectations. The team communicates clearly, pays attention to every detail, and makes the entire process smooth from start to finish. Highly recommend them for anyone looking for top-tier web design work.',
    color: 'pink',
    avatarSrc: studioeliasAvt,
    projectImage: studioeliasImg,
    edgeSvg: <StudioeliasSvg />,
    edgeSvgPosition: 'bottom',
  },
  {
    reviewerName: 'Nicolas Frankiel',
    location: 'Chile',
    reviewText: 'They are an extremely professional team with top-level graphic design knowledge and outstanding professionalism. A truly great option for handling high-requirement, sophisticated projects. Working with them has been an excellent and rewarding experience.',
    color: 'cream',
    avatarSrc: cocinaschileAvt,
    projectImage: cocinaschileImg,
    edgeSvg: <CocinaschileSvg />,
    edgeSvgPosition: 'top',
  },
  {
    reviewerName: 'Joshua Pavo',
    location: 'United Kingdom',
    reviewText: 'Amazing work as always! Went above and beyond when I was in a tight deadline & delivered. thank you again Poki Studios! Appreciate the level of professionalism and work ethic.',
    color: 'blue',
    avatarSrc: rentlyavt,
    projectImage: rentlyimg,
    edgeSvg: <RentlySvg />,
    edgeSvgPosition: 'bottom',
  },
  // {
  //   reviewerName: 'Wildmate',
  //   location: '',
  //   reviewText: '',
  //   color: 'lightblue',
  //   avatarSrc: wildmateAvt,
  //   projectImage: wildmateImg,
  //   edgeSvg: <WildmateSvg />,
  //   edgeSvgPosition: 'bottom',
  // },
]
