import { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
// import Carousel from './Carousel'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
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

function GameModal({open, children, onClose, game, url}) {
  const APIKEY = process.env.REACT_APP_API_KEY
  const [gameDetails, setGameDetails] = useState(null)
  const screenshotURL = `https://api.rawg.io/api/games/${game.game.id}/screenshots?key=${APIKEY}`
  const [screenshots, setScreenshots] = useState(null)

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
      <button className="modal-close-btn" onClick={onClose}>X</button>
    
      <div className="modal-banner-container">
        <div className="modal-banner-image">
          <img className="modal-image" src={game.game.background_image} alt="game image" />
          
        </div>
        <div className="modal-banner-info">
          <div className="modal-banner-info-col">
            <h2>{game.game.name}</h2>
            <p className="modal-info-tag">ESRB Rating: {game.game.esrb_rating.name}</p>
            <p className="modal-info-tag">Rating: {game.game.rating}</p>
            <p className="modal-info-tag">Released: {game.game.released}</p>
          </div>
           <div className="modal-banner-info-col">
             <div className="modal-banner-info-platforms">
                <h3>Platforms</h3>
                {gameDetails && gameDetails.platforms.map(platform => (
                  <div className="modal-platform-group">
                    <label className="modal-banner-info-platform" key={platform.platform.id}>{platform.platform.name}</label>
                    <button className="btn modal-platform-library-btn">+</button>
                  </div>
                  ))}
              </div>
            </div>
          </div>
      </div>
      <div className="modal-screenshots-container">
                  {/* {screenshots && screenshots.results.map(screenshot => (
                    <img src={screenshot.image} />
                  ))} */}
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