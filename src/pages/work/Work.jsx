import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import './Work.css'
import Footer from "../../components/footer/Footer"
import Collaborate from "../../components/collaborate/Collaborate"
import Marquee from "react-fast-marquee";
import SkewedTape from "../../components/common/skewedTape/SkewedTape";
import OutlinedSvgText from '../../components/common/outlineSvgText/OutlineSvgText';
import { getAllProjects, CATEGORIES, CATEGORY_LABELS } from '../../data/projectsData';

// Import flower decorations
import greenFlower from '../../assets/svgs/work/greenFlower.svg';
import blueFlower from '../../assets/svgs/work/blueFlower.svg';
import pinkFlower from '../../assets/svgs/work/pinkFlower.svg';
import pistaFlower from '../../assets/svgs/work/pistaFlower.svg';

const FLOWER_DECORATIONS = [
    { src: greenFlower, alt: 'green flower decoration', className: 'flowerDecoration flower-left' },
    { src: blueFlower, alt: 'blue flower decoration', className: 'flowerDecoration flower-right' },
    { src: pinkFlower, alt: 'pink flower decoration', className: 'flowerDecoration flower-pink' },
    { src: pistaFlower, alt: 'pista flower decoration', className: 'flowerDecoration flower-yellow' },
];

/** Split a flat array into rows of `size` */
function chunkArray(arr, size) {
    const rows = [];
    for (let i = 0; i < arr.length; i += size) {
        rows.push(arr.slice(i, i + size));
    }
    return rows;
}

const Work = () => {
    const [activeCategory, setActiveCategory] = useState(null); // null = show all

    const allProjects = getAllProjects();

    // Filter by category when a pill is active
    const filteredProjects = activeCategory
        ? allProjects.filter((p) => p.category === activeCategory)
        : allProjects;

    // Split filtered list into rows of 3
    const projectRows = chunkArray(filteredProjects, 3);

    return (
        <>
            <section className="work">
                {/* Hero Marquee Section */}
                <div className="skewedTapContainer">
                    <SkewedTape angle="10deg" backgroundColor='black' borderColor='white'>
                        <Marquee speed={50} gradient={false} direction="right">
                            <div className="skewedTapeContent">
                                <span className="skewedTapeWork">work</span>
                                <OutlinedSvgText
                                    lines={['no limits']}
                                    stroke='white'
                                    fill='pink'
                                    translateY='0%'
                                    rotate='0deg'
                                    size='40'
                                />
                                <span className="skewedTapeWork">work</span>
                                <OutlinedSvgText
                                    lines={['no limits']}
                                    stroke='white'
                                    fill='pink'
                                    translateY='0%'
                                    rotate='0deg'
                                    size='40'
                                />
                                <span className="skewedTapeWork">work</span>
                                <OutlinedSvgText
                                    lines={['no limits']}
                                    stroke='white'
                                    fill='pink'
                                    translateY='0%'
                                    rotate='0deg'
                                    size='40'
                                />
                                <span className="skewedTapeWork">work</span>
                                <OutlinedSvgText
                                    lines={['no limits']}
                                    stroke='white'
                                    fill='pink'
                                    translateY='0%'
                                    rotate='0deg'
                                    size='40'
                                />
                                <span className="skewedTapeWork">work</span>
                                <OutlinedSvgText
                                    lines={['no limits']}
                                    stroke='white'
                                    fill='pink'
                                    translateY='0%'
                                    rotate='0deg'
                                    size='40'
                                />
                                <span className="skewedTapeWork">work</span>
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
                                <span className="skewedTapeWork">work</span>
                                <OutlinedSvgText
                                    lines={['for real']}
                                    stroke='white'
                                    fill='green'
                                    translateY='0%'
                                    rotate='0deg'
                                    size='40'
                                />
                                <span className="skewedTapeWork">work</span>
                                <OutlinedSvgText
                                    lines={['final final']}
                                    stroke='white'
                                    fill='blue'
                                    translateY='0%'
                                    rotate='0deg'
                                    size='40'
                                />
                                <span className="skewedTapeWork">work</span>
                                <OutlinedSvgText
                                    lines={['with love']}
                                    stroke='white'
                                    fill='orange'
                                    translateY='0%'
                                    rotate='0deg'
                                    size='40'
                                />
                                <span className="skewedTapeWork">work</span>
                                <OutlinedSvgText
                                    lines={['for real']}
                                    stroke='white'
                                    fill='green'
                                    translateY='0%'
                                    rotate='0deg'
                                    size='40'
                                />
                                <span className="skewedTapeWork">work</span>
                                <OutlinedSvgText
                                    lines={['final final']}
                                    stroke='white'
                                    fill='blue'
                                    translateY='0%'
                                    rotate='0deg'
                                    size='40'
                                />
                                <span className="skewedTapeWork">work</span>
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
                        <button
                            className={`categoryPill ${activeCategory === null ? 'active' : ''}`}
                            onClick={() => setActiveCategory(null)}
                        >
                            all
                        </button>
                        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                            <button
                                key={key}
                                className={`categoryPill ${activeCategory === key ? 'active' : ''}`}
                                onClick={() => setActiveCategory(key)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Showcase Grid */}
            <div className="projectShowcase">
                {projectRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="projectRow">
                        {/* Flower decorations cycle through available flowers */}
                        {FLOWER_DECORATIONS[rowIndex % FLOWER_DECORATIONS.length] && (
                            <img
                                src={FLOWER_DECORATIONS[rowIndex % FLOWER_DECORATIONS.length].src}
                                alt={FLOWER_DECORATIONS[rowIndex % FLOWER_DECORATIONS.length].alt}
                                className={FLOWER_DECORATIONS[rowIndex % FLOWER_DECORATIONS.length].className}
                            />
                        )}

                        <div className="projectGrid">
                            {row.map((project) => (
                                <NavLink
                                    to={`/work/${project.slug}`}
                                    key={project.id}
                                    className="phoneMockupCard"
                                    style={{ transform: `rotate(${project.rotation}deg)` }}
                                >
                                    <div className="phoneMockupImage">
                                        <img src={project.cardImage} alt={project.title} />
                                        <div className="phoneMockupLabel">
                                            {project.title}
                                        </div>
                                    </div>
                                </NavLink>
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
