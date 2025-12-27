import './HeadlineContainer.css'
import headlineCartoon from '../../assets/imgs/heroCartoon.svg'
import Star from '../star/star'
import HeadlineUnderline from '../headlineunderline/headlineUnderline'

function HeadlineContainer() {
  return (
    <div className="headlineContainer">
      <h1 className="headlineText">
        <span className="headlineWrapper">
          we make your brand, <br />
          <span className="headlineHighlight">sharper</span> and louder

          <img
            src={headlineCartoon}
            alt="heroCartoon"
            className="headlineCartoon"
          />

          <div className="headlineStar">
            <Star />
          </div>
          <div className="headlineUnderlinePosition">
            <HeadlineUnderline />
          </div>
        </span>
      </h1>
    </div>
  )
}

export default HeadlineContainer

