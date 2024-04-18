const axios = require('axios')
const mutations = require('../services/mutations')

const createBoard = async (req, res) => {
    try {
        const { title, description, members, tasks, image } = req.body
    
        const mutation = mutations.addBoard

        console.log(mutation)
    
        const variables = {
            boardInput: {
                title, 
                description, 
                tasks,
                members,
                image       
            }
        }
    
        const response = await axios.post('http://localhost:5000/graphql', {
            query: mutation,
            variables
        })

        if (response.data.errors) {
            return res.status(400).send({ error: 'Error al crear el tablero' })
        }
    
        return res.status(200).json({ message: "Tablero creado correctamente" })

    } catch(error) {
        console.log("Error al crear el tablero")
        return res.status(400).json({ error: 'Error al crear el tablero' })
    }
}

const getBoards = async (req, res) => {

    try {
        const { id } = req.query

        const query = queries.getBoardsByUserID

        const variables = { id }
        
        const response = await axios.post('http://localhost:5000/graphql', {
            query,
            variables
        })
        
        if (response.data.errors) {
            return res.status(400).json({ error: 'Error obteniendo boards'})
        }
        
        const boards = response.data.data.getBoardsByUserID
        
        return res.status(200).json({ data: boards })
    } catch (error) {
        console.log("Error al traernos los boards")
        return res.status(400).json({ error: 'Error obteniendo boards'})
    }

}

const getBoardData = async (req, res) => {
    try {
        const id = req.params.id
    
        const query = queries.getDataByBoardID
    
        const variables = { id }
    
        const response = await axios.post('http://localhost:5000/graphql', {
            query,
            variables
        })

        if (response.data.errors) {
            return res.status(400).json({ error: 'Error obteniendo datos del board'})
        }

        const board = response.data.data.getDataByBoardID

        return res.status(200).json({ data: board })
    } catch(error) {
        console.log("Error al traernos los datos del board")
        return res.status(400).json({ error: 'Error obteniendo datos del board'})
    }
}

const deleteBoard = async (req, res) => {
    try {
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
    
        return res.status(200).json({ message: "Board eliminado correctamente"})
    } catch(error) {
        console.log("Error al eliminar el board")
        return res.status(400).json({ error: 'Error eliminando board'})
    }
}

module.exports = {
    createBoard,
    getBoards,
    getBoardData,
    deleteBoard
}