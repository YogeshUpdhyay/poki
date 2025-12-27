import './Navbar.css'
import logo from '../../assets/imgs/logo.svg'
import Button from '../button/Button'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navLinks">
        <a>work</a>
        <a>about</a>
        <a>i'm an agency</a>
      </div>
      <img src={logo} alt="logo" className="logo" />
      <Button text="count me in" />
    </nav>
  )
}

export default Navbar

