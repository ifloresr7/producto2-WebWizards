const express = require('express');
const { getBoards } = require('../controllers/board');
const boardRouter = express.Router();

boardRouter.post('/get-boards', getBoards);

module.exports = boardRouter;