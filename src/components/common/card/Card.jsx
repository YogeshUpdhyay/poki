import "./Card.css"
import OutlinedSvgText from '../outlineSvgText/OutlineSvgText'

const Card = ({ 
    image, title, style, border, 
    svgTop, svgBottom, svgLeft, svgRight, 
    svgTransform, svgText, svgFill
}) => {
    const containerStyle = style || {};
    const imgStyle = { flexGrow: 1 };
    if (containerStyle.height) {
        imgStyle.height = containerStyle.height;
    } else {
        imgStyle.height = '100%';
    }

    if (containerStyle.width) {
        imgStyle.width = containerStyle.width;
    } else {
        imgStyle.width = '100%';
    }
    
    if (border) {
        imgStyle.border = `4px solid var(--color-white)`;
    }

    return (
        <div className="cardWrapper" style={imgStyle}>
            <div className="card">
                <img 
                    src={image} 
                    alt="cardImage" 
                    className="cardImage"
                />
                {title && (
                    <div className="cardTitle">
                        {title}
                    </div>
                )}
            </div>
            {svgText && <div style={{
                position: 'absolute',
                top: svgTop == '' ? 'auto': svgTop,
                bottom: svgBottom == '' ? 'auto': svgBottom,
                left: svgLeft == '' ? 'auto': svgLeft,
                right: svgRight == '' ? 'auto': svgRight,
                transform: svgTransform== '' ? '': svgTransform,
                zIndex: 60,
            }}>
                <OutlinedSvgText 
                    lines={[svgText]}
                    fill={svgFill == '' ? 'black' : svgFill}
                    stroke="offwhite"
                />
            </div>}
        </div>
    )
}

export default Card;
