import { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {BsStarFill, BsStarHalf, BsFillCalendar2EventFill } from 'react-icons/bs'
import { toast } from 'react-toastify'
import {useDispatch} from 'react-redux'
import { setGame, getGames, deleteGame } from '../../features/library/librarySlice'
import PacmanLoader from 'react-spinners/PacmanLoader'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.7)',
  zIndex: 50
}

const checkIfLoggedIn = (u) => {
  if(!u)
  {
    toast.error('Please log in to save games to library')
    return false
  }
  return true
}

function GameModal({open, children, onClose, game, url}) {
  let [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const APIKEY = process.env.REACT_APP_API_KEY
  const [gameDetails, setGameDetails] = useState(null)
  const screenshotURL = `https://api.rawg.io/api/games/${game.game.id}/screenshots?key=${APIKEY}`
  const [screenshots, setScreenshots] = useState(null)
  
  const platformClick = async(e) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(!checkIfLoggedIn(user)){
      return
    }
    const gameSelected = e.target.getAttribute('data-console') // Get game name from card
    const platformSelected = e.target.getAttribute('data-platform')
    let dbGames
    let removePlatform
    let newPlatforms

    await (dispatch(getGames())
    .then(res => {
      dbGames = res.payload.filter(x => x.gameName === gameSelected)[0]
    }))
    if(dbGames){
      // Check if platform already exists, if so remove it
      if(dbGames.platforms.includes(platformSelected)){
        removePlatform = true
        
        if(e.target.localName === 'img'){
          e.target.parentElement.classList.remove('platform-in-library')
        }else{
          e.target.classList.remove('platform-in-library')
        }
      }
      //merges platforms from card selected with platforms from database01
      if(removePlatform){
        newPlatforms = [...new Set(dbGames.platforms)].filter(x => x !== platformSelected)
      }else{
        newPlatforms = [...new Set(dbGames.platforms.concat(platformSelected))]
        if(e.target.localName === 'img'){
          e.target.parentElement.classList.add('platform-in-library')
        }else{
          e.target.classList.add('platform-in-library')
        }
      }
    }else {
      newPlatforms = platformSelected
      if(e.target.localName === 'img'){
        e.target.parentElement.classList.add('platform-in-library')
      }else{
        e.target.classList.add('platform-in-library')
      }
    }
    if(user){
      const data = {
        user: user._id,
        gameId: game.game.id,
        gameName: game.game.name,
        gameImage: game.game.background_image,
        platforms: newPlatforms,
        rating: game.game.rating,
      }
      
      if(data.platforms.length === 0){
        toast.error(`${data.gameName} removed from library`, {theme: "dark"})
        dispatch(deleteGame(data))
      }else{
        if(removePlatform){
          toast.warning(`${platformSelected} removed from ${data.gameName}`, {theme: "dark"})
        }else{
          toast.success(`${platformSelected} add to ${data.gameName}`, {theme: "dark"})
        }
        dispatch(setGame(data))
      }
    }
  }

  useEffect(() => {
    let didCancel = false;
    const getUserGames = async(gameDetailData) => {
      const userGames = await dispatch(getGames())
      const userGamePlatforms = userGames.payload.filter(game => game.gameId == gameDetailData.id)[0].platforms
      let platformButtons = document.querySelectorAll('button[data-platform]')
      platformButtons = Array.prototype.slice.call(platformButtons).filter(x => userGamePlatforms.includes(x.dataset.platform) )
      platformButtons.forEach(btn => btn.classList.add('platform-in-library'))
    }
    const getDesc = async() => {
      const res = await fetch(url)
      if (!didCancel) { // Ignore if we started fetching something else
        let data = await res.json()
        setGameDetails(await data)
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
          await getUserGames(data)
        }
      }
    }
    getDesc()
    return () => { didCancel = true; }
  }, [])

  useEffect(() => {
    const handleDragStart = (e) => e.preventDefault();
    let didCancel = false;
    const getScreenshots = async() => {
      const res = await fetch(screenshotURL)
      if (!didCancel) { // Ignore if we started fetching something else
        let data = await res.json()
        const s = await data
        setScreenshots(s.results.map(image => <img src={image.image} onDragStart={handleDragStart} role="presentation" />))
      }
    }
    getScreenshots()
    return () => { didCancel = true; }
  }, [])

  if(!open){
    return null
  }

  return ReactDom.createPortal(
    <>
    <div style={OVERLAY_STYLES}></div>
    {!gameDetails && (<PacmanLoader color='#f9d706' loading={loading} size={100} />)}
    {gameDetails && 
    <>
      <div className="modal-nav">
        <div className="modal-nav-close-container">
          <button  className="modal-close-btn" onClick={onClose} >Close</button>
        </div>
      </div>
    
    <div style={MODAL_STYLES} className="modal-container">
      
      <div className="modal-banner-container">
        <div className="modal-banner-image">
          <img className="modal-image" src={gameDetails.background_image} alt="game image" />
        </div>
        {gameDetails.esrb_rating ? (
          <img className="esrb-logo" src={`/images/esrb/${gameDetails.esrb_rating.slug}.png`} alt="ESRB logo" />
        ) : (
          <img className="esrb-logo" src={`/images/esrb/unknown.png`} alt="ESRB logo" />
        )}
        <div className="modal-banner-info">
            <h2>{gameDetails.name}</h2>
            <ul className="modal-banner-info-ratings">
            {
              [...Array(Math.floor((gameDetails.rating)))].map((_,i) => (
                <li key={i}><BsStarFill /></li>
              ))
            }
            {game.game.rating % 1 > 0 ? (
                <li key="5"><BsStarHalf /></li>
              ) : '' 
            } 
            </ul>
            <p className="modal-info-tag"><BsFillCalendar2EventFill /> {gameDetails.released}</p>
            
        </div>
      </div>
      <p className="modal-info-description">{gameDetails.description_raw}</p>
      <div className="modal-platforms-container">
        <ul>
          {gameDetails && gameDetails.platforms.map(platform => (
            <li key={platform.platform.id} className="modal-platform-group">
              <button 
                className="modal-banner-platform-image" 
                data-platform={platform.platform.name} 
                data-console={game.game.name}
                onClick={platformClick}
                key={platform.platform.id}>
                <img 
                  src={`/images/platforms/${platform.platform.slug}.png`} 
                  alt="platform logo"
                  data-platform={platform.platform.name} 
                  data-console={game.game.name}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="modal-screenshots-container">
        {screenshots && (
          <AliceCarousel 
          mouseTracking="true"
          autoPlayStrategy="action"
          items={screenshots}
          infinite="true"
          autoPlay="true"
          autoPlayInterval="2500"
          animationDuration="1750"
          disableSlideInfo="false"
          animationType="fadeout"
          />
        )}
    </div>
    </div></>}
    </>,
    document.getElementById('portal')
    )
}

export default GameModal