const Board = require("../../db/models/board.model")

const board = {
    Query: {
        countBoards() {
            return Board.collection.countDocuments()
        }
    },
}

module.exports = board

/*
app.get('/createBoard', async (req, res) => {
    const newBoard = await Board.create({ title: 'Test Board', description: 'Test Description' })
    newBoard.save()

    res.send(newBoard)
})*/