const axios = require("axios")
const queries = require("./queries")


getBoard = async (boardId) => {

        const query = queries.getDataByBoardID
    
        const variables = { id: boardId }
   
        const response = await axios.post('http://localhost:5000/graphql', {
            query,
            variables
        })

        if (response.data.errors) {
            return res.status(400).json({ error: 'Error obteniendo datos del board'})
        }

        const board = response.data.data.getDataByBoardID

        return board
}

module.exports = {
    getBoard
}