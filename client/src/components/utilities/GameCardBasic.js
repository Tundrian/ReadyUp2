import {useDispatch} from 'react-redux'
import { useState, useEffect} from 'react'
import Modal from '../utilities/GameModal'

function GameCardBasic(game) {  
  
  const dispatch = useDispatch()
  const APIKEY = process.env.REACT_APP_API_KEY
  let gameDetailUrl = `https://api.rawg.io/api/games/${game.game.id}?key=${APIKEY}`
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="gamecard-container" >
        <div className="gamecard-link" href={game.game.background_image}  onClick={() => setIsOpen(true)}>
            <div className="gamecard-image-wrapper" >
              <img className="gamecard-image" src={game.game.background_image} alt=""  />
            </div>
            
            <div className="gamecard-info-container">
                <span className="gamecard-title">{game.game.name}</span>
                <ul className="gamecard-platforms">
                </ul>
            </div>
        </div>
        {isOpen && <Modal open={isOpen} onClose={() => setIsOpen(false)} game={game} url={gameDetailUrl}>
        </Modal>}
    </div>
  )
}

export default GameCardBasic