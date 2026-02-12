import './Agency.css'
import { motion } from 'framer-motion'
import { Headline, letterVariants } from "../../components/common/headline/Headline"
import Button from "../../components/common/button/Button"
import agencyCartoon from '../../assets/svgs/agency/agencyCartoon.svg'
import agencyAdvCartoon from '../../assets/svgs/agency/agencyAdvCartoon.svg'
import agencyBg from '../../assets/svgs/agency/agencyBg.svg'
import Collaborate from '../../components/collaborate/Collaborate'
import Footer from '../../components/footer/Footer'
import agencyHeroUnderline from '@/assets/svgs/agency/agencyHeroUnderline.svg'
import agencyHeroStar from '@/assets/svgs/agency/agencyHeroStar.svg'
import OutlinedSvgText from '../../components/common/outlineSvgText/OutlineSvgText'
import { useCms } from '../../utils/context'
import PokiLogo from '../../assets/imgs/logo.svg?react'
import { useInView } from 'react-intersection-observer'

const Agency = () => {
    return (
        <div className="agency-page">
            <AgencyHero />
            <AgencyPartnerWith />
            <AgencyAdv />
            <AgencyPartnerShips />
            <Collaborate />
            <Footer />
        </div>
    )
}

const AgencyPartnerShips = () => {
    const { data } = useCms();
    const countMeInUrl = data?.hero?.countMeInUrl;

    return (
        <section className="partnerships">
            <Headline
                lines={['partnerships that paid off']}
                highlight={'partnerships'}
            >
                <img 
                    src={agencyHeroStar} 
                    alt="agencyHeroStar" 
                    className='agencyPartnerStar'
                />
            </Headline>
            <div className="partnerReview">
                <div className="partnerReviewCard">
                    <div className="outlineTextWrapper">
                        <OutlinedSvgText
                            lines={['scale without', 'hiring']}
                            fill='green'
                            stroke='white'
                            rotate='0deg'
                            translateY='0%'
                        />
                    </div>
                    <div className="partnerReviewText">
                        In just 6 months, this branding studio increased their 
                        project capacity by  <strong>180%</strong> by partnering with us 
                        for white-label UI and web design. Instead of hiring additional designers, 
                        they outsourced <strong>12 full website projects</strong> to our team, 
                        reducing internal workload while improving delivery speed. 
                        <br/> <br />
                        The result: <strong>42% higher</strong> profit margins and zero missed 
                        deadlines during peak periods.
                    </div>
                    <div className="partnerName">
                        Visionary Brand Partners
                    </div>
                    <div className="partnerLocation">
                        California, USA
                    </div>
                </div>
                <div className="partnerReviewCard">
                    <div className="outlineTextWrapper">
                        <OutlinedSvgText
                            lines={['when two', 'teams win']}
                            fill='violet'
                            stroke='white'
                            rotate='0deg'
                            translateY='0%'
                        /> 
                    </div>
                    
                    <div className="partnerReviewText">
                        A development-only agency wanted to improve project 
                        outcomes by offering custom website design before 
                        jumping into build and deployment. By partnering with us, 
                        they introduced full UI & web design services to their 
                        workflow without hiring a design team. 
                        <br /> <br />
                        In the first 5 months, they increased average <strong>project 
                        value by 38%,</strong> reduced revisions during development by 
                        <strong> 60%,</strong> and <strong> booked 10 new end-to-end website projects </strong> 
                        with stronger client satisfaction and smoother launches.
                    </div>
                    <div className="partnerName">
                        Untangled Web Services
                    </div>
                    <div className="partnerLocation">
                        London, UK
                    </div>
                </div>
            </div>
            <Button text="i want these results" href={countMeInUrl} />
        </section>
    )
}

