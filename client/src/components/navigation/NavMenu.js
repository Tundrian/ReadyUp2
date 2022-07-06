import { FaLanguage } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AiFillCloseCircle } from 'react-icons/ai'
import AuthButtons from '../auth/AuthButtons'

function NavMenu({toggle}) {

  return (
    <div className="nav-menu-container">
        <button onClick={toggle} className="nav-close"><AiFillCloseCircle /></button>
        <ul className="menu-links menu-section">
            <li><Link className="menu-link active-link" to="/">Ready Up</Link></li>
            <li><Link className="menu-link " to="/browse">Games</Link></li>
            <ul className="menu-links-inner">
                {/* <li><Link className="menu-link-inner" to="/browse">Browse Games</Link></li> */}
                {/* <li><Link className="menu-link-inner" to="/browse">Browse By Console</Link></li> */}
            </ul>
            {/* <li><Link className="menu-link" to="/library">My Games Library</Link></li> */}
            <li><Link className="menu-link" to="/myLibrary">My Game Library</Link></li>
        </ul>
        <nav className="menu-section nav-site-links-container">
            <ul className="nav-site-links">
                <li><a href="/">About</a></li>
                <li><a href="/">Download</a></li>
                <li><a href="/">Help</a></li>
            </ul>
        </nav>
        <AuthButtons />
        <div className="menu-section nav-language-section">
            {/* <a href="/"><FaLanguage className="language-icon"/>Language Preferences</a> */}
        </div>
    </div>
  )
}

export default NavMenu