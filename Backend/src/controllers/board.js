const queries = require("../services/queries")
const axios = require('axios')

const createBoard = async (req, res) => {
    const { title, description, members } = req.body

    const query = queries.addBoard

    const variables = { title, description, members }

    const response = await axios.post('http://localhost:5000/graphql', {
        query,
        variables
    })

    if (response.data.errors) {
        return res.status(400).send({ error: 'Error al crear el tablero' })
    }

    return res.status(200).json({ message: "Tablero creado correctamente" })

}

const getBoards = async (req, res) => {

    try {
        const { id } = req.query
        
        const query = queries.getBoardsByID
        
        const variables = { id }
        
        const response = await axios.post('http://localhost:5000/graphql', {
            query,
            variables
        })
        
        if (response.data.errors) {
            return res.status(400).json({ error: 'Error obteniendo boards'})
        }
        
        const boards = response.data.data.getBoardsByID
        
        return res.status(200).json({ data: boards })
    } catch (error) {
        console.log("Error al traernos a los usuarios")
        return res.status(400).json({ error: 'Error obteniendo boards'})
    }

}

const deleteBoard = async (req, res) => {
    const { id } = req.body

    const query = `
        mutation DeleteBoards($id: ID!) {
            deleteBoards(id: $id) {
                title
                description
            }
        }
    `

    const variables = { id }

    const response = await axios.post('http://localhost:5000/graphql', {
        query,
        variables
    })

    if (response.data.errors) {
        return res.status(400).send('Error eliminando boards')
    }

    return res.status(200).json(response.data.data.deleteBoards)
}

module.exports = {
    createBoard,
    getBoards,
    deleteBoard
}