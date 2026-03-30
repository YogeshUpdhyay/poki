import './Website.css'
import Footer from "@/components/footer/Footer"
import { Headline, wordVariants, popInVariants } from "@/components/common/headline/Headline"
import Button from "@/components/common/button/Button"
import Card from "@/components/common/card/Card"
import Marquee from "react-fast-marquee"
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { usePreloader } from '@/utils/PreloaderContext'
import { NavLink } from 'react-router-dom'
import blueFlower from '@/assets/svgs/work/blueFlower.svg'
import pinkSvg from '@/assets/imgs/projects/pink.svg'
import { getProjectBySlug, getRelatedProjects } from '@/data/projectsData'

import { useCms } from '@/utils/context'

const Website = ({ project: projectProp }) => {
    const { data } = useCms();
    const countMeInUrl = data?.hero?.countMeInUrl;

    // Use provided project or fall back to Begun (default for /website route)
    const project = projectProp || getProjectBySlug('begun');
    const relatedProjects = getRelatedProjects(project.slug, 3);

    // Default rotations for "some more work" cards
    const rotations = [-5, 2, -4];

    return (
        <>
            <WebsiteHero project={project} />
            <WebsiteImage project={project} />
            <WebsiteAbout project={project} />
            <LogoVariations project={project} />
            <Colors project={project} />
            <Fonts project={project} />
            <BrandInAction project={project} />
            <section className="whiteContainer" id="moreWork" data-navbar='dark'>
                <img
                    src={pinkSvg}
                    alt="pink decoration"
                    className="moreWorkPinkSvg"
                />
                <p>some more work</p>
                <div className="moreWorkShowcase">
                    <div className="moreWorkRow">
                        {relatedProjects.map((rp, i) => (
                            <NavLink
                                to={`/work/${rp.slug}`}
                                key={rp.id}
                                className="moreWorkCard"
                                style={{ transform: `rotate(${rotations[i % rotations.length]}deg)` }}
                            >
                                <div className="moreWorkCardImage">
                                    <img src={rp.cardImage} alt={rp.title} />
                                    <div className="moreWorkCardLabel">{rp.title}</div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className='buttonsGroup'>
                    <Button text='start a project' href={countMeInUrl} />
                    <Button text="i'm an agency" color='green' href="/agency" />
                </div>
            </section>
            <Footer />
        </>
    )
}

const BrandInAction = ({ project }) => {
    const images = project.brandInAction?.images || [];
    return (
        <section className="blackContainer" id="brandInAction">
            <Headline
                lines={['brand in action']}
                highlight='action'
            >
                <svg
                    className='brandInActionStar'
                    width="61" height="61"
                    viewBox="0 0 61 61" fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M20.3818 -2.86102e-05L32.6995 25.8221L60.787 20.3817L34.9649 32.6994L40.4053 60.787L28.0876 34.9648L2.86102e-05 40.4052L25.8222 28.0875L20.3818 -2.86102e-05Z" fill="#EAF9C0" />
                </svg>
            </Headline>
            <div className="brandInActionGroup">
                <div className="brandInActionColumn">
                    <Card image={images[0]} style={{ width: '420px', height: '318px' }} />
                    <Card image={images[1]} style={{ width: '420px', height: '540px' }} />
                </div>
                <div className="brandInActionColumn reverse">
                    <Card image={images[3]} style={{ width: '420px', height: '318px' }} />
                    <Card image={images[2]} style={{ width: '420px', height: '540px' }} />
                </div>
                <div className="brandInActionColumn">
                    <Card image={images[4]} style={{ width: '420px', height: '429px' }} />
                    <Card image={images[5]} style={{ width: '420px', height: '429px' }} />
                </div>
            </div>
            <svg
                className='brandInActionBg'
                width="424" height="368"
                viewBox="0 0 424 368" fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M392.783 168.253C385.636 159.15 377.601 151.268 369.05 144.357C409.174 100.465 418.128 43.2373 388.667 15.248C358.623 -13.2964 300.091 -0.599214 257.938 43.5981C251.403 50.4533 245.731 57.683 240.781 65.0793C221.748 32.6078 182.292 11.2376 137.649 13.3191C76.5735 16.1638 29.081 61.7489 31.5835 115.119C32.9877 144.968 49.7269 170.917 74.8913 187.5C67.4532 191.552 60.1402 196.256 53.1053 201.765C2.33168 241.522 -15.0748 303.995 14.2327 341.282C43.5401 378.582 108.467 376.584 159.254 336.813C175.146 324.366 187.769 309.698 196.709 294.281C200.268 300.456 204.189 306.52 208.749 312.321C254.017 369.923 331.915 384.355 382.731 344.57C433.546 304.786 438.064 225.855 392.783 168.253Z" fill="#86C9FF" />
            </svg>
        </section>
    )
}

const Fonts = ({ project }) => {
    const fonts = project.fonts || {};
    const tooltipItems = fonts.tooltipItems || ['gilroy', 'plus jakarta sans'];
    const images = fonts.images || [];
    const labels = fonts.imageLabels || ['primary', 'alternative'];

    return (
        <section className="whiteContainer" id='fonts' data-navbar='dark'>
            <Headline
                lines={['what the type']}
                highlight='type'
                tooltip={
                    <>
                        {tooltipItems[0]}{'  '}
                        <svg style={{ margin: '0 3px 0 3px' }} width="2" height="10" viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1.5" width="10" height="1.5" rx="0.75" transform="rotate(90 1.5 0)" fill="#ffffffff" />
                        </svg>
                        {'  '}{tooltipItems[1]}
                    </>
                }
                tooltipColor={fonts.tooltipColor || 'orange'}
                forceOpen={true}
            />
            <div className="fontsGroup">
                <Card
                    image={images[0]}
                    svgText={labels[0]}
                    svgTop='-12%'
                    svgFill="black"
                    style={{ flex: 1, height: '360px' }}
                    contain
                />
                <Card
                    image={images[1]}
                    svgText={labels[1]}
                    svgTop='-12%'
                    svgFill="black"
                    style={{ flex: 1, height: '360px' }}
                    contain
                />
            </div>
        </section>
    )
}

const Colors = ({ project }) => {
    const colors = project.colors || [];
    return (
        <section className="blackContainer" id="colors">
            <Headline
                lines={['colors that move']}
                highlight='colors'
            >
                <svg
                    className='colorStar'
                    width="64" height="64"
                    viewBox="0 0 64 64" fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M32 0L35.6204 28.3796L64 32L35.6204 35.6204L32 64L28.3796 35.6204L0 32L28.3796 28.3796L32 0Z" fill="#EFB5D4" />
                </svg>
            </Headline>
            <div className="colorsLayout">
                <div className="twoColorBoxes">
                    {colors.slice(0, 2).map((c, i) => (
                        <div key={i} className='colorBox' style={{ '--boxColor': c.bgColor, '--contentColor': c.contentColor }}>
                            <p className='colorBoxTitle'>{c.title}</p>
                            <p className='colorBoxHex'>{c.hex}</p>
                        </div>
                    ))}
                </div>
                {colors[2] && (
                    <div className='colorBox' style={{ '--boxColor': colors[2].bgColor, '--contentColor': colors[2].contentColor }}>
                        <p className='colorBoxTitle'>{colors[2].title}</p>
                        <p className='colorBoxHex'>{colors[2].hex}</p>
                    </div>
                )}
                <div className='twoColorBoxes reverse'>
                    {colors.slice(3, 5).map((c, i) => (
                        <div key={i} className='colorBox' style={{ '--boxColor': c.bgColor, '--contentColor': c.contentColor }}>
                            <p className='colorBoxTitle'>{c.title}</p>
                            <p className='colorBoxHex'>{c.hex}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const LogoVariations = ({ project }) => {
    const logo = project.logoVariations || {};
    const tooltipItems = logo.tooltipItems || ['wordmark', 'icon mark', 'devnagri logo'];
    const images = logo.images || [];
    const separator = (
        <svg style={{ margin: '0 3px 0 3px' }} width="2" height="10" viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.5" width="10" height="1.5" rx="0.75" transform="rotate(90 1.5 0)" fill="#000000ff" />
        </svg>
    );

    return (
        <section className="whiteContainer" id="logoVariations" data-navbar='dark'>
            <Headline
                lines={['logo variations']}
                highlight='logo'
                tooltip={
                    <>
                        {tooltipItems.map((item, i) => (
                            <span key={i}>
                                {i > 0 && <>{' '}{separator}{' '}</>}
                                {item}
                            </span>
                        ))}
                    </>
                }
                tooltipColor={logo.tooltipColor || 'blue'}
                forceOpen={true}
            />
            <div className="logoVariationsGroup">
                {images.map((img, i) => (
                    <Card key={i} image={img} style={{ width: '420px', height: '420px' }} />
                ))}
            </div>
            {logo.text && (
                <p className="logoVariationsText">
                    {logo.text}
                </p>
            )}
            <Button text='dive deeper' color='green' />
        </section>
    )
}

const WebsiteAbout = ({ project }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const about = project.about || {};
    const aboutText = about.text || '';
    const aboutImages = about.images || [];
    // Split text on double newlines into paragraphs
    const paragraphs = aboutText.split('\n\n');

    return (
        <section className="blackContainer" id="websiteAbout">
            <Headline
                lines={isMobile ? ['about', 'the project'] : ['about the project']}
                highlight='about'
            >
                <svg
                    className='websiteAboutUnderline'
                    width="202" height="9"
                    viewBox="0 0 202 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M1.5 5.13552C75.5572 -2.10721 249.822 2.95856 187.15 7.5" stroke="#EFEBE7" stroke-width="3" stroke-linecap="round" />
                </svg>

                <svg
                    className='websiteAboutStar'
                    width="56" height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M43.7128 0L32.6584 26.3877L55.4256 43.7128L29.038 32.6584L11.7128 55.4256L22.7673 29.038L0 11.7128L26.3877 22.7673L43.7128 0Z" fill="#EAF9C0" />
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
            <div className="aboutImages">
                {aboutImages[0] && (
                    <Card
                        image={aboutImages[0]}
                        style={{ width: '643px', height: '680px' }}
                    />
                )}
                {aboutImages[1] && (
                    <Card
                        image={aboutImages[1]}
                        style={{ width: '643px', height: '680px' }}
                        svgText={about.svgText}
                        svgTop={about.svgTop}
                        svgRight={about.svgRight}
                        svgFill={about.svgFill}
                    />
                )}
            </div>
            <svg
                className="websiteAboutSvg"
                width="709" height="697"
                viewBox="0 0 709 697"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M89.7 164.814C120.805 176.356 153.238 173.473 184.97 171.08C215.055 168.814 237.772 129.666 232.542 94.5716C230.777 82.6996 228.896 70.8489 226.897 59.0195C224.952 47.5092 222.783 36.0414 219.7 18.9462C268.005 40.903 292.53 100.093 352.007 85.9548C402.853 73.8701 432.618 31.6373 469.91 0C469.304 10.638 468.672 17.5527 469.304 27.0524C475.183 115.422 496.008 165.484 586.016 180.675C626.593 187.526 667.36 188.069 709 193.409C674.908 203.238 640.455 212.004 606.788 223.11C518.682 252.184 504.204 310.448 566.498 379.637C583.093 398.073 597.72 418.285 613.251 437.689L613.528 437.359C588.057 429.402 563.086 418.498 537.009 414.041C453.975 399.86 416.183 434.444 405.287 528.175C398.877 583.291 400.44 639.831 404.532 697C395.879 668.948 387.832 640.683 378.381 612.896C369.771 587.599 360.065 562.653 350.072 537.867C308.327 434.242 249.019 416.136 131.861 452.486C87.829 466.145 45.1902 484.283 0 497.017C40.7573 464.05 84.6186 436.146 124.951 403.296C207.209 336.288 182.026 289.927 132.828 230.982C116.032 210.866 92.1982 196.622 71.6069 179.707C77.6557 174.75 83.6832 169.782 89.7 164.814Z" fill={about.bgColor || "#EFB5D4"} />
            </svg>
        </section>
    )
}

const WebsiteImage = ({ project }) => {
    return (
        <section className="websiteImageWrapper" data-navbar="dark">
            <img
                src={project.websiteImage}
                alt={`${project.title} website preview`}
                className='websiteImage'
            />
        </section>
    )
}

const WebsiteHero = ({ project }) => {
    const { isRevealed } = usePreloader();
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const [showButtons, setShowButtons] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (inView && isRevealed) {
            const timer = setTimeout(() => setShowButtons(true), 2000);
            return () => clearTimeout(timer);
        }
    }, [inView, isRevealed]);

    return (
        <section className="websiteHero" data-navbar='dark' ref={ref}>
            <img
                src={blueFlower}
                alt="blue flower decoration"
                className="websiteHeroFlower"
            />
            <Headline
                lines={[project.hero.headline]}
                forceOpen={true}
                animated={true}
                animationType="word"
            >
                <motion.div
                    variants={popInVariants}
                    className={`websiteHeroTooltip tooltip ${project.hero.tooltipColor || 'pink'}`}
                    style={{ transformOrigin: 'bottom left' }}
                >
                    {project.hero.tooltipItems.map((item, i) => (
                        <span key={i}>
                            {i > 0 && <>
                                {'  '}
                                <svg style={{ margin: '0 3px 0 3px' }} width="2" height="10" viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="1.5" width="10" height="1.5" rx="0.75" transform="rotate(90 1.5 0)" fill="#000000ff" />
                                </svg>
                                {'  '}
                            </>}
                            {item}
                        </span>
                    ))}
                </motion.div>
                {project.hero.Cartoon && (
                    <motion.div 
                        className="websiteHeroCartoon" 
                        variants={wordVariants}
                        style={isMobile ? project.hero.cartoonMobileStyle : project.hero.cartoonStyle}
                    >
                        <project.hero.Cartoon />
                    </motion.div>
                )}
            </Headline>
            <motion.p
                className="websiteHeroText"
                initial={{ opacity: 0, y: 30 }}
                animate={inView && isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
            >
                {project.hero.heroText}
            </motion.p>
            <div className="websiteHeroButtonWrapper">
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
        </section>
    )
}

export default Website;
