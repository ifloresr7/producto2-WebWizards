const createBoard = async (req, res) => {
    const { title, description, members } = req.body

    const query = `
        mutation CreateBoard($title: String!, $description: String!) {
            createBoard(title: $title, description: $description, members: $members) {
                title
                description
            }
        }
    `



    const variables = { title, description, members }

    const response = await axios.post('http://localhost:5000/graphql', {
        query,
        variables
    })

    if (response.data.errors) {
        res.status(400).send('Error creando board')
    }
}

const getBoards = async (req, res) => {
    const { id } = req.userData

    // const query = `
    //     query GetBoards($id: ID!) {
    //         getBoards(id: $id) {
    //             title
    //             description
    //         }
    //     }
    // `

    // const variables = { id }

    // const response = await axios.post('http://localhost:5000/graphql', {
    //     query,
    //     variables
    // })

    // if (response.data.errors) {
    //     res.status(400).send('Error obteniendo boards')
    // }

    // res.status(200).json(response.data.data.getBoards)

    res.status(200).json({ message: 'Se retorna el usuario', user: req.userData })

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