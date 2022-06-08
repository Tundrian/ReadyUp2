const User = require('../models/User')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
// handle errors
// const handleErrors = (err) => {
//     console.log(err.message, err.code)

//     let errors = { 
//         email: '', 
//         password: ''
//     }

//     // incorrect email
//     if(err.message === 'incorrect email'){
//         errors.email = 'that email is not registered'
//     }

//     // incorrect password
//     if(err.message === 'incorrect password'){
//         errors.password = 'that password is incorrect'
//     }


//     // duplicate email check
//     if(err.code === 11000){
//         errors.email = 'that email is already registered'
//         return errors
//     }

//     // Validation errors
//     if (err.message.includes('user validation failed')){
//         Object.values(err.errors).forEach(({properties}) => {
            
//             errors[properties.path] = properties.message

//         })
//     }

//     return errors
// }

// Create token
const maxAge = 3 * 24 * 60 * 60 //3 days in seconds
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
}
// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    
    const {name, email, password} = req.body

    console.log('Register User')

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
      }
    
      // Check if user exists
      const userExists = await User.findOne({ email })
    
      if (userExists) {
        res.status(400)
        throw new Error('User already exists')
      }
    
      // Hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
    
      // Create user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      })
    
      if (user) {
        res.status(201).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        })
      } else {
        res.status(400)
        throw new Error('Invalid user data')
      }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
  
    // Check for user email
    const user = await User.findOne({ email })
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
  })
// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
  })

module.exports = {
    registerUser,
    loginUser,
    getMe
}