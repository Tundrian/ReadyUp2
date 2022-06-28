// Dependencies
const mongoose = require('mongoose') // Simpler MongoDB interaction

// Schema for the User model
const userGameSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    gameId: {
        type: String,
        required: true
    },
    platforms: {
        type:[String],
    }
})

module.exports = mongoose.model('userGame', userGameSchema)