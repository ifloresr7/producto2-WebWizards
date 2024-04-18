const getUser = `
query LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
        email
        password
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