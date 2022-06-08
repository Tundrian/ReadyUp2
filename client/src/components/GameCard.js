// import { useEffect, useState} from 'react'
// import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
// import {toast} from 'react-toastify'
import { setGame, getGames, deleteGame, reset } from '../features/library/librarySlice'
// import Spinner from '../components/spinner'

function GameCard({gameId, title, platforms, image}) {
  
  const dispatch = useDispatch()
  const {games, isLoading, isError, isSuccess, message} = useSelector( (state) => state.library)

  const platformClick = async(e) => {
    
    const element = e.target.classList
    let removePlatform = false
    let newPlatforms
    // stores user if logged in
    const user = JSON.parse(localStorage.getItem('user'))
    // Get platform from card
    let platformsToAdd = [e.target.textContent]
    // Get game name from card selected
    const gameSelected = e.target.parentElement.parentElement.childNodes[0].innerText

    switch( e.target.innerText){
      case 'Nintendo Switch':
        element.add('nintendoSwitch')
        break
      case 'pc':
        element.add('PC')
        break
      case 'Xbox Series S/X':
        element.add('xboxSeriesSX')
        break
      case 'Xbox One':
        element.add('xboxOne')
        break
      case 'xbox360':
        element.add('xbox360')
        break
      case 'Playstation 3':
        element.add('playstation3')
        break
      case 'Playstation 4':
        element.add('playstation4')
        break
      case 'Playstation 5':
        element.add('playstation5')
        break
      case 'macOS':
        element.add('macOS')
        break
      case 'Linux':
        element.add('linux')
        break
      case 'PS Vita':
        element.add('psVita')
        break
      case 'Android':
        element.add('android')
        break
      case 'iOS':
        element.add('iOS')
        break
      default:
        element.add('PC')
    }

    // Get game from database
    let dbGames
        await (dispatch(getGames())
        .then(res => dbGames = res.payload.filter(x => x.gameName === gameSelected)[0]))
    if(dbGames){
      // Check if platform already exists, if so remove it
      if(dbGames.platforms.includes(platformsToAdd[0])){
        removePlatform = true
      }
      //merges platforms from card selected with platforms from database01
      if(removePlatform){
        newPlatforms = [...new Set(dbGames.platforms)].filter(x => x !== platformsToAdd[0])
      }else{
        newPlatforms = [...new Set(dbGames.platforms.concat(platformsToAdd))]
      }
    }else{
      
      newPlatforms = platformsToAdd
    }
    
    
    console.log(newPlatforms)

    if(user){
  
      const data = {
        user: user._id,
        gameId: gameId,
        gameName: title,
        gameImage: image,
        platforms: newPlatforms,
      }
      console.log(data.platforms)
      if(data.platforms.length === 0){
        console.log('game deleted')
        dispatch(deleteGame(data))
      }else{
        console.log('game added')
        dispatch(setGame(data))
      }
    }
  }

  return (
    <div className="gamecard-container">
        <div className="gamecard-link" href={image}>
            <div className="gamecard-image-wrapper">
              <img className="gamecard-image" src={image} alt=""  />
            </div>
            
            <div className="gamecard-info-container">
                <span className="gamecard-title">{title}</span>
                <ul className="gamecard-platforms">
                {platforms && platforms.map(platform => (
                    <li 
                    onClick={platformClick} 
                    key={platform.platform.name}
                    className="gamecard-platform" 
                    >{platform.platform.name}</li>
                ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default GameCard