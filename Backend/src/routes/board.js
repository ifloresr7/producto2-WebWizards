const express = require('express');
const { getBoards, createBoard, getBoardData} = require('../controllers/board');
const boardRouter = express.Router();

boardRouter.get('/get-boards', getBoards);

boardRouter.post('/create', createBoard);

boardRouter.get('/:id', getBoardData);

module.exports = boardRouter;