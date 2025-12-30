import './Button.css'

function Button({ text, color }) {
  return (
    <div className={`cta-btn-background ${color ? color : ''}`}>
      <a className={`cta-btn ${color ? color : ''}`} type='button'>
        {text}
      </a>
    </div>
  )
}

export default Button

