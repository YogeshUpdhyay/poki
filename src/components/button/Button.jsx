import './Button.css'

function Button({ text }) {
  return (
    <div className='cta-btn-background'>
      <a className='cta-btn' type='button'>
        {text}
      </a>
    </div>
  )
}

export default Button

