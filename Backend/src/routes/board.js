const express = require('express');
const { getBoards, createBoard} = require('../controllers/board');
const boardRouter = express.Router();

boardRouter.get('/get-boards', getBoards);

boardRouter.post('/create', createBoard);



module.exports = boardRouter;