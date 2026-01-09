import './GenericCarousel.css';

export const GenericCarousel = ({children}) => {
  return (
    <div className="carousel">
      <div className="innerCarousel">
        {children}
      </div>
      <div aria-hidden="true" className="innerCarousel">
        {children}
      </div>
    </div>
  )
}

export const GenericCarouselItem = ({keyNumber, title, image}) => {
  return (
    <div className="carouselItem" key={keyNumber}>
      <img src={image} alt='genericCarouselItemImage' className='carouselImage'/>
      {title && <div className='carouselTitle'>{title}</div>}
    </div>
  )
}