const express = require('express')
const dotenv = require('dotenv')
const config = require('./src/config')
const userRouter = require('./src/routes/user')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, mergedResolvers } = require('./src/graphql')
const cors = require('cors')
const boardRouter = require('./src/routes/board')
const taskRouter = require('./src/routes/task')

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

config.connectDB()


async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({ typeDefs, resolvers })
    await server.start()
    server.applyMiddleware({ app })
}

startApolloServer(typeDefs, mergedResolvers)

app.use('/user', userRouter)

app.use('/board', boardRouter)

app.use('/task', taskRouter)

app.listen(config.port, () => {
    console.log(`Example app listening at http://localhost:${config.port}`)
})

