

const taskTypeDefs = `
type Task {
    id: ID!
    title: String!,
    description: String!,
    status: Status!,
    order: String!,
    colour: Colour!,
    endTime: String,
    members: [User],
}    
enum Status {
    por hacer,
    hecho,
    pendiente
}
enum Colour {
    red,
    blue
}

input TaskInput {
    title: String!
    description: String!
    status: Status!,
    order: String!,
    colour: Colour!,
    endTime: String,
    members: [ID],
}

type Query {
        showTasks: [Task]
    }

    type Mutation {
        addTask(TaskInput: TaskInput!): Task
    }
`

module.exports = taskTypeDefs