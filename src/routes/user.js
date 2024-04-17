const express = require('express');
const { createUser } = require('../controllers/user');
const userRouter = express.Router();

userRouter.post('/new-user', createUser);

userRouter.get('/', (req, res) => {
    res.send('users!!')
})

module.exports = userRouter;