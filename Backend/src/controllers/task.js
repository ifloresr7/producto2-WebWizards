const mutations = require("../services/mutations")
const axios = require('axios')

const createtask = async (req, res) => {
    try {
        const { title, description, status, order, colour, endTime, members } = req.body
    
        const mutation = mutations.addTask

        console.log(req.body)
    
        const variables = { title, description, status, order, colour, endTime, members }
    
        const response = await axios.post('http://localhost:5000/graphql', {
            query: mutation,
            variables
        })
    
        if (response.data.errors) {
            return res.status(400).send({ error: 'Error al crear el tablero' })
        }
    
        return res.status(200).json({ message: "Tablero creado correctamente" })
    } catch (error) {
        console.log(error)
        console.log("Error al crear el tablero")
        return res.status(400).json({ error: 'Error al crear el tablero' })
    }
}

module.exports = { createtask }