const AgencyAdv = () => {
    return (
        <section className="advantage" data-navbar='dark'>
                <Headline
                    tooltipColor='blue'
                    tooltip='good things happen here'
                    forceOpen
                >
                    the <PokiLogo className="agencyHeadlineLogo" style={{ color: '#427665', width: '191px', height: '69px', verticalAlign: 'middle' }} /> advantage
                    <img 
                        src={agencyAdvCartoon} 
                        alt="advCartoon" 
                        className="advCartoon" 
                    />
                </Headline>
                <div className="advList">
                    <div className="advListItem">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.1733 -3.64892e-05L12.3726 7.70607L19.9972 10.173L12.2911 12.3723L9.82423 19.9969L7.62494 12.2908L0.00028063 9.82392L7.70639 7.62462L10.1733 -3.64892e-05Z" fill="#1A1A1A"/>
                        </svg>

                        get access to cost-efficient rates while we handle design heavy-lifting
                    </div>
                    <div className="advListItem">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.1733 -3.64892e-05L12.3726 7.70607L19.9972 10.173L12.2911 12.3723L9.82423 19.9969L7.62494 12.2908L0.00028063 9.82392L7.70639 7.62462L10.1733 -3.64892e-05Z" fill="#1A1A1A"/>
                        </svg>

                        a dedicated team, clear processes, timely delivery and quality output
                    </div>
                    <div className="advListItem">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.1733 -3.64892e-05L12.3726 7.70607L19.9972 10.173L12.2911 12.3723L9.82423 19.9969L7.62494 12.2908L0.00028063 9.82392L7.70639 7.62462L10.1733 -3.64892e-05Z" fill="#1A1A1A"/>
                        </svg>

                        offer full-service UI & branding to clients without expanding in-house headcount
                    </div>
                    <div className="advListItem">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.1733 -3.64892e-05L12.3726 7.70607L19.9972 10.173L12.2911 12.3723L9.82423 19.9969L7.62494 12.2908L0.00028063 9.82392L7.70639 7.62462L10.1733 -3.64892e-05Z" fill="#1A1A1A"/>
                        </svg>

                        scale quickly during peak demand without compromising quality
                    </div>
                    <div className="advListItem">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.1733 -3.64892e-05L12.3726 7.70607L19.9972 10.173L12.2911 12.3723L9.82423 19.9969L7.62494 12.2908L0.00028063 9.82392L7.70639 7.62462L10.1733 -3.64892e-05Z" fill="#1A1A1A"/>
                        </svg>

                        collaborate, co-create, and grow your agency’s capabilities
                    </div>
                </div>
                <img src={agencyBg} alt="" className="agencyBg" />
            </section>
    )
}

const AgencyPartnerWith = () => {
    const { data } = useCms();
    const countMeInUrl = data?.hero?.countMeInUrl;

    return (
        <section className="partnerWith">
            <Headline
                lines={['who we partner with']}
                highlight={'partner'}
            >
                <img 
                    src={agencyHeroUnderline} 
                    alt="agencyHeroUnderline" 
                    className='agencyHeroUnderline' 
                />
                <img 
                    src={agencyHeroStar} 
                    alt="agencyHeroStar" 
                    className='agencyHeroStar' 
                />
            </Headline>
            <div className="partnerCardsGroup">
                <PartnerCard
                    text='you bring the project, we handle the design.'
                    titleLines={['referrals &',  'collaborators']}
                    color='green'
                    fill={'white'}
                    stroke={'green'}
                />

                <PartnerCard
                    text='we do the work, you put your name on it.'
                    titleLines={['white-label',  'allies']}
                    color='pink'
                    fill={'black'}
                    stroke={'pink'}
                    translateY={'-20%'}
                    rotate={'2deg'}
                />

                <PartnerCard
                    text='when things get busy, we jump in and help.'
                    titleLines={['overflow', 'rescuers']}
                    color='blue'
                    fill={'black'}
                    stroke={'blue'}
                    translateY={'-20%'}
                    rotate={'-4deg'}
                />

                <PartnerCard
                    text='hand over everything. we’ll handle it.'
                    titleLines={['full-stack',  'friends']}
                    color='orange'
                    fill={'white'}
                    stroke={'orange'}
                    translateY={'-30%'}
                    rotate={'2deg'}
                />

            </div>
            <Button text="let's team up" href={countMeInUrl} />
        </section>
    )
}

const PartnerCard = ({ titleLines, text, color, fill, stroke, translateY, rotate }) => {
    return (
        <div className={`partnerCard ${color}`}>
            <OutlinedSvgText 
                lines={titleLines} 
                fill={fill} 
                stroke={stroke}
                translateY={translateY}
                rotate={rotate}
            />
            <p className='partnerCardText'>{text}</p>
        </div>
    )
}

const AgencyHero = () => {
    const { data } = useCms();
    const countMeInUrl = data?.hero?.countMeInUrl;

    const agencyCartoonVariants = {
        hidden: { ...letterVariants.hidden, y: "-90%" },
        visible: { ...letterVariants.visible, y: "-90%" }
    };

    const popInVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: { 
            scale: 1, 
            opacity: 1,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100
            }
        }
    };

    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <section className="agencyHero" data-navbar='dark' ref={ref}>
            <Headline
                lines={['your creative', 'muscle, without', 'the headcount']}
                highlight={"headcount"}
                // tooltipColor='pink'
                // tooltip="because great work isn't built alone"
                forceOpen
                animated={true}
            >
                <motion.div 
                    variants={agencyCartoonVariants} 
                    className="agencyCartoon"
                >
                    <img
                        src={agencyCartoon}
                        alt="agencyCartoon"
                        style={{ width: '100%', height: '100%', display: 'block' }}
                    />
                </motion.div>
                <motion.div 
                    variants={popInVariants}
                    className='agencyHeroTooltip tooltip pink'
                    style={{ transformOrigin: 'bottom left' }}
                >
                    because great work isn't built alone
                </motion.div>
            </Headline>
            <div className="agencyButtons">
                <Button text="let's team up" href={countMeInUrl} />
                <Button text="see what we do" color='green' href="/work" />
            </div>
        </section>
    )
}

export default Agency