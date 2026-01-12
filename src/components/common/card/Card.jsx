import "./Card.css"

const Card = ({ image, title, alt, style, border }) => {
    const containerStyle = style || {};
    const imgStyle = { width: '100%', objectFit: 'cover' };
    if (containerStyle.height) {
        imgStyle.height = '100%';
    } else {
        imgStyle.height = 'auto';
    }
    
    if (border) {
        imgStyle.border = `4px solid var(--color-white)`;
    }

    return (
        <div className="card">
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
