import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import { setGame, getGames, reset } from '../features/library/librarySlice'
import Spinner from '../components/spinner'

function GameCard({gameId, title, platforms, image}) {
  
  const dispatch = useDispatch()

  const platformClick = (e) => {
    
    const element = e.target.classList
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
    const user = JSON.parse(localStorage.getItem('user'))
    let platformsToAdd = e.target.textContent
    
    if(user){
      
      if(localStorage.getItem('games')){
        let localGames = JSON.parse(localStorage.getItem('games')).filter(x => x.gameName === title)[0].platforms
        
        platformsToAdd.concat(...localGames)
        console.log(platformsToAdd)
        
      }
      
      const data = {
        user: user._id,
        gameId: gameId,
        gameName: title,
        gameImage: image,
        platforms: platformsToAdd,
      }
      // console.log(data)
      
      
      dispatch(getGames())
      dispatch(setGame(data))
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