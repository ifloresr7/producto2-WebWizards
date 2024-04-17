const { gql } = require('graphql-request')
const server = require('../../index')

const createUser = async (req, res) => {

    console.log(req.body)

    const { email, password } = req.body

    try {
        const { data } = await server.executeOperation({
            mutation: gql`
                mutation AddUser($email: String!, $password: String!) {
                    addUser(email: $email, password: $password) {
                    email
                    password
                    }
                }
            `,
            variable: { email, password }
        })

        res.json(data)
    } catch(error) {
        console.log(error)
        res.status(500).send('Error creating user')
    }
}

module.exports = { createUser }