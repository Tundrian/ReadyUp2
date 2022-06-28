// Models
const UserGame = require('../models/UserGame')

// Dependencies
const asyncHandler = require('express-async-handler')

// Get all games from current user
const getGames = asyncHandler(async (req, res) => {
    const userGames = await UserGame.find({userId: req.user.id})
    res.status(200).json(userGames)
})

// Check if a user has a specific game
const getGame = asyncHandler(async (req, res) => {
    const userGame = await UserGame.findOne(
        {
            userId: req.user.id,   
            gameId: req.body.gameId
        }
    )

    if(!userGame){
        return false
    }else{
        return userGame
    }
})

// Add a game to the userGames table
const setGame = asyncHandler(async (req, res) => {
    // the game id is missing throw an error
    if(!req.body.gameId){  
        res.status(400)
        throw new Error('Please include a gameId')
    }
    // Check for User
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    const gameExists = await getGame(req)
    
    if(!gameExists){
        const game = await UserGame.create({
            userId: req.user.id,   
            gameId: req.body.gameId,
            platforms: [...req.body.platforms]
        })
        res.status(200).json(game)
    }
    else{
        throw new Error(`${req.body.gameId} already exists for this user`)
    }
})

const updateGame = asyncHandler(async (req, res) => {

    const game = await Library.findOne({user: req.user.id, gameName: req.params.id})
    if(!game){
        res.status(400)
        throw new Error('Game not found')
    }

    // Check for User
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure logged in user matches the goal user
    if(game.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User is not authorized')
    }

    const updatedGame = await Library.findOneAndUpdate({ userId: req.user.id, gameId: req.body.gameId}, req.body)
    
    res.status(200).json(updatedGame)
})

const deleteGame = asyncHandler(async (req, res) => {
    const game = await Library.findOne({userId: req.user.id, gameId: req.params.id})
    
    if(!game){
        res.status(400)
        throw new Error('Game not found')
    }

    // Check for User
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure logged in user matches the goal user
    if(game.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User is not authorized')
    }
    // console.log(`Deleted: ${game}`)
    await Library.findOneAndDelete({ userId: req.user.id, gameId: game.gameId})
    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getGames,
    setGame,
    updateGame,
    deleteGame,
    getGame
}