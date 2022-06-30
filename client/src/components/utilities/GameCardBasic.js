import {useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import { setGame, getGames, deleteGame } from '../../features/library/librarySlice'
import { useState} from 'react'
import Modal from '../utilities/GameModal'


function GameCardBasic(game) {  
  
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="gamecard-container" >
        <div className="gamecard-link" href={game.game.background_image}>
            {/* <div className="gamecard-image-wrapper" onClick={openModal}> */}
            <div className="gamecard-image-wrapper" onClick={() => setIsOpen(true)}>
              <img className="gamecard-image" src={game.game.background_image} alt=""  />
            </div>
            
            <div className="gamecard-info-container">
                <span className="gamecard-title">{game.game.name}</span>
                <ul className="gamecard-platforms">
                </ul>
            </div>
        </div>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} game={game}>
        </Modal>
    </div>
  )
}

export default GameCardBasic