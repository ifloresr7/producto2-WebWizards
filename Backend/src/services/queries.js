const getUser = `
query ($userInput: UserInput!) {
    loginUser(userInput: $userInput) {
      id
      email
    }
  }
`

const queries = {
    getUser
}

module.exports = queries;