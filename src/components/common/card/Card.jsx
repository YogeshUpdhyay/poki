import "./Card.css"

const Card = ({ image, title, alt, style, className }) => {
    const containerStyle = style || {};
    const imgStyle = { width: '100%', objectFit: 'cover' };
    if (containerStyle.height) {
        imgStyle.height = '100%';
    } else {
        imgStyle.height = 'auto';
    }

    return (
        <div className="card">
            <img src={image} alt={alt || title || "projectCardImage"} className="cardImage" style={imgStyle} />
            <div className="cardTitle">
                {title}
            </div>
        </div>
    )
}

export default Card;
