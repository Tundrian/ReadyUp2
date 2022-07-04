import { useState, useEffect } from 'react'

const useFetchGameDetails = (url) =>{
  const [gameDetails, setGameDetails] = useState(null)

  useEffect(() => {

    let didCancel = false;
    const getDesc = async() => {

      const res = await fetch(url)

      if (!didCancel) { // Ignore if we started fetching something else
        let data = await res.json()
        setGameDetails(await data)
      }

    }

    getDesc()
    return () => { didCancel = true; }
  }, [])
  console.log(gameDetails)
    return { gameDetails }
}

export default useFetchGameDetails