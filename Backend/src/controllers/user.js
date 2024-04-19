const axios = require('axios')
const queries = require('../services/queries')
const mutations = require('../services/mutations')
const config = require('../config')

const createUser = async (req, res) => {
    try {

        const { email, password } = req.body

        // Consultar si ya existe el usuario

        const mutation = mutations.addUser

        const variables = { 
            userInput: { email, password }
        }

        const response = await axios.post(`${config.domain}graphql`, {
            query: mutation,
            variables,
        })

        // Crear autentificación usuario con JWT

        // Consultar boards del usuario

        // Devolver boards y token

        const user = response.data.data.addUser

        return res.status(200).json({ data: user });

    } catch(error) {
        console.log(error)
        return res.status(400).json({ error: 'Error creando usuario' })
    }
}

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body

        const query = queries.getUser

        const variables = { 
            userInput: {email, password }
        }

        console.log(variables)

        const response = await axios.post(`${config.domain}graphql`, {
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
        console.log("error al iniciar sesión")
        return res.status(400).send('Error al iniciar sesión')
    }
}



module.exports = { createUser, loginUser }