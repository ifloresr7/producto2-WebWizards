const axios = require('axios')
const queries = require('../services/queries')

const createUser = async (req, res) => {
    
    try {

        const { email, password } = req.body

        // Consultar si ya existe el usuario


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
            res.status(400).send('Error creando usuario')
        }

        // Crear autentificación usuario con JWT

        // Consultar boards del usuario

        // Devolver boards y token

        res.status(200).json(response.data.data.addUser);

    } catch(error) {
        console.log(error)
        res.status(400).send('Error creando usuario')
    }
}

const loginUser = async (req, res) => {
    console.log("entra al login")
    try {
        const { email, password } = req.body

        const query = queries.getUser

        const variables = { 
            userInput: {email, password }
        }

        const response = await axios.post('http://localhost:5000/graphql', {
            query,
            variables
        })

        const user = response.data.data.loginUser

        if (response.data.errors) {
            res.status(400).send('Error al iniciar sesión: El usuaurio no existe o la contraseña es incorrecta')
        }

        // Crear autentificación usuario con JWT

        res.status(200).json({ data: user })
    } catch(error) {
        console.log(error)
        res.status(400).send('Error al iniciar sesión')
    }
}



module.exports = { createUser, loginUser }