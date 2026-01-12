import "./Card.css"
import OutlinedSvgText from '../outlineSvgText/OutlineSvgText'

const Card = ({ image, title, style, border, svgTop, svgBottom, svgLeft, svgRight, svgTransform, svgText }) => {
    const containerStyle = style || {};
    const imgStyle = { width: '100%', objectFit: 'cover', flexGrow: 1 };
    if (containerStyle.height) {
        imgStyle.height = containerStyle.height;
    } else {
        imgStyle.height = '100%';
    }
    
    if (border) {
        imgStyle.border = `4px solid var(--color-white)`;
    }

    return (
        <div className="card">
            {svgText && <div style={{
                position: 'absolute',
                top: svgTop == '' ? 'auto': svgTop,
                bottom: svgBottom == '' ? 'auto': svgBottom,
                left: svgLeft == '' ? 'auto': svgLeft,
                right: svgRight == '' ? 'auto': svgRight,
                transform: svgTransform== '' ? '': svgTransform,
            }}>
                <OutlinedSvgText 
                    lines={[svgText]}
                    fill="black"
                    stroke="offwhite"
                />
            </div>}
            <img 
                src={image} 
                alt="cardImage" 
                className="cardImage" 
                style={imgStyle} 
            />
            {title && (
                <div className="cardTitle">
                    {title}
                </div>
            )}
        </div>
    )
}

export default Card;
