const express = require('express')
const test = require('./src/routes/test')
const dotenv = require('dotenv')
const connectDB = require('./src/db/config')

dotenv.config()

const app = express()
const port = 5000

connectDB()

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/test', test)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

