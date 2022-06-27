const mongoose = require('mongoose')

const platformSchema = new mongoose.Schema({

    platformId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String
    },
    image: {
        type: String
    },
    imageBackground: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String,
        required: true,
    },
    platforms: {
        type: [gamePlatformsSchema],
        required: true,
    },  
})

module.exports = mongoose.model('platform', platformSchema)