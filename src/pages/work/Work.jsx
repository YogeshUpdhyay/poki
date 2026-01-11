import './Work.css'
import { useState } from 'react';
import Navbar from "../../components/navbar/Navbar"
import Marquee from "react-fast-marquee";
import SkewedTape from "../../components/common/skewedTape/SkewedTape";
import OutlinedSvgText from '../../components/common/outlineSvgText/OutlineSvgText';
import Card from '@/components/common/card/Card';
import Collaborate from '@/components/collaborate/Collaborate'
import Footer from '@/components/footer/Footer'

// Menu pills data
const MENU_PILLS = [
    { id: 'websites', label: 'websites' },
    { id: 'logo-designs', label: 'logo designs' },
    { id: 'brand-identities', label: 'brand identities' },
    { id: 'products-apps', label: 'products & apps' }
];

// Dummy card data for each pill
const CARD_DATA = {
    'websites': [
           { title: 'Tech Startup Co', image: 'https://placehold.co/360x500' },
           { title: 'Fashion Boutique', image: 'https://placehold.co/360x500' },
           { title: 'Digital Agency Pro', image: 'https://placehold.co/360x500' },
           { title: 'E-Commerce Store', image: 'https://placehold.co/360x500' },
           { title: 'Travel Platform', image: 'https://placehold.co/360x500' },
           { title: 'Fitness App', image: 'https://placehold.co/360x500' },
           { title: 'E-Commerce Store', image: 'https://placehold.co/360x500' },
           { title: 'Travel Platform', image: 'https://placehold.co/360x500' },
           { title: 'Fitness App', image: 'https://placehold.co/360x500' },
           { title: 'E-Commerce Store', image: 'https://placehold.co/360x500' },
           { title: 'Travel Platform', image: 'https://placehold.co/360x500' },
           { title: 'Fitness App', image: 'https://placehold.co/360x500' },
    ],
    'logo-designs': [
        { title: 'Brand Alpha', image: 'https://placehold.co/360x500' },
        { title: 'Creative Studios', image: 'https://placehold.co/360x500' },
        { title: 'Innovation Labs', image: 'https://placehold.co/360x500' },
        { title: 'Design House', image: 'https://placehold.co/360x500' },
        { title: 'Studio X', image: 'https://placehold.co/360x500' },
        { title: 'Vision Brands', image: 'https://placehold.co/360x500' },
        { title: 'E-Commerce Store', image: 'https://placehold.co/360x500' },
        { title: 'Travel Platform', image: 'https://placehold.co/360x500' },
        { title: 'Fitness App', image: 'https://placehold.co/360x500' },
        { title: 'E-Commerce Store', image: 'https://placehold.co/360x500' },
        { title: 'Travel Platform', image: 'https://placehold.co/360x500' },
        { title: 'Fitness App', image: 'https://placehold.co/360x500' },
    ],
    'brand-identities': [
           { title: 'Luxury Goods Inc', image: 'https://placehold.co/360x500' },
           { title: 'Modern Living Co', image: 'https://placehold.co/360x500' },
           { title: 'Global Solutions', image: 'https://placehold.co/360x500' },
           { title: 'Eco Brands', image: 'https://placehold.co/360x500' },
           { title: 'Premium Services', image: 'https://placehold.co/360x500' },
           { title: 'Elite Collective', image: 'https://placehold.co/360x500' },
           { title: 'E-Commerce Store', image: 'https://placehold.co/360x500' },
           { title: 'Travel Platform', image: 'https://placehold.co/360x500' },
           { title: 'Fitness App', image: 'https://placehold.co/360x500' },
        { title: 'E-Commerce Store', image: 'https://placehold.co/360x500' },
           { title: 'Travel Platform', image: 'https://placehold.co/360x500' },
           { title: 'Fitness App', image: 'https://placehold.co/360x500' },
    ],
    'products-apps': [
           { title: 'Mobile App Studio', image: 'https://placehold.co/360x500' },
           { title: 'Software Solutions', image: 'https://placehold.co/360x500' },
           { title: 'App Developers Inc', image: 'https://placehold.co/360x500' },
           { title: 'Product Innovation', image: 'https://placehold.co/360x500' },
           { title: 'Tech Products Ltd', image: 'https://placehold.co/360x500' },
           { title: 'Digital Tools Co', image: 'https://placehold.co/360x500' },
           { title: 'E-Commerce Store', image: 'https://placehold.co/360x500' },
           { title: 'Travel Platform', image: 'https://placehold.co/360x500' },
           { title: 'Fitness App', image: 'https://placehold.co/360x500' },
           { title: 'E-Commerce Store', image: 'https://placehold.co/360x500' },
           { title: 'Travel Platform', image: 'https://placehold.co/360x500' },
           { title: 'Fitness App', image: 'https://placehold.co/360x500' },
    ]
};

const Work = () => {
    return (
        <>
            <Navbar />
            <section className="work">
                <WorkTape />
                <WorkMenu />
            </section>
            <Collaborate />
            <Footer />
        </>
    )
}


const WorkMenu = () => {
    const [activePill, setActivePill] = useState('websites');
    const cards = CARD_DATA[activePill] || [];

    const handlePillClick = (pillId) => {
        setActivePill(pillId);
    };

    // Split cards into rows of 3
    const cardRows = [];
    for (let i = 0; i < cards.length; i += 3) {
        cardRows.push(cards.slice(i, i + 3));
    }
    
    return (
        <div className="menu">
            <div className="menuTitle">
                on the menu
            </div>
            <div className="menuList">
                {MENU_PILLS.map((pill) => (
                    <div
                        key={pill.id}
                        className={`menuPill ${activePill === pill.id ? 'active' : ''}`}
                        onClick={() => handlePillClick(pill.id)}
                    >
                        {pill.label}
                    </div>
                ))}
            </div>
            <div className="menuCardsLayout">
                {cardRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="menuCardsRow">
                        {row.map((card, cardIndex) => (
                            <Card
                                key={cardIndex}
                                image={card.image}
                                title={card.title}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

const WorkTape = () => {
    return (
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
                            lines={['done right']} 
                            stroke='white' 
                            fill='violet'
                            translateY='0%'
                            rotate='0deg'
                            size='40'
                        />
                        work
                        <OutlinedSvgText    
                            lines={['freesg']} 
                            stroke='white' 
                            fill='blue'
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
    )
}
export default Work
