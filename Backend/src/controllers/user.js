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
    try {
        console.log(req);
        const { email, password } = req.body

        

        if (response.data.errors) {
            res.status(400).send('Error al iniciar sesión')
        }

        // Crear autentificación usuario con JWT


        // Hacer next para buscar boards de usuario
        next()

    } catch(error) {
        console.log(error)
        res.status(400).send('Error al iniciar sesión')
    }
}



module.exports = { createUser, loginUser }