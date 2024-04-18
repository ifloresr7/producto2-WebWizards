const mutations = require("../services/mutations")
const axios = require('axios')

const createtask = async (req, res) => {
    const { title, description, status, order, colour, endTime, members } = req.body

    const query = mutations.addTask

    const variables = { title, description, status, order, colour, endTime, members }

    const response = await axios.post('http://localhost:5000/graphql', {
        query,
        variables
    })

    if (response.data.errors) {
        return res.status(400).send({ error: 'Error al crear el tablero' })
    }

    return res.status(200).json({ message: "Tablero creado correctamente" })

}
