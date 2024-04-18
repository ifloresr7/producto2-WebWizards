const { status, colours } = require("../../constants")


const taskTypeDefs = `
scalar DateTime
type Task {
    id: ID!
    title: String!,
    description: String!,
    status: Status!,
    order: Int!,
    colour: Colour!,
    endTime: DateTime!,
    members: [User]!,
}    
enum Status {
    ${status}
}
enum Colour {
    ${colours}
}

input TaskInput {
    title: String!
    description: String!
    status: Status!,
    order: Int!,
    colour: Colour!,
    endTime: DateTime!,
    members: [ID]!,
}

type Query {
        showTasks: [Task]
    }

    type Mutation {
        addTask(TaskInput: TaskInput!): String
    }
`

module.exports = taskTypeDefs