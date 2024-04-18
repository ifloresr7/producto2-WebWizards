const axios = require('axios')
const queries = require('../services/queries')
const mutations = require('../services/mutations')

const createUser = async (req, res) => {
    try {

        const { email, password } = req.body

        // Consultar si ya existe el usuario


        const mutation = mutations.addUser

        const variables = { email, password }

        const response = await axios.post('http://localhost:5000/graphql', {
            query: mutation,
            variables,
        })

        // Crear autentificación usuario con JWT

        // Consultar boards del usuario

        // Devolver boards y token

        return res.status(200).json(response.data.data.addUser);

    } catch(error) {
        console.log(error)
        return res.status(400).json({ error: 'Error creando usuario' })
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

        if (response.data.errors) {
            return res.status(401).json({ error: 'Error al iniciar sesión: El usuaurio no existe o la contraseña es incorrecta' })
        }
        
        const user = response.data.data.loginUser

        // Crear autentificación usuario con JWT

        return res.status(200).json({ data: user })
    } catch(error) {
        console.log(error)
        return res.status(400).send('Error al iniciar sesión')
    }
}



module.exports = { createUser, loginUser }