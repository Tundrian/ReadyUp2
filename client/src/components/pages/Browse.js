import { BsSortDown } from 'react-icons/bs'
import useFetchAllGames from '../../composables/useFetchAllGames'
import PageNav from '../utilities/PageNav'
import { useState, useEffect } from 'react'
import GameCardBasic from '../utilities/GameCardBasic'
import PacmanLoader from 'react-spinners/PacmanLoader'

function BrowseScreen() {
    let [loading, setLoading] = useState(true);

    const APIKEY = process.env.REACT_APP_API_KEY
    let url = `https://api.rawg.io/api/games?key=${APIKEY}`
    let { g, n, p } = useFetchAllGames(url)
    const [games, setGames] = useState(g)
    const [next, setNext] = useState(n)
    const [prev, setPrev] = useState(p)  

    const updateUrl = (e) => {
        if(e.charCode === 13){
            url += `&search=${e.target.value}`
            updateFetch(url)
        }
    }

    useEffect(() => {
        updateFetch(url)
    }, [url])

    const updateFetch = async(newURL) =>{
        url = newURL
        const response = await fetch(url);
        let data = await response.json()
        setGames(data.results)
        setNext(data.next)
        setPrev(data.previous)
    }
    
  return (
    <div className="mainComponent browse-container">
        
        <header className="browse-header">
            
            <h2>Search</h2>
            <input className="search-input search-gameTitle" type="text" placeholder="Enter a game title" onKeyPress={updateUrl}/>
            <button className="browse-sort-button"><BsSortDown className="browse-sort-icon"/> SORT/FILTER</button>
        </header>
        <section>
            <div className="gameList">
            {!games && (
                   <PacmanLoader color='#f9d706' loading={loading} size={100} />
            )}
                <ul>
                    {games && games.map(game => (
                        <li key={game.id}><GameCardBasic game={game}/></li>
                    ))}
                </ul>
            </div>
        </section>
        <PageNav next={next} prev={prev} updateFetch={updateFetch}/>
    </div>
  )
}

export default BrowseScreen