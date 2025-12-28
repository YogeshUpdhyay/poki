import './Offerings.css'
import headerUnderlineSvg from '../../assets/underlines/heroUnderline.svg'

export default function Offerings({
  offerCardSvg,
  title,
  cardColor = 'green',
  offeringDescLines = [],
}) {
  return (
    <div className="offerings">
      {[0, 1, 2].map((idx) => (
        <div className={`offeringCard ${cardColor}`} key={idx}>
          <img
            src={offerCardSvg}
            alt={`offeringCardSvg-${idx}`}
            className="offeringCardSvg"
          />

          <div className="offeringCardTitle">
            {title}
          </div>

          <img
            src={headerUnderlineSvg}
            alt={`offeringCardSeprator-${idx}`}
            className='offeringCardSeprator'
          />

          <div className="offeringDesc">
            {offeringDescLines.map((line, i) => (
              <div className="offeringDescLine" key={i}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 0L11.1001 6.89989L18 9L11.1001 11.1001L9 18L6.89989 11.1001L0 9L6.89989 6.89989L9 0Z" fill="#EFEBE7"/>
                </svg>
                {line}
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  )
}
