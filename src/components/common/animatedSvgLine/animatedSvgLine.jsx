import { useInView } from "react-intersection-observer";
import "./animatedSvgLine.css"

function AnimatedSvgLine({ Svg, forceAnimate, className = "" }) {
  const {ref, inView, entry} = useInView({
    threshold: 0,
  })
  
  const active = forceAnimate !== undefined ? forceAnimate : inView;

  return <Svg ref={ref} className={`${active ? "animated-underline animated" : "animated-underline"} ${className}`} />;
}
  
export default AnimatedSvgLine;
  