import {useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import { setGame, getGames, deleteGame } from '../../features/library/librarySlice'
import { useState, useEffect} from 'react'
import Modal from '../utilities/GameModal'
import useFetchGameDetails from '../../composables/useFetchGameDetails'


function GameCardBasic(game) {  
  
  const dispatch = useDispatch()
  const APIKEY = process.env.REACT_APP_API_KEY
  let gameDetailUrl = `https://api.rawg.io/api/games/${game.game.id}?key=${APIKEY}`
  const [isOpen, setIsOpen] = useState(false)
  // const initGameDetails =  useFetchGameDetails(url)
  // const [gameDetails, setGameDesc] = useState(initGameDetails)
  // console.log('gameCard: ', game, game.game)
  return (
    <div className="gamecard-container" >
        <div className="gamecard-link" href={game.game.background_image}  onClick={() => setIsOpen(true)}>
            {/* <div className="gamecard-image-wrapper" onClick={openModal}> */}
            <div className="gamecard-image-wrapper" >
              <img className="gamecard-image" src={game.game.background_image} alt=""  />
            </div>
            
            <div className="gamecard-info-container">
                <span className="gamecard-title">{game.game.name}</span>
                <ul className="gamecard-platforms">
                </ul>
            </div>
        </div>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} game={game} url={gameDetailUrl}>
        </Modal>
    </div>
  )
}

export default GameCardBasic