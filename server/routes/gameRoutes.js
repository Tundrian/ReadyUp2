const express = require('express')
const router = express.Router()
const { 
    getGames,
    setGame,
    updateGame,
    deleteGame,
} = require('../controllers/userGameController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getGames).post(protect, setGame)
router.route('/:id').delete(protect, deleteGame).put(protect, updateGame)

module.exports = router