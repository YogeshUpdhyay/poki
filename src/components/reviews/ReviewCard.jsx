import './ReviewCard.css'

export default function ReviewCard({
  reviewerName = 'Nikolas Gregory',
  location = 'United States',
  reviewText = `Poki Design Studio transformed our brand with a stunning logo and
  cohesive design elements that truly represent our vision. Their
  creativity and professionalism exceeded our expectations!`,
  avatarSrc = '',
}) {
  return (
    <div className="reviewCard">
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
      <div className="reviewCardImage" />
    </div>
  )
}
