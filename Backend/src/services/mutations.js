const addUser = `
  mutation($userInput: UserInput!) {
    addUser(UserInput: $userInput) {
      email
      id
    }
  }
`

const addBoard = `
mutation($boardInput: boardInput!) {
  addBoard(boardInput: $boardInput) {
}
`
const addTask = `
  query ($id: ID!) {
    getTasksIDBoard(id: $id) {
      title
      description
      members {
        id
        email
      }
      tasks {
        title
        description
        members {
          id
          email
        }
      }
    }
  }
`

const mutations = {
    addUser,
    addBoard,
    addTask
}

module.exports = mutations;