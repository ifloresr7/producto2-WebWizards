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

getUserIdByEmail = async (membersEmail) => {

    try {
        const promises = membersEmail.map(email => {
                
            const getUserId = queries.getUserByEmail
            return axios.post('http://localhost:5000/graphql', {
                query: getUserId,
                variables: { email }
            }).then(response => {
                console.log(response.data.data.getUserByEmail.id)
                return response.data.data.getUserByEmail.id
            }).catch(error => {
                throw new Error("Error al obtener el id del usuario")
                console.log("Error al obtener el id del usuario")
            })
        })
    
        const membersIds = await Promise.all(promises)
    
        const validMembers = membersIds.filter(memberId => memberId !== null && memberId !== undefined)
        
        return validMembers
    } catch(error) {
        throw new Error("Error al obtener el id del usuario")
    }
}



module.exports = {
    getBoard,
    getUserIdByEmail
}
