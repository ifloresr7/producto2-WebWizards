const boardTypeDefs = `
    type Board {
        id: ID!
        title: String!
        description: String!
        members: [User]
        tasks: [Task]
        image: String!
    }
    input boardInput {
        title: String!
        description: String!
        members: [ID!]!
        tasks: [ID]!
        image: String!
    }
    type Query {
        countBoards: Int
        getBoardsByUserID (id: ID!): [Board]
        getDataByBoardID (id: ID!): Board
        getTasksInStatusWithIDBoard (status: Status!, id: ID!): [Task]
        showBoards: [Board]
    }
    type Mutation {
        addBoard(boardInput: boardInput!): String
        deleteBoard(id: ID!): String
        addTaskToBoard(boardId: ID!, taskId: ID!): String
    }
`

module.exports = boardTypeDefs