import './Work.css'
import Navbar from "../../components/navbar/Navbar"
import Marquee from "react-fast-marquee";
import SkewedTape from "../../components/common/skewedTape/SkewedTape";
import OutlinedSvgText from '../../components/common/outlineSvgText/OutlineSvgText';

const Work = () => {
    return (
        <>
            <Navbar />
            <section className="work" data-navbar="dark">
                <div className="skewedTapContainer">
                    <SkewedTape angle="10deg" backgroundColor='black' borderColor='white'>
                        <Marquee speed={50} gradient={false} direction="right">
                            <div className="skewedTapeContent">
                                work
                                <OutlinedSvgText lines={['final final']} stroke='white' color='blue'/>
                                work
                                <OutlinedSvgText lines={['for real']} stroke='white' color='green'/>
                                work
                                <OutlinedSvgText lines={['with love']} stroke='white' color='orange'/>
                            </div>
                        </Marquee>
                    </SkewedTape>
                    <SkewedTape angle="-4deg" backgroundColor='black' borderColor='white'>
                        <Marquee speed={50} gradient={false}>
                            <div className="skewedTapeContent">
                                work
                                <OutlinedSvgText 
                                    lines={['final final']} 
                                    stroke='white' 
                                    fill='blue'
                                    translateY='0%'
                                    rotate='0deg'
                                    size='40'
                                />
                                work
                                <OutlinedSvgText 
                                    lines={['for real']} 
                                    stroke='white' 
                                    fill='green'
                                    translateY='0%'
                                    rotate='0deg'
                                    size='40'
                                />
                                work
                                <OutlinedSvgText    
                                    lines={['with love']} 
                                    stroke='white' 
                                    fill='orange'
                                    translateY='0%'
                                    rotate='0deg'
                                    size='40'
                                />
                            </div>
                        </Marquee>
                    </SkewedTape>
                </div>
            </section>
        </>
    )
}

export default Work
