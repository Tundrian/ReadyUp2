// Models
const Library = require('../models/Library')
const User = require('../models/User')

// Dependencies
const asyncHandler = require('express-async-handler')


const getGames = asyncHandler(async (req, res) => {
    // console.log('getGames: ', req.user.id)
    console.log(req.url)
    const games = await Library.find({user: req.user.id})
    
    res.status(200).json(games)
})

// Used to see if a game exists before updating or creating
const getGame = asyncHandler(async (req, res) => {
    console.log('get')
    const game = await Library.findOne({user: req.user.id, gameName: req.params.id})
    if(!game){
        return false
    }else{
        return game
    }
    
})

const setGame = asyncHandler(async (req, res) => {
    console.log('set')
    if(!req.body.gameId){  
        res.status(400)
        throw new Error('Please include a gameId')
    }

    // Check if game exists first
    req.params.id = req.body.gameName
    const gameExists = await getGame(req, res) // false or return existing game data
    if(gameExists){        
        return updateGame(req, res)
    }
    // Else, create the game
    const game = await Library.create({
        user: req.user.id,
        gameId: req.body.gameId,
        gameName: req.body.gameName,
        gameImage: req.body.gameImage,
        platforms: req.body.platforms
    })
    
    res.status(200).json(game)
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

    const updatedGame = await Library.findOneAndUpdate({ user: req.user.id, gameName: req.body.gameName}, req.body)
    
    res.status(200).json(updatedGame)
})

const deleteGame = asyncHandler(async (req, res) => {
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
    console.log(`Deleted: ${game}`)
    await Library.findOneAndDelete({ user: req.user.id, gameId: game.gameId})
    res.status(200).json({ id: req.params.id})
})


module.exports = {
    getGames,
    setGame,
    updateGame,
    deleteGame,
    getGame
}