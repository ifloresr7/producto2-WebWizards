const userTypeDefs = `
    type User {
        id: ID
        email: String!
        password: String!
    }
    input UserInput {
        email: String!
        password: String!
    }
    type Query {
        loginUser(userInput: UserInput!): User
        showUsers: [User]
    }

    type Mutation {
        addUser(email: String!, password: String!): User
    }
`

module.exports = userTypeDefs