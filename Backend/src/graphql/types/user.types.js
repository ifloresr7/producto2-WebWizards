const userTypeDefs = `
    type User {
        id: ID!
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
        getUserByEmail(email: String!): User
    }

    type Mutation {
        addUser(UserInput: UserInput!): User
    }
`

module.exports = userTypeDefs