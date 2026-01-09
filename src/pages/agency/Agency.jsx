import './Agency.css'
import Navbar from "../../components/navbar/Navbar"
import { Headline } from "../../components/common/headline/Headline"
import Button from "../../components/common/button/Button"
import agencyCartoon from '../../assets/svgs/agency/agencyCartoon.svg'
import agencyAdvCartoon from '../../assets/svgs/agency/agencyAdvCartoon.svg'
import agencyBg from '../../assets/svgs/agency/agencyBg.svg'
import Collaborate from '../../components/collaborate/Collaborate'
import Footer from '../../components/footer/Footer'
import agencyHeroUnderline from '@/assets/svgs/agency/agencyHeroUnderline.svg'
import agencyHeroStar from '@/assets/svgs/agency/agencyHeroStar.svg'
import OutlinedSvgText from '../../components/common/outlineSvgText/OutlineSvgText'

const Agency = () => {
    return (
        <>
            <Navbar />
            <AgencyHero />
            <AgencyPartnerWith />
            <AgencyAdv />
            <AgencyPartnerShips />
            <Collaborate />
            <Footer />
        </>
    )
}

const AgencyPartnerShips = () => {
    return (
        <section className="partnerships">
            <Headline
                lines={['partnerships that paid off']}
                highlight={'partnerships'}
            >
                <img src="" alt="" />
            </Headline>
            <div className="partnerReview"></div>
            <Button text="i want these results" />
        </section>
    )
}

const AgencyAdv = () => {
    return (
        <section className="advantage" data-navbar='dark'>
                <Headline
                    lines={['the poki advantage']}
                    highlight={'poki'}
                    tooltipColor='blue'
                    tooltip='good things happen here'
                >
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
            <Button text="let's team up" />
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
    return (
        <section className="agencyHero" data-navbar='dark'>
            <Headline
                lines={['your creative', 'muscle, without', 'the headcount']}
                highlight={"headcount"}
                tooltipColor='pink'
                tooltipText='because great work isn' t built alone
            >
                <img
                    src={agencyCartoon}
                    alt="agencyCartoon"
                    className="agencyCartoon"
                />
            </Headline>
            <div className="agencyButtons">
                <Button text="let's team up" />
                <Button text="see what we do" color='green' />
            </div>
        </section>
    )
}

export default Agency