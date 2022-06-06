import { useState, useEffect } from 'react'

const useFetchAllGames = (url) =>{
    const [games, setGames] = useState(null)
    const [next, setNext] = useState(null)
    const [prev, setPrev] = useState(null)
    useEffect(() => {
        let didCancel = false;
      
        const fetchMyAPI = async() => {
          const response = await fetch(url);
          if (!didCancel) { // Ignore if we started fetching something else
            let data = await response.json()
            // console.log(data)
            setGames(data.results)
            setNext(data.next)
            setPrev(data.previous)
          }
        }  
      
        fetchMyAPI();
        return () => { didCancel = true; }; // Remember if we start fetching something else

      }, [url]);
    return { games, next, prev }
}

export default useFetchAllGames