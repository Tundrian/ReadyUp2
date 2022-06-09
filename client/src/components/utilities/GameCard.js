import {useSelector, useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import { setGame, getGames, deleteGame, reset } from '../../features/library/librarySlice'
// import Spinner from '../components/spinner'

function GameCard({gameId, title, platforms, image}) {
  
  const stylePlatforms = (platform) => {
  
    // get current element
    // get platform that matches
    // toggle classList property
      let x = Array.prototype.slice.call(document.querySelectorAll('.gamecard-info-container')).filter(card => card.childNodes[0].innerText === title)
      x = x.slice()[0]

      console.log(x)
      // .classList.toggle(`platform-${platform.toString().toLowerCase().replace(/[^A-Z0-9]+/ig, '')}`)
  }
  stylePlatforms()

  const dispatch = useDispatch()
  // const {games, isLoading, isError, isSuccess, message} = useSelector( (state) => state.library)
  const games = useSelector((state) => state.library.games.filter(game => game.gameName === title))[0] || null

  const platformClick = async(e) => {
  
    // Variables
    // const element = e.target.classList
    const user = JSON.parse(localStorage.getItem('user')) // stores user if logged in
    const gameSelected = e.target.parentElement.parentElement.childNodes[0].innerText // Get game name from card selected
    let removePlatform = false
    let newPlatforms
    let platformsToAdd = [e.target.textContent]// Get platform from card
    // let platformCase = ''
    let dbGames
    stylePlatforms(e.target.innerText)
    // switch( e.target.innerText){
    //   case 'Nintendo Switch':
    //    platformCase = 'nintendoSwitch'
    //     break
    //   case 'pc':
    //     platformCase = 'PC'
    //     break
    //   case 'Xbox Series S/X':
    //     platformCase = 'xboxSeriesSX'
    //     break
    //   case 'Xbox One':
    //     platformCase = 'xboxOne'
    //     break
    //   case 'xbox360':
    //     platformCase = 'xbox360'
    //     break
    //   case 'Playstation 3':
    //     platformCase = 'playstation3'
    //     break
    //   case 'Playstation 4':
    //     platformCase = 'playstation4'
    //     break
    //   case 'Playstation 5':
    //     platformCase = 'playstation5'
    //     break
    //   case 'macOS':
    //     platformCase = 'macOS'
    //     break
    //   case 'Linux':
    //     platformCase = 'linux'
    //     break
    //   case 'PS Vita':
    //     platformCase = 'psVita'
    //     break
    //   case 'Android':
    //     platformCase = 'android'
    //     break
    //   case 'iOS':
    //     platformCase = 'iOS'
    //     break
    //   default:
    //     platformCase = 'PC'
    // }
    // element.toggle(platformCase)

    // Get game from database
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
        newPlatforms = [...new Set(dbGames.platforms.concat(platformsToAdd[0]))]
      }
    }else{
      newPlatforms = platformsToAdd
    }
    if(user){
      const data = {
        user: user._id,
        gameId: gameId,
        gameName: title,
        gameImage: image,
        platforms: newPlatforms,
      }
      

      if(data.platforms.length === 0){

        toast.error(`${data.gameName} removed from library`, {theme: "dark"})
        dispatch(deleteGame(data))

      }else{

        if(removePlatform){

          toast.warning(`${platformsToAdd[0]} removed from ${data.gameName}`, {theme: "dark"})
        
        }else{

          toast.success(`${platformsToAdd[0]} add to ${data.gameName}`, {theme: "dark"})
        
        }
        
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