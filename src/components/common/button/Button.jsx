import './Button.css'

function Button({ text, color, href }) {
  return (
    <div className={`cta-btn-background ${color ? color : ''}`}>
      <a href={href} className={`cta-btn ${color ? color : ''}`} type='button'>
        {text}
      </a>
    </div>
  )
}

export default Button

