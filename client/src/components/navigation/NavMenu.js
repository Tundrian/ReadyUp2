import { FaLanguage } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import AuthButtons from '../auth/AuthButtons'

function NavMenu() {

  return (
    <div className="nav-menu-container">
        <button className="nav-close">X</button>
        <ul className="menu-links menu-section">
            <li><Link className="menu-link active-link" to="/">Ready Up</Link></li>
            <li><Link className="menu-link active-link" to="/">Games</Link></li>
            <ul className="menu-links-inner">
                <li><Link className="menu-link-inner" to="/">Browse Games</Link></li>
                <li><Link className="menu-link-inner" to="/">Browse By Console</Link></li>
            </ul>
            <li><Link className="menu-link" to="/library">My Games Library</Link></li>
            <li><Link className="menu-link" to="/myLibrary">New Library</Link></li>
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
            <a href="/"><FaLanguage className="language-icon"/>Language Preferences</a>
        </div>
    </div>
  )
}

export default NavMenu