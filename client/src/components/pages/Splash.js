import { Link } from 'react-router-dom'
import AuthButtons from '../auth/AuthButtons'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import gameBanner from '../../images/game-banner.jpg'
import { useEffect } from 'react'
function Splash() {
    const {user} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    useEffect(() => {
      if(user){
        navigate('/')
    }
    },[])

  return (
    <div className="mainComponent browse-container">
        <header className="banner-section" style={{backgroundImage: `url(${gameBanner})`}}>
          <div>
            <h1>Welcome to ReadyUp</h1>
            <p>Search for games. Add games to your library. Connect with friends.</p>
            <Link className="btn" to="/browse">Browse</Link>
            <AuthButtons />
          </div>
        </header>
        </div>
  )
}

export default Splash