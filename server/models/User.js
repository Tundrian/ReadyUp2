// Dependencies
const mongoose = require('mongoose') // Simpler MongoDB interaction
const bcrypt = require('bcrypt') // Used for encrypting passwords
const { isEmail } = require('validator') // Check if an email address is a valid format

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
})

// // Generate a hashed password from the actual password for security, on each call of this model
// userSchema.pre('save', async function (next) {

//     // generate a salt to be used when hashing the password
//     const salt = await bcrypt.genSalt()

//     // encrypts the password and proceeds with the next middleware
//     this.password = await bcrypt.hash(this.password, salt)
//     next()
// })

// // Handles confirming that a new user has been created
// userSchema.post('save', function (doc, next) {
//     console.log('new user was created & saved', doc)
//     next()
// })

// // Static method to login users and encrypt the password
// userSchema.statics.login = async function(email, password) {
//     // checks if the user exists in the database
//     const user = await this.findOne({ email })
//     // If the user exists, encrypt the password and return the user
//     if(user){
//        const auth = await bcrypt.compare(password, user.password)
//        if(auth){
//            return user
//        }
//        throw Error('incorrect password')
//     }
//     throw Error('incorrect email')
// }

module.exports = mongoose.model('user', userSchema)