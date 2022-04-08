import './App.css';
import {useState, useEffect} from 'react'
import Card from './components/Card'

function App() {
  const [pokemonAll, setPokemonAll] = useState([])
  const [currentPageUrl, setCurretPageUrl] = useState('https://pokeapi.co/api/v2/pokemon/')
  const [nextPageUrl, setNextPageUrl] = useState()
  const [previousPageUrl, setPreviousPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(currentPageUrl)
    .then(res => res.json())
    .then(data => {
      setLoading(false)
      setPokemonAll(data.results.map(p => p.name))
      setNextPageUrl(data.next)
      setPreviousPageUrl(data.previous)      
    })
    .catch(err => console.log(`error: ${err}`))
    console.log(pokemonAll)
  }, [currentPageUrl])

  if (loading) return "Loading..."

  return (
    <>
      {/* <button onClick={getPokemon}>Click Me</button> */}
      <Card pokemon={pokemonAll}/>

    </>
  );
}

export default App;
