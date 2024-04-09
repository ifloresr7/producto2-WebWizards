const mongoose = require('mongoose')


const connectDB = () => {
    const dbConnectionString = process.env.DB_URI
    
    mongoose.connect(dbConnectionString)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err)
    })
}

module.exports = connectDB

