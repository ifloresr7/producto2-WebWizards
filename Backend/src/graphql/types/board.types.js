const boardTypeDefs = `
    type Board {
        id: ID!
        title: String!
        description: String!
        members: [User]
        tasks: [Task]
    }
    input boardInput {
        title: String!
        description: String!
        members: [ID]!
        tasks: [ID]
    }
    type Query {
        countBoards: Int
        getBoardsByID (id: ID!): [Board]
        getTasksIDBoard (id: ID!): [Board]
        showBoards: [Board]
    }
    type Mutation {
        addBoard(boardInput: boardInput!): Board
    }
`

module.exports = boardTypeDefs