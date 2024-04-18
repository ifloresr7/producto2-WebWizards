
const taskTypeDefs = `
type Task {
    id: ID!
    title: String!,
    description: String!,
    status: String!,
    order: String!,
    colour: String,
    endTime: String,
    members: [User],
}    

input TaskInput {
    title: String!
    description: String!
    status: String!,
    order: String!,
    members: [ID],
    colour: String,
    endTime: String
}

type Query {
        showTasks: String
    }
`

module.exports = taskTypeDefs