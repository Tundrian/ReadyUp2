import axios from 'axios'
const API_URL = 'http://localhost:5000/api/library/'

const addGame = async (gameData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response  = await axios.post(API_URL, gameData, config)
    return response.data
}

const getGames = async(gameData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response  = await axios.get(API_URL, config)
    // console.log('DB Games: ', response.data)
    localStorage.setItem('games', JSON.stringify(response.data))
    return response.data
}

const libraryService = {
    addGame,
    getGames
}

export default libraryService