// Dependencies
const mongoose = require('mongoose') // Simpler MongoDB interaction
const bcrypt = require('bcrypt') // Used for encrypting passwords
const { isEmail } = require('validator') // Check if an email address is a valid format

const UserPlatformsSchema = new mongoose.Schema({
    platformId: {
        type: String
    }
})

const UserGamesSchema = new mongoose.Schema({
    gameId: {
        type: String
    },
    platforms: {
        type: [UserPlatformsSchema]
    }
})

// Schema for the User model
const userSchema = new mongoose.Schema({

    // User consists of an email, and a password. MongoDB will create an id on creation
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [10, 'Minimum password length is 10 characters']
    },
    games: {
        type: [UserGamesSchema],
    }
})

module.exports = mongoose.model('user', userSchema)