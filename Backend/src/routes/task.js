const express = require('express');
const { createtask } = require('../controllers/task');
const taskRouter = express.Router();

taskRouter.post('/create', createtask);

module.exports = taskRouter;