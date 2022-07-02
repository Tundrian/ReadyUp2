import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // backgroundColor: '#FFF',
  // padding: '50px',
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

function GameModal({open, children, onClose, game, gameDetails}) {

  
  if(!open){
    return null
  }
  

  console.log(gameDetails)
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
            <h2>{game.game.name}</h2>
            <p>ESRB Rating: {game.game.esrb_rating.name}</p>
            <p>Rating: {game.game.rating}</p>
            <p>Released: {game.game.released}</p>
              <div className="modal-banner-info-platforms">

              </div>
          </div>
        
       
      </div>
      {/* 
        image spreading accross entire width

        set text overtop of image using absolute positioning
          - title
          - release date
          - ESRB rating and score rating - change to image
          - description
          - horizontal list of platforms - change to images
        
          under image section
            - horizontal scroll of images
            - show horizontal list of stores
      */}

      {/* <div className="modal-content">
    
        <img className="modal-image" src={game.game.background_image} alt="game image" />
    
        <div className="modal-info">
    
          <h2>{game.game.name}</h2>
          <p>ESRB Rating: {game.game.esrb_rating.name}</p>
          <p>Rating: {game.game.rating}</p>
          <p>Released: {game.game.released}</p>

          <div className="modal-info-lists">
            <div>
              <h4>Genres</h4>
              <ul>
                {game.game.genres.map(g => (
                  <li className="modal-genres">{g.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Platforms</h4>
              <ul>
                {game.game.platforms.map(p => (
                  <li>
                    <button className="btn modal-platform-btn">{p.platform.name}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div>
        <ul>
          {game.game.short_screenshots.map(s => (
            <img src={s.image}></img>
          ))}
        </ul>

        <ul>
          {game.game.stores.map(s => (
            <li>
              <p>{s.store.name}</p>
              {/* <img src={s.store.image_background} alt="" /> */}
            {/* </li>
          ))}
        </ul>

      </div> */}
    </div>
    </>,
    document.getElementById('portal')
    )
}

export default GameModal