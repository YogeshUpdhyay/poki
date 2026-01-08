import { Headline } from '../../common/headline/Headline'
import aboutHeroCartoon from '../../../assets/svgs/about/heroCartoon.svg'
import { useInView } from 'react-intersection-observer'

function AboutHeadline() {
  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  return (
    <div className="aboutHeadline">
        <Headline 
            lines={['agile design', 'agency born to', 'make brands shine']}
            highlight="shine"
            tooltip="we put the 'fun' in functional design"
            tooltipColor="blue"
        >
        <img 
            src={aboutHeroCartoon} 
            alt="aboutHeroCartoon" 
            className={`aboutHeroCartoon ${inView ? 'scaleInAnimation' : ''}`}
            ref={ref}
        />
        </Headline>
    </div>
  )
}

export default AboutHeadline
