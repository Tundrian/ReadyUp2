const mongoose = require('mongoose')

const gamePlatformsSchema = new mongoose.Schema({
    platformId: {
        type: String
    }
})

const gameSchema = new mongoose.Schema({

    gameId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    nameOriginal: {
        type: String
    },
    slug: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String,
        required: true,
    },
    backgroundImage: {
        type: String
    },
    metacritic: {
        type: Number
    },
    rating: {
        type: Number
    },
    playtime: {
        type: Number
    },
    released: {
        type: String
    },
    tba: {
        type: Boolean
    },
    platforms: {
        type: [gamePlatformsSchema],
        required: true,
    },  
})

module.exports = mongoose.model('game', gameSchema)