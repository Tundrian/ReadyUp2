function Card({ pokemon }) {
    
    // console.log(pokemon)
 
    return (
    <div className="cardContainer">

        {pokemon.map(p => (
            <div key={p}>{p}</div>
        ))}

        <h2>Name</h2>
        <img src="" alt="" />
        <p>Description</p>
    </div>
  )
}

export default Card