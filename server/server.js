// Dependencies
const path = require('path')
const express = require('express')  // express node framework for simplicity and functionality
const mongoose = require('mongoose') // better interaction when interacting with MongoDB
const cors = require('cors')
require('dotenv').config({}) //read the .env file for system variables
const connectDB = require('./config/db')
// Middleware
const { errorHandler } = require('./middleware/errorMiddleware') //Handle errors when accessing routes

// Routes
const authRoutes = require('./routes/authRoutes') // Routes that handle authentication
const libraryRoutes = require('./routes/libraryRoutes') // Routes that handle API calls for a user's game library
const gameRoutes = require('./routes/gameRoutes')

// App and middleware
const app = express() //create the express application
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,
}))
app.use(errorHandler) // use error handling middleware
app.use(express.json()) // use the json package to parse and stringify JSON
app.use(express.urlencoded({ extended: false}))

const port = process.env.PORT || 5000

// Database Connection
// const dbURI = process.env.DB_URI // store the database connection string from the .env file
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true}) // connect to the MongoDB database using the connection string and modern options
// .then((result) => {
//     // Server log confirming it is running
//     console.log('connected to db')
// })
// .catch((err) => console.log(err)) //catch and log errors during connection
connectDB()


// Routes
app.use('/api/library', libraryRoutes) // Routes for library API
app.use('/api/auth', authRoutes) // Routes for authentication API
app.use('/api/games', gameRoutes)

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}
app.listen(port, () => console.log(`Server started on port ${port}`))

