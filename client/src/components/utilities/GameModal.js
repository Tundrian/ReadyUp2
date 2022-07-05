import { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
// import Carousel from './Carousel'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {BsStarFill, BsStarHalf, BsFillCalendar2EventFill } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'
import ESRB_E from '../../images/esrb-e.png'
import XBOX_SERIES from '../../images/xbox-series-logo.png'
import { toast } from 'react-toastify'
import {useDispatch} from 'react-redux'
import { setGame, getGames, deleteGame } from '../../features/library/librarySlice'
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
    console.log(gameSelected, platformSelected)
    let dbGames
    let removePlatform
    let newPlatforms

    await (dispatch(getGames())
    .then(res => {
      // console.log(res.payload)
      dbGames = res.payload.filter(x => x.gameName === gameSelected)[0]
    }))

    if(dbGames){
      // Check if platform already exists, if so remove it
      if(dbGames.platforms.includes(platformSelected)){
        removePlatform = true
      }
      //merges platforms from card selected with platforms from database01
      if(removePlatform){
        newPlatforms = [...new Set(dbGames.platforms)].filter(x => x !== platformSelected)
        console.log('remove: ', newPlatforms)
      }else{
        newPlatforms = [...new Set(dbGames.platforms.concat(platformSelected))]
        console.log('add: ', newPlatforms)
      }
    }else {
      newPlatforms = platformSelected
    }
    console.log(game)
    if(user){
      const data = {
        user: user._id,
        gameId: game.game.id,
        gameName: game.game.name,
        gameImage: game.game.background_image,
        platforms: newPlatforms,
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
    const getDesc = async() => {

      const res = await fetch(url)

      if (!didCancel) { // Ignore if we started fetching something else
        let data = await res.json()
        setGameDetails(await data)
        // console.log(gameDetails)
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
        // setScreenshots(await data)

        // if(screenshots){
        //   console.log('screenshots: ', screenshots.results[0].image)
        // }
        
      }

    }

    getScreenshots()
    return () => { didCancel = true; }
  }, [])

  if(!open){
    return null
  }
  // console.log('game: ', game)

  return ReactDom.createPortal(
    <>
    <div style={OVERLAY_STYLES}></div>

    <div style={MODAL_STYLES} className="modal-container">
      <AiFillCloseCircle  className="modal-close-btn" onClick={onClose} />
    
      <div className="modal-banner-container">
        <div className="modal-banner-image">
          <img className="modal-image" src={game.game.background_image} alt="game image" />
        </div>
        <img className="esrb-logo" src={ESRB_E} alt="ESRB logo" />
        <div className="modal-banner-info">
            <h2>{game.game.name}</h2>
            <ul className="modal-banner-info-ratings">
            
            {
              [...Array(Math.floor((game.game.rating)))].map(star => (
                <li><BsStarFill /></li>
              ))
            }
            {game.game.rating % 1 > 0 ? (
                <li><BsStarHalf /></li>
              ) : '' 
            } 
            </ul>
            <p className="modal-info-tag"><BsFillCalendar2EventFill /> {game.game.released}</p>
            
        </div>
      </div>
      <div className="modal-platforms-container">
        {/* <h3>Platforms</h3> */}
        <ul>
          {gameDetails && gameDetails.platforms.map(platform => (
            <li className="modal-platform-group">
              <label className="modal-banner-info-platform" key={platform.platform.id}><img src={XBOX_SERIES} alt="platform logo"/></label>
              {/* <label className="modal-banner-info-platform" key={platform.platform.id}>{platform.platform.name}</label> */}
              <button className="btn modal-platform-library-btn" data-platform={platform.platform.name} data-console={game.game.name} onClick={platformClick}>+</button>
            </li>
          ))}
        </ul>
        
      </div>
      <div className="modal-screenshots-container">
        {screenshots && (
          <AliceCarousel 
          mouseTracking 
          items={screenshots}
          infinite="true"
          autoplay="true"
          autoHeight="true"
          />
        )}
    </div>
    </div>
    
    </>,
    document.getElementById('portal')
    )
}

export default GameModal