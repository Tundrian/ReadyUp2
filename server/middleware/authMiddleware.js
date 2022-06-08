const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const protect = asyncHandler(async (req, res, next) =>  {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        
        try{    
            
            token = req.headers.authorization.split(' ')[1]
    
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')
            
            next()
        } catch (error) {
            
            console.log('error: ', error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    // console.log('token Check after try: ', token)
    if(!token){
        res.status(401)
        
        throw new Error('Not authorized, no token.')
    }
})

const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt

    // check json web token exists and is verified
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err){
                console.log(err.message)
                //res.redirect('/login')
            } else {
                console.log(decodedToken)
                next()
            }
        })
    }
    else {
        //res.redirect('/login')
    }
}

// Check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if(err){
                console.log(err.message)
                //res.redirect('/login')
                // res.locals.user = null
                next()
            } else {
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                // res.locals.user = user
                // replace this with passing user back to the client 
                next()
            }
        })
    }
    else {
        // res.locals.user = null
        next()
    }
}

module.exports = { requireAuth, checkUser, protect }