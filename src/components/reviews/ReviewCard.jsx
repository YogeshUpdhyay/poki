import './ReviewCard.css'
import avatarImgSrc from '../../assets/imgs/avatar.png'
import reviewImgPlaceholder from '../../assets/imgs/reviewimg.png'

export default function ReviewCard({
  reviewerName = 'Nikolas Gregory',
  location = 'United States',
  reviewText = `Poki Design Studio transformed our brand with a stunning logo and
  cohesive design elements that truly represent our vision. Their
  creativity and professionalism exceeded our expectations!`,
  avatarSrc = avatarImgSrc,
  color = 'yellow',
  reverse = false,
  projectImage = null,
}) {
  return (
    <div className={`reviewCard ${color} ${reverse ? 'reverse' : ''}`}>
      <div className="reviewCardContent">
        <div className="reviewCardReviewer">
          {avatarSrc ? (
            <img className="reviewCardReviewerAvatar" src={avatarSrc} alt="avatar" />
          ) : (
            <div className="reviewCardReviewerAvatar" />
          )}
          <div className="reviewCardReviewerInfo">
            <div className="reviewCardReviewerName">{reviewerName}</div>
            <p className="reviewCardReviewerLocation">{location}</p>
          </div>
        </div>
        <div className="reviewCardReview">{reviewText}</div>
      </div>
      <div className="reviewCardImage">
        <img 
          src={projectImage || reviewImgPlaceholder}
          alt="project work" 
          style={{
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            borderRadius: '12px'
          }} 
        />
      </div>
    </div>
  )
}
