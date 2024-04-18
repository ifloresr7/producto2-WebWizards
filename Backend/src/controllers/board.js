const queries = require("../services/queries")

const createBoard = async (req, res) => {
    const { title, description, members } = req.body

    const query = queries.addBoard

    const variables = { title, description, members }

    const response = await axios.post('http://localhost:5000/graphql', {
        query,
        variables
    })

    const 

    if (response.data.errors) {
        res.status(400).send('Error creando board')
    }


}

const getBoards = async (req, res) => {
    const { id } = req.body

    const query = queries.getBoardsByID

    const variables = { id }

    const response = await axios.post('http://localhost:5000/graphql', {
        query,
        variables
    })

    if (response.data.errors) {
        res.status(400).json({ error: 'Error obteniendo boards'})
    }

    const boards = response.data.data.getBoardsByID


    res.status(200).json({ data: boards })

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
        res.status(400).send('Error eliminando boards')
    }

    res.status(200).json(response.data.data.deleteBoards)
}

module.exports = {
    createBoard,
    getBoards,
    deleteBoard
}