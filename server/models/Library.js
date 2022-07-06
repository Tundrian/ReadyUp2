const mongoose = require('mongoose')

const librarySchema = new mongoose.Schema({

    user: {
        type: String,
        required: true,
        lowercase: true,
    },
    gameId: {
        type: String,
        required: true,
    },
    gameName: {
        type: String,
        required: true,
    },
    platforms: {
        type: [String],
        required: true,
    },
    gameImage: {
        type: String,
        required: true,
    },
    rating: {
        type: Number
    }
})

module.exports = mongoose.model('library', librarySchema)