import { useInView } from "react-intersection-observer";
import "./animatedSvgLine.css"

function AnimatedSvgLine({ Svg }) {
  const {ref, inView, entry} = useInView({
    threshold: 0,
  })
  return <Svg ref={ref} className={inView ? "animated-underline animated" : "animated-underline"} />;
}
  
export default AnimatedSvgLine;
  