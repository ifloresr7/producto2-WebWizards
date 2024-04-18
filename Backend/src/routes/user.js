const express = require('express');
const { createUser, loginUser } = require('../controllers/user');
const { getBoards } = require('../controllers/board');
const userRouter = express.Router();

userRouter.post('/new-user', createUser);

userRouter.get('/login', loginUser, getBoards);

module.exports = userRouter;