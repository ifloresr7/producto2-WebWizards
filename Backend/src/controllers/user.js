const axios = require('axios')

const createUser = async (req, res) => {
    
    try {

        const { email, password } = req.body

        const mutation = `
            mutation AddUser($email: String!, $password: String!) {
                addUser(email: $email, password: $password) {
                email
                password
                }
            }
        `

        const variables = { email, password }

        const response = await axios.post('http://localhost:5000/graphql', {
            query: mutation,
            variables,
        })

        if (response.data.errors) {
            res.status(400).send('Error creating user')
        }

        res.status(200).json(response.data.data.addUser);

    } catch(error) {
        console.log(error)
        res.status(500).send('Error creating user')
    }
}

module.exports = { createUser }