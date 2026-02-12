import { Headline } from '../../components/common/headline/Headline'
import studioCartoon from '../../assets/svgs/about/studioCartoon.svg'
import orangeStar from '../../assets/imgs/stars/orange.svg'
import Button from '../../components/common/button/Button'
import { GenericCarousel } from '../../components/common/genericCarousel/GenericCarousel'
import TeamPinkBlob from '../../assets/imgs/teammatePink.svg'
import { useState } from 'react'
import {
  useFloating,
  useClientPoint,
  offset,
  autoUpdate,
  useInteractions,
} from "@floating-ui/react"
import { companiesData } from '../../data/companiesData'
import { motion, AnimatePresence } from 'framer-motion'
import {popInVariants} from '../common/headline/Headline'

// Carousel item with cursor-following tooltip (same pattern as VisitUsLink in Footer)
function StudioCarouselItem({keyNumber, image}) {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset({
      mainAxis: -40,
      crossAxis: 70
    })],
    whileElementsMounted: autoUpdate,
  });

  const clientPoint = useClientPoint(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    clientPoint,
  ]);

  return (
    <>
      <div 
        className="carouselItem studioCarouselItem"
        key={keyNumber}
        ref={refs.setReference}
        {...getReferenceProps({
          onMouseEnter: () => setOpen(true),
          onMouseLeave: () => setOpen(false),
        })}
      >
        <img src={image} alt='studioCarouselImage' className='carouselImage'/>
      </div>

      <AnimatePresence>
        {open && (
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
              className="tooltip blue"
              style={{ transformOrigin: 'bottom left' }}
            >
              visit our studio
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

const AboutStudio = ({studioImages}) => {
    return (
        <section className="studio" data-navbar="dark">
          <div className="studioCarousel">
            <img src={TeamPinkBlob} alt="" className="studioPinkBlob" />
            <GenericCarousel>
            {studioImages.map((image, index) => (
              <StudioCarouselItem 
                keyNumber={index} 
                image={image} 
              />
            ))}
          </GenericCarousel>
          </div>
          <Headline
            lines={['the company', 'we keep']}
            highlight={'company'}
          >
            <img 
              src={studioCartoon}
              alt="" 
              className="studioCartoon" 
            />
            <img 
              src={orangeStar} 
              alt="orangeStar" 
              className='studioStar'
            />
          </Headline>
          <section className="companies">
            {companiesData.map((company) => (
              <CompanyCard 
                key={company.id} 
                name={company.name} 
                services={company.services} 
                Logo={company.Logo}
              />
            ))}
          </section>
          <div className="studioButtons">
            <Button text='start a project' />
            <Button text="i'm an agency" color='green' />
          </div>
        </section>
    )
}

const CompanyCard = ({ name, services, Logo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset({ mainAxis: -40, crossAxis: 70 })],
    whileElementsMounted: autoUpdate,
  });
  const clientPoint = useClientPoint(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([clientPoint]);

  const renderLogo = () => {
    if (!Logo) return <div className="companyLogo placeholderLogo" style={{ height: '39px', width: '155px' }} />;
    if (typeof Logo === 'function') return <Logo className="companyLogo" />;
    return <div className="companyLogo">{Logo}</div>;
  };

  return (
    <>
      <div 
        className="companyCard"
        ref={refs.setReference}
        {...getReferenceProps({
          onMouseEnter: () => setIsOpen(true),
          onMouseLeave: () => setIsOpen(false),
        })}>
        {renderLogo()}
        <div className="companyName">{name}</div>
        <div className="companyWorks">{services}</div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={popInVariants}
              className="companyCardTooltip"
              style={{ transformOrigin: 'bottom left' }}
            >
              {/* {name} */}
              View Project
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AboutStudio