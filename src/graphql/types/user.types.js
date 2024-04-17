const userTypeDefs = `
    type User {
        id: ID
        email: String!
        password: String!
    }

    type Query {
        showUsers: String
    }

    type Mutation {
        addUser(email: String!, password: String!): User
    }
`

module.exports = userTypeDefs