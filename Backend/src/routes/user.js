const express = require('express');
const { createUser, loginUser } = require('../controllers/user');
const userRouter = express.Router();

userRouter.post('/new-user', createUser);

userRouter.get('/login', loginUser);

module.exports = userRouter;