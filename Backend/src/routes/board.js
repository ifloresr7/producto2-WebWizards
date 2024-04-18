const express = require('express');
const { getBoards, createBoard, getBoardData, deleteBoard} = require('../controllers/board');
const { deleteAllTasksFromBoard } = require('../controllers/task');
const boardRouter = express.Router();

boardRouter.get('/get-boards', getBoards);

boardRouter.post('/create', createBoard);

boardRouter.get('/:id', getBoardData);

boardRouter.delete('/delete', deleteAllTasksFromBoard, deleteBoard)

module.exports = boardRouter;