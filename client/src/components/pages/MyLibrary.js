import LibraryGameCard from '../utilities/LibraryGameCard'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import { setGame, getGames, deleteGame } from '../../features/library/librarySlice'
import Spinner from '../utilities/Spinner'

function MyLibrary() {

  
  // get games from database
  const dispatch = useDispatch()
  const getGamesFromDB = async() => {
    const res =  await dispatch( getGames())
    const data =  await res.payload
    return data
   }

  const [games, setGames] = useState([])
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)

  useEffect(() => {
    const data = getGamesFromDB()
    .then(dbGames => {
      setGames(dbGames)
      // console.log(dbGames)
    })
    
  }, [])

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
                    {games.length > 0 && games.map((game,i) => (
                        <li key={game.id + i.toString()}><LibraryGameCard gameId={game.gameId} title={game.gameName} platforms={game.platforms} image={game.gameImage} /></li>
                    )
                    )}
                </ul>
            </div>
        </section>
        {/* <PageNav next={next} prev={prev} updateFetch={updateFetch}/> */}
    </div>
  )
}

export default MyLibrary