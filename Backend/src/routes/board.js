const express = require('express');
const { getBoards } = require('../controllers/board');
const boardRouter = express.Router();

boardRouter.get('/get-boards', getBoards);



module.exports = boardRouter;