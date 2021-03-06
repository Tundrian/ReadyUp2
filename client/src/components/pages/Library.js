
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import { getGames } from '../../features/library/librarySlice'
import GameCardBasic from '../utilities/GameCardBasic'

function Library() {

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
    if(!user){
      navigate("/")
    }
    const data = getGamesFromDB()
    .then(dbGames => {
      let mappedGames = JSON.parse(JSON.stringify(dbGames))
      mappedGames.map(game => {
        game.game = {
          id: game.gameId,
          background_image: game.gameImage,
          name: game.gameName
        }
      })
      setGames(mappedGames)
    })
  }, [])

  return (
    <div className="mainComponent browse-container">
        <header className="browse-header">
            {/* <h2>Search</h2> */}
            {/* <input className="search-input search-gameTitle" type="text" placeholder="Enter a game title" onKeyPress={updateUrl}/> */}
            {/* <button className="browse-sort-button"><BsSortDown className="browse-sort-icon"/> SORT/FILTER</button> */}
        </header>
        <section>
            <div className="gameList">
                <ul>                                      
                    {games.length > 0 && games.map((game,i) => (
                        <li key={game.id + i.toString()}><GameCardBasic game={game.game} /></li>
                    )
                    )}
                </ul>
            </div>
        </section>
        {/* <PageNav next={next} prev={prev} updateFetch={updateFetch}/> */}
    </div>
  )
}

export default Library