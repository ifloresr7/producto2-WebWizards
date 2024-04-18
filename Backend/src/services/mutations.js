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

const deleteBoard = `
mutation($id: ID!) {
  deleteBoard(id: $id)
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
    deleteBoard,
    addTask
}

module.exports = mutations;