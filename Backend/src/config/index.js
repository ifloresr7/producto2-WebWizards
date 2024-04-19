const connectDB = require('../db/config')

const config = {
    dbURI: process.env.DB_URI,
    port: process.env.PORT || 5000,
    domain: process.env.DOMAIN,
    connectDB,
}

module.exports = config