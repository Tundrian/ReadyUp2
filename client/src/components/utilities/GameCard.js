import {useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import { setGame, getGames, deleteGame } from '../../features/library/librarySlice'
// import Spinner from '../components/spinner'

function GameCard({gameId, title, platforms, image}) {
  
  const stylePlatformsUpdate = (element, platform) => {
      platform = platform.toString().toLowerCase().replace(/[^A-Z0-9]+/ig, '')
      element.toggle(platform)
  }
  
  const dispatch = useDispatch()

  const platformClick = async(e) => {
    const user = JSON.parse(localStorage.getItem('user')) // stores user if logged in
    if(!user)
    {
      toast.error('Please log in to save games to library')
      return
    }    
    // Variables
    const element = e.target.classList
    
    const gameSelected = e.target.parentElement.parentElement.childNodes[0].innerText // Get game name from card selected
    let removePlatform = false
    let newPlatforms
    let platformsToAdd = [e.target.textContent]// Get platform from card
    let dbGames
    
    stylePlatformsUpdate(element, e.target.innerText)

    // Get game from database
    await (dispatch(getGames())
    .then(res => {
      console.log(res.payload)
      dbGames = res.payload.filter(x => x.gameName === gameSelected)[0]
    }))
      
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