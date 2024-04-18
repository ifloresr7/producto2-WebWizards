const getUser = `
query LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
        email
        password
    }
}
`

const queries = {
    getUser
}

module.exports = queries;