const express = require('express')
const dotenv = require('dotenv')
const config = require('./src/config')
const userRouter = require('./src/routes/user')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, mergedResolvers } = require('./src/graphql')

dotenv.config()
const app = express()
app.use(express.json())

config.connectDB()


async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({ typeDefs, resolvers })
    await server.start()
    server.applyMiddleware({ app })
}

startApolloServer(typeDefs, mergedResolvers)



app.use('/user', userRouter)

app.listen(config.port, () => {
    console.log(`Example app listening at http://localhost:${config.port}`)
})

