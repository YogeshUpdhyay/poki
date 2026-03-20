import { useInView } from 'react-intersection-observer';

function AboutFlexItem({ title, svg, r, text, extraClass }) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <>
      <div className={`aboutFlex ${extraClass || ''}`} ref={ref}>
        <div className="aboutFlexTitle">
          {title}
          <img
            className={`aboutFlexSvg ${inView ? 'aboutSvgPop' : ''}`}
            src={svg}
            style={{ '--r': r }}
          />
        </div>
        <div className="aboutFlexText">
          {text}
        </div>
      </div>
    </>
  )
}

export default AboutFlexItem
