import { Headline, wordVariants, popInVariants } from "@/components/common/headline/Headline"
import Button from "@/components/common/button/Button"
import Card from "@/components/common/card/Card"
import Footer from "@/components/footer/Footer"
import Marquee from "react-fast-marquee";
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { usePreloader } from '@/utils/PreloaderContext'
import { NavLink } from 'react-router-dom'
import "./Project.css"
import { getProjectBySlug, getRelatedProjects } from '@/data/projectsData'

// SVGs (template-level decorations)
import pinkSvg from "@/assets/imgs/projects/pink.svg"
import underseenSvg from "@/assets/imgs/projects/underseen.svg"
import workSvg from "@/assets/imgs/projects/work.svg"

const Project = ({ project: projectProp }) => {
    // Use provided project or fall back to Dilli Dilli (default for /project route)
    const project = projectProp || getProjectBySlug('dilli-dilli');

    return (
        <div className="project-page">
            <ProjectHero project={project} />
            <ProjectBeforeAfter project={project} />
            <ProjectAbout project={project} />
            <ProjectColorPalette project={project} />
            <ProjectResults project={project} />
            <ProjectBuiltToBeSeen project={project} />
            <ProjectMore project={project} />
            <Footer />
        </div>
    )
}

const ProjectAbout = ({ project }) => {
    const about = project.about || {};
    const aboutText = about.text || '';
    const aboutImages = about.images || [];
    const paragraphs = aboutText.split('\n\n');

    return (
        <section
            className="whiteContainer"
            id="projectAbout"
            data-navbar='dark'
        >
            <Headline
                lines={['about the project']}
                highlight='about'
            >
                <svg
                    className='websiteAboutUnderline'
                    width="202" height="9"
                    viewBox="0 0 202 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M1.5 5.13552C75.5572 -2.10721 249.822 2.95856 187.15 7.5" stroke="var(--color-black)" stroke-width="3" stroke-linecap="round" />
                </svg>

                <svg
                    className='websiteAboutStar'
                    width="56" height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M43.7128 0L32.6584 26.3877L55.4256 43.7128L29.038 32.6584L11.7128 55.4256L22.7673 29.038L0 11.7128L26.3877 22.7673L43.7128 0Z" fill="var(--color-pink)" />
                </svg>
            </Headline>
            <p className="websiteText">
                {paragraphs.map((p, i) => (
                    <span key={i}>
                        {i > 0 && <><br /><br /></>}
                        {p}
                    </span>
                ))}
            </p>

            {about.pdf && (
            <div className="wireframe">
                <div className="pdfBox">
                    {/iPad|iPhone|iPod/.test(navigator.userAgent) ? (
                        <a
                            href={about.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pdfFallbackLink"
                        >
                            <span className="pdfFallbackIcon">📄</span>
                            <span>View Project PDF</span>
                        </a>
                    ) : (
                        <iframe
                            src={`${about.pdf}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                            title="Project PDF"
                            style={{ border: 'none', width: '100%', height: '100%' }}
                        />
                    )}
                </div>
            </div>
            )}

            <div className="miscContainer">
                <div className="layeredCard">
                    {aboutImages[0] && <img src={aboutImages[0]} alt="" className="layeredCardImage" />}
                </div>
                <div className="miscCard">
                    {aboutImages[1] && <Card image={aboutImages[1]} />}
                </div>
            </div>
            <svg
                className="projectAboutBg"
                width="709" height="697"
                viewBox="0 0 709 697" fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M89.7 164.814C120.805 176.356 153.238 173.473 184.97 171.08C215.055 168.814 240.335 147 232.542 94.5716C230.777 82.6996 228.896 70.8489 226.897 59.0195C224.952 47.5092 222.783 36.0415 219.7 18.9462C246.5 55.5 292.53 100.093 352.007 85.9548C402.853 73.8701 432.618 31.6373 469.91 0C469.304 10.638 468.672 17.5527 469.304 27.0524C475.183 115.422 496.008 165.484 586.016 180.675C626.593 187.526 667.36 188.069 709 193.409C674.908 203.238 640.455 212.004 606.788 223.11C518.682 252.184 504.204 310.448 566.498 379.637C583.093 398.073 597.72 418.285 613.251 437.689L613.528 437.359C588.057 429.402 563.086 418.498 537.009 414.041C453.975 399.86 416.183 434.444 405.287 528.175C398.877 583.291 400.44 639.832 404.532 697C395.879 668.948 387.832 640.683 378.381 612.896C369.771 587.599 360.065 562.653 350.072 537.867C308.327 434.242 249.019 416.136 131.86 452.486C87.829 466.145 45.1902 484.283 0 497.017C40.7573 464.05 84.6186 436.146 124.951 403.296C207.209 336.288 182.026 289.927 132.828 230.982C116.032 210.866 92.1982 196.622 71.6069 179.707C77.6557 174.75 83.6832 169.782 89.7 164.814Z" fill={about.bgColor || "#5168E8"} />
            </svg>

        </section>
    )
}

const ProjectBeforeAfter = ({ project }) => {
    const preview = project.preview || {};
    return (
        <section className="blackContainer" id="beforeAfter">
            <picture className="beforeAfterImage">
                {preview.mobileImage && <source media="(max-width: 768px)" srcSet={preview.mobileImage} />}
                {preview.desktopImage && <img src={preview.desktopImage} alt="Project Preview" />}
            </picture>
        </section>
    )
}

const ProjectHero = ({ project }) => {
    const { isRevealed } = usePreloader();
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        if (inView && isRevealed) {
            const timer = setTimeout(() => setShowButtons(true), 2000);
            return () => clearTimeout(timer);
        }
    }, [inView, isRevealed]);

    return (
        <section className="projectHero" data-navbar='dark' ref={ref}>
            <Headline
                lines={[project.hero.headline]}
                //tooltip='webiste design'
                //tooltipColor='blue'
                forceOpen
                animated={true}
                animationType="word"
            >
                <motion.div
                    className="projectHeroTooltip"
                    variants={popInVariants}
                    style={{ transformOrigin: 'bottom left' }}
                >
                    <div className={`tooltip ${project.hero.tooltipColor || 'blue'}`}>
                        {project.hero.tooltipItems.join(' · ')}
                    </div>
                </motion.div>
                {project.hero.Cartoon && (
                    <motion.div className="projectHeroCartoon" variants={wordVariants}>
                        <project.hero.Cartoon />
                    </motion.div>
                )}
            </Headline>
            <motion.p
                className="projectHeroText"
                initial={{ opacity: 0, y: 30 }}
                animate={inView && isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
            >
                {project.hero.heroText}
            </motion.p>
            <div className="projectHeroButtonWrapper">
                <Button
                    text={"let's have a look"}
                    color='green'
                    className={showButtons ? 'heroButtonPop' : ''}
                />
            </div>
            <Marquee>
                <div className="websiteHeroMarquee">
                    <p className="websiteHeroBold">logo design</p>
                    <div>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 0L26.7153 21.2847L48 24L26.7153 26.7153L24 48L21.2847 26.7153L0 24L21.2847 21.2847L24 0Z" fill="#E47249" />
                        </svg>
                    </div>
                    <p className="websiteHeroItalic">brand identity</p>
                    <div>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 0L26.7153 21.2847L48 24L26.7153 26.7153L24 48L21.2847 26.7153L0 24L21.2847 21.2847L24 0Z" fill="#E47249" />
                        </svg>
                    </div>
                    <p className="websiteHeroBold">visual language</p>
                    <div>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 0L26.7153 21.2847L48 24L26.7153 26.7153L24 48L21.2847 26.7153L0 24L21.2847 21.2847L24 0Z" fill="#E47249" />
                        </svg>
                    </div>
                    <p className="websiteHeroItalic">packaging</p>
                    <div>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 0L26.7153 21.2847L48 24L26.7153 26.7153L24 48L21.2847 26.7153L0 24L21.2847 21.2847L24 0Z" fill="#E47249" />
                        </svg>
                    </div>
                </div>
            </Marquee>
            <div className="projectHeroBg">
                <svg width="486" height="422" viewBox="0 0 486 422" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M450.218 192.942C442.027 182.503 432.816 173.465 423.015 165.54C469.006 115.207 479.269 49.5819 445.501 17.4854C411.063 -15.2476 343.973 -0.687142 295.655 49.9957C288.165 57.8567 281.663 66.1474 275.99 74.629C254.174 37.3926 208.947 12.8866 157.777 15.2735C87.7706 18.5357 33.3334 70.8099 36.2019 132.011C37.8114 166.24 56.9983 195.997 85.8424 215.013C77.3167 219.66 68.9343 225.054 60.8707 231.372C2.67263 276.963 -17.2791 348.603 16.3139 391.361C49.9068 434.135 124.328 431.844 182.542 386.237C200.756 371.963 215.226 355.143 225.473 337.464C229.553 344.545 234.047 351.499 239.274 358.151C291.161 424.205 380.45 440.755 438.696 395.132C496.942 349.51 502.121 258.997 450.218 192.942Z" fill="#86C9FF" />
                </svg>
            </div>
        </section>
    )
}

const ProjectColorPalette = ({ project }) => {
    const colorPalette = project.colorPalette || {};
    const images = colorPalette.images || [];
    return (
        <section className="blackContainer" id="takeYourPick">
            <Headline
                lines={['take your pick']}
                highlight='pick'
            >
                <svg
                    className='colorPaletteStar'
                    width="56" height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M43.7128 0L32.6584 26.3877L55.4256 43.7128L29.038 32.6584L11.7128 55.4256L22.7673 29.038L0 11.7128L26.3877 22.7673L43.7128 0Z" fill="var(--color-orange)" />
                </svg>
            </Headline>

            {colorPalette.text && (
                <p className="websiteText">
                    {colorPalette.text}
                </p>
            )}

            <div className="colorPaletteGrid">
                {images.map((img, i) => (
                    <div key={i} className="versionCard">
                        <img src={img} alt="" className="versionFrameImage" />
                    </div>
                ))}
            </div>
        </section>
    )
}

const ProjectResults = ({ project }) => {
    const results = project.results || [];
    return (
        <section className="whiteContainer" id="projectResults" data-navbar='dark'>
            <div className="resultsGrid">
                {results.map((r, i) => (
                    <div key={i} className="resultItem">
                        <h2 className="resultNumber">{r.number}</h2>
                        <p className="resultLabel">{r.label}</p>
                    </div>
                ))}
            </div>
            <div className="resultsCta">
                <Button
                    text={"i want these results"}
                    color='orange'
                />
            </div>
            <div className="resultsBg">
                <img src={pinkSvg} alt="" />
            </div>
        </section>
    )
}

const ProjectBuiltToBeSeen = ({ project }) => {
    const images = project.builtToBeSeen?.images || [];
    return (
        <section className="blackContainer" id="builtToBeSeen">
            <div className="builtToBeSeenContent">
                <Headline
                    lines={['built to be seen']}
                    highlight='built'
                >
                    <svg
                        className='builtToBeSeenStar'
                        width="56" height="56"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M43.7128 0L32.6584 26.3877L55.4256 43.7128L29.038 32.6584L11.7128 55.4256L22.7673 29.038L0 11.7128L26.3877 22.7673L43.7128 0Z" fill="var(--color-yellow)" />
                    </svg>
                    <img
                        src={underseenSvg}
                        alt=""
                        className='builtToBeSeenUnderline'
                    />
                </Headline>

                <div className="builtToBeSeenGrid">
                    <div className="builtTop">
                        {images[0] && <Card image={images[0]} style={{ width: '100%', height: '800px' }} />}
                    </div>
                    <div className="builtBottom">
                        {images[1] && <Card image={images[1]} style={{ width: '643px', height: '680px' }} />}
                        {images[2] && <Card image={images[2]} style={{ width: '643px', height: '680px' }} />}
                    </div>
                </div>
            </div>
        </section>
    )
}



const ProjectMore = ({ project }) => {
    const relatedProjects = getRelatedProjects(project.slug, 3);
    const rotations = [-8, 5, -4];

    return (
        <section className="whiteContainer" id="projectMore" data-navbar='dark'>
            <div className="moreWorkTitle">
                some more work
            </div>

            <div className="moreWorkGrid">
                {relatedProjects.map((rp, i) => (
                    <NavLink
                        to={`/work/${rp.slug}`}
                        key={rp.id}
                        className="phoneMockupCard"
                        style={{ transform: `rotate(${rotations[i % rotations.length]}deg)` }}
                    >
                        <div className="phoneMockupImage">
                            <img src={rp.cardImage} alt={rp.title} />
                            <div className="phoneMockupLabel">
                                {rp.title}
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>

            <div className="moreWorkCta">
                <Button text="start a project" color="orange" />
                <Button text="I'm an agency" color="green" />
            </div>

            <div className="moreWorkBg">
                <picture>
                    <source media="(max-width: 768px)" srcSet={pinkSvg} />
                    <img src={workSvg} alt="" />
                </picture>
            </div>
        </section>
    )
}

export default Project;