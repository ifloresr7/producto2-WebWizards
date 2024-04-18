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
  }
`

  
const mutations = {
    addUser,
    addBoard
}

module.exports = mutations;