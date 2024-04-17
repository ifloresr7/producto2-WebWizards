const express = require('express')
const dotenv = require('dotenv')
const config = require('./src/config')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, mergedResolvers } = require('./src/graphql')
const userRouter = require('./src/routes/user')


dotenv.config()
const app = express()
app.use(express.json())
config.connectDB()

async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({ typeDefs, resolvers })
    await server.start()
    server.applyMiddleware({ app })

    module.exports = server
}

startApolloServer(typeDefs, mergedResolvers)

app.use('/user', userRouter)

app.listen(config.port, () => {
    console.log(`Example app listening at http://localhost:${config.port}`)
})

