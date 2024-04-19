const { getBoard, getUserIdByEmail } = require("../services")
const mutations = require("../services/mutations")
const axios = require('axios')
const config = require("../config")

const createtask = async (req, res, next) => {
    try {
        const { boardId, title, description, status, order, colour, endTime, members } = req.body
    
        //Se recupera el id de usuario mediante el email
        const membersIds = await getUserIdByEmail(members)
        
        const mutation = mutations.addTask
    
        const variables = { 
            taskInput: { title, description, status, order, colour, endTime, members: membersIds }
        }
    
        const response = await axios.post(`${config.domain}graphql`, {
            query: mutation,
            variables
        })
    
        if (response.data.errors) {
            return res.status(400).send({ error: 'Error al crear la tarea' })
        }
    
        req.boardId = boardId
        req.taskId = response.data.data.addTask
        next()
    } catch (error) {
        console.log(error)
        console.log("Error al crear la tarea")
        return res.status(400).json({ error: 'Error al crear la tarea' })
    }
}

const deleteAllTasksFromBoard = async (req, res, next) => {
    try {
        const { boardId } = req.query

        const board = await getBoard(boardId)

        if (!board) {
            return res.status(401).send('El tablero no existe')
        }

        const tasksIds = board.tasks.map(task => task.id)

        const mutation = mutations.deleteAllTasksFromBoard

        const variables = { tasksIds }

        console.log(variables)

        const response = await axios.post(`${config.domain}graphql`, {
            query: mutation,
            variables
        })

        if (response.data.errors) {
            return res.status(400).send({ error: 'Error al borrar las tareas del tablero' })
        }

        req.boardId = boardId
        next()
    } catch (error) {
        console.log("Error al borrar las tareas del tablero")
        return res.status(400).json({ error: 'Error al borrar las tareas del tablero' })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.query

        const mutation = mutations.deleteTask

        const variables = { id: taskId }

        const response = await axios.post(`${config.domain}graphql`, {
            query: mutation,
            variables
        })

        if (response.data.errors) {
            return res.status(400).send({ error: 'Error al borrar la tarea' })
        }

        res.status(200).send('Tarea borrada correctamente')
    } catch (error) {
        console.log("Error al borrar la tarea")
        return res.status(400).json({ error: 'Error al borrar la tarea' })
    }
}

module.exports = { createtask, deleteAllTasksFromBoard, deleteTask }
