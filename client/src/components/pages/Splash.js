import { Link } from 'react-router-dom'
import AuthButtons from '../auth/AuthButtons'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import gameBanner from '../../images/game-banner.jpg'
import { useEffect, useState} from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

function Splash() {
    const {user} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const screenshots = [
      <img src='/images/splash/splash0.png' onDragStart={handleDragStart} role="presentation" />,
      <img src='/images/splash/splash1.png' onDragStart={handleDragStart} role="presentation" />,
      <img src='/images/splash/splash2.png' onDragStart={handleDragStart} role="presentation" />
    ]
    useEffect(() => {
      if(user){
        navigate('/')
    }
    },[])

  return (
    <div className="mainComponent browse-container">
      <header className="banner-section" style={{backgroundImage: `url(${gameBanner})`}}>
        <div className='splash-section'>
          <h1>Welcome to ReadyUp</h1>
          <p>Search for games. Add games to your library. Connect with friends.</p>
          <div className="splash-btn-container">
<Link className="btn splash-btn-browse" to="/browse">Browse</Link>
          <AuthButtons />
          </div>
          
        </div>
        {/* <div className="modal-screenshots-container"> */}
        <div className=" splash-section splash-screenshots-container">
          <AliceCarousel 
          mouseTracking="true"
          autoPlayStrategy="action"
          items={screenshots}
          infinite="true"
          autoPlay="true"
          autoPlayInterval="2500"
          animationDuration="1750"
          disableSlideInfo="true"
          animationType="fadeout"
          disableButtonsControls="true"
          disableDotsControls="true"
          />
      </div>
      {/* </div> */}
      </header>
      
    </div>
  )
}

export default Splash