const connectDB = require('../db/config')

const config = {
    dbURI: process.env.DB_URI,
    port: process.env.PORT || 5000,
    connectDB,
}

module.exports = config