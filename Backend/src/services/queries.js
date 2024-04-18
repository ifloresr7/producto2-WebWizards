const getUser = `
query ($userInput: UserInput!) {
    loginUser(userInput: $userInput) {
      id
      email
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
`

const queries = {
    getUser,
    getBoardsByID
}


module.exports = queries;