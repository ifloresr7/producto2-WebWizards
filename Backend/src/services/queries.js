const getUser = `
  query ($userInput: UserInput!) {
      loginUser(userInput: $userInput) {
        id
        email
      }
    }
  }
`
const getBoardsByID = `
  query($id: ID!) {
      getBoardsByID(id: $id) {
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
const getTasksIDBoard = `
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
const queries = {
    getUser,
    getBoardsByID,
    getTasksIDBoard
}


module.exports = queries;