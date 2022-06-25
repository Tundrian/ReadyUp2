import GameCard from '../utilities/GameCard'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import { setGame, getGames, deleteGame } from '../../features/library/librarySlice'

function MyLibrary() {
  // get games from database
  const dispatch = useDispatch()
  const getGamesFromDB = async() => {
    const res = await dispatch(getGames())
    const data =  await res.payload
    console.log('data: ', data)
    return data
   }
  const [games, setGames] = useState(() => false)
  // generate cards for each game in database
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  
  useEffect(() => {
    if(!user){
      navigate('/')
    }
    const fetchGames = async() => {
      setGames(await getGamesFromDB())
    }
    fetchGames()
  }, [user])

  // useEffect(() => {
    
  // }, [])

  // useEffect(()=>{
  //   console.log('sb games: ', games)
  // },[games])

 

  return (
    <div className="mainComponent browse-container">
        <header className="browse-header">
            <h2>Search</h2>
            {/* <input className="search-input search-gameTitle" type="text" placeholder="Enter a game title" onKeyPress={updateUrl}/> */}
            {/* <button className="browse-sort-button"><BsSortDown className="browse-sort-icon"/> SORT/FILTER</button> */}
        </header>
        <section>
            <div className="gameList">
                <ul>
                    {games.length > 0 && games.map(game => {(
                        <li key={game.id}><GameCard gameId={game.id} title={game.name} platforms={game.platforms} image={game.background_image} /></li>
                    )
                    console.log(games)})}
                </ul>
            </div>
        </section>
        {/* <PageNav next={next} prev={prev} updateFetch={updateFetch}/> */}
    </div>
  )
}

export default MyLibrary