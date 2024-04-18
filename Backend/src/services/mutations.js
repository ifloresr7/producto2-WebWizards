const addUser = `
  mutation($userInput: UserInput!) {
    addUser(UserInput: $userInput)
  }
`

const addBoard = `
mutation($boardInput: boardInput!) {
  addBoard(boardInput: $boardInput)
}
`
const addTask = `
mutation($taskInput: taskInput!) {
  addTask(taskInput: $taskInput)
}
`

const mutations = {
    addUser,
    addBoard,
    addTask
}

module.exports = mutations;