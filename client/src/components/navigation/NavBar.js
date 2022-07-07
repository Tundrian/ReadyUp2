import { FaBars } from "react-icons/fa"
import { AiOutlineSearch } from "react-icons/ai"
import { GiTrafficLightsReadyToGo } from "react-icons/gi"


function NavBar({toggleNavMenu}) {

  return (
    <div className="nav nav-container mainComponent">
        <FaBars onClick={toggleNavMenu} className="nav-menu-icon"/>
        <div className="nav nav-title-wrapper">
            <GiTrafficLightsReadyToGo className="logo nav-logo"/>
            <span>Ready Up</span>
        </div>
        {/* <AiOutlineSearch /> */}
        <span></span>
    </div>
  )
}

export default NavBar