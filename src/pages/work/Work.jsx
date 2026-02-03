import './Work.css'
import Footer from "../../components/footer/Footer"
import Collaborate from "../../components/collaborate/Collaborate"
import Marquee from "react-fast-marquee";
import SkewedTape from "../../components/common/skewedTape/SkewedTape";
import OutlinedSvgText from '../../components/common/outlineSvgText/OutlineSvgText';

// Import flower decorations
import greenFlower from '../../assets/svgs/work/greenFlower.svg';
import blueFlower from '../../assets/svgs/work/blueFlower.svg';
import pinkFlower from '../../assets/svgs/work/pinkFlower.svg';
import pistaFlower from '../../assets/svgs/work/pistaFlower.svg';

// Import project images
import watchImg from '../../assets/images/projects/watch.png';
import makeupImg from '../../assets/images/projects/makeup.png';
import phoneImg from '../../assets/images/projects/phone.png';
import posterImg from '../../assets/images/projects/poster.png';
import brandingImg from '../../assets/images/projects/branding.png';
import magazineImg from '../../assets/images/projects/magazine.png';

const Work = () => {
    // Project data - 4 rows of 3 phone mockups each with rotation effects
    const projects = [
        // Row 1
        [
            { id: 1, image: watchImg, title: "cocinas chile", rotation: -5 },
            { id: 2, image: phoneImg, title: "briotech", rotation: 2 },
            { id: 3, image: brandingImg, title: "the brain psycologist", rotation: -4 },
        ],
        // Row 2
        [
            { id: 4, image: makeupImg, title: "cocinas chile", rotation: 2 },
            { id: 5, image: posterImg, title: "begun", rotation: -3 },
            { id: 6, image: magazineImg, title: "the brain psycologist", rotation: 3 },
        ],
        // Row 3
        [
            { id: 7, image: phoneImg, title: "cocinas chile", rotation: -5 },
            { id: 8, image: watchImg, title: "briotech", rotation: 2 },
            { id: 9, image: brandingImg, title: "begun", rotation: -3 },
        ],
        // Row 4
        [
            { id: 10, image: posterImg, title: "cocinas chile", rotation: 2 },
            { id: 11, image: makeupImg, title: "briotech", rotation: -4 },
            { id: 12, image: magazineImg, title: "the brain psycologist", rotation: 3 },
        ],
    ];

    return (
        <>
            <section className="work">
                {/* Hero Marquee Section */}
                <div className="skewedTapContainer">
                    <SkewedTape angle="10deg" backgroundColor='black' borderColor='white'>
                        <Marquee speed={50} gradient={false} direction="right">
                            <div className="skewedTapeContent">
                                work
                                <OutlinedSvgText 
                                    lines={['no limits']} 
                                    stroke='white' 
                                    fill='pink'
                                    translateY='0%'
                                    rotate='0deg'
                                    size='40'
                                />
                                work
                                <OutlinedSvgText 
                                    lines={['no limits']} 
                                    stroke='white' 
                                    fill='pink'
                                    translateY='0%'
                                    rotate='0deg'
                                    size='40'
                                />
                                work
                                <OutlinedSvgText 
                                    lines={['no limits']} 
                                    stroke='white' 
                                    fill='pink'
                                    translateY='0%'
                                    rotate='0deg'
                                    size='40'
                                />
                            </div>
                        </Marquee>
                    </SkewedTape>
                    <SkewedTape angle="-4deg" backgroundColor='black' borderColor='white'>
                        <Marquee speed={50} gradient={false}>
                            <div className="skewedTapeContent">
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
                                    lines={['final final']} 
                                    stroke='white' 
                                    fill='blue'
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

                {/* Category Menu Section */}
                <div className="categoryMenu">
                    <h3>on the menu</h3>
                    <div className="categoryPills">
                        <span className="categoryPill active">websites</span>
                        <span className="categoryPill">logo designs</span>
                        <span className="categoryPill">brand identities</span>
                        <span className="categoryPill">products & apps</span>
                    </div>
                </div>
            </section>

            {/* Project Showcase Grid */}
            <div className="projectShowcase">
                {projects.map((row, rowIndex) => (
                    <div key={rowIndex} className="projectRow">
                        {/* Flower decorations for each row */}
                        {rowIndex === 0 && (
                            <img 
                                src={greenFlower} 
                                alt="green flower decoration" 
                                className="flowerDecoration flower-left"
                            />
                        )}
                        {rowIndex === 1 && (
                            <img 
                                src={blueFlower} 
                                alt="blue flower decoration" 
                                className="flowerDecoration flower-right"
                            />
                        )}
                        {rowIndex === 2 && (
                            <img 
                                src={pinkFlower} 
                                alt="pink flower decoration" 
                                className="flowerDecoration flower-pink"
                            />
                        )}
                        {rowIndex === 3 && (
                            <img 
                                src={pistaFlower} 
                                alt="pista flower decoration" 
                                className="flowerDecoration flower-yellow"
                            />
                        )}
                        
                        <div className="projectGrid">
                            {row.map((project) => (
                                <div 
                                    key={project.id} 
                                    className="phoneMockupCard"
                                    style={{ transform: `rotate(${project.rotation}deg)` }}
                                >
                                    <div className="phoneMockupImage">
                                        <img src={project.image} alt={project.title} />
                                        <div className="phoneMockupLabel">
                                            {project.title}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Collaboration Section - Reusing existing component */}
            <Collaborate />

            {/* Footer */}
            <Footer />
        </>
    )
}

export default Work
