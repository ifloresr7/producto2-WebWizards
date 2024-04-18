const express = require('express');
const { createtask, deleteTask } = require('../controllers/task');
const { addtaskToBoard } = require('../controllers/board');
const taskRouter = express.Router();

taskRouter.post('/create', createtask, addtaskToBoard);

taskRouter.delete('/delete', deleteTask);

module.exports = taskRouter;