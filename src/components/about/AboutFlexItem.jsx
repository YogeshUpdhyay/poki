function AboutFlexItem({ title, svg, r, text }) {
  return (
    <>
      <div className="aboutFlex">
        <div className="aboutFlexTitle">
          {title}
          <img 
            className="aboutFlexSvg" 
            src={svg} 
            style={{'--r': r}}
          />
        </div>
        <div className="aboutFlexText">
          {text}
        </div>
      </div>
    </>
  )
}

export default AboutFlexItem
