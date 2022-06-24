const { mongoose } = require("mongoose")

const connectDatabase = async () => {
    try {
        // mongoose.set("useNewUrlParser", true)
        // mongoose.set("useUnifiedTopology", true)

        await mongoose.connect(process.env.DB_URI)
        console.log('connected to db')
    } catch (error) {
        console.log(`db error: `, error)
        process.exit(1)
    }
}

module.exports = connectDatabase