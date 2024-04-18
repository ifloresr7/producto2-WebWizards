const Board = require("../../db/models/board.model")
const User = require("../../db/models/user.model")
const Task = require("../../db/models/task.model")

const task = {
    Query: {
        showTasks: async () => {
            try {
                const tasks = await Task.find();
                return tasks;
              } catch (error) {
                console.error("Error al obtener tareas:", error);
                throw new Error('Error al obtener tareas');
              }
        },
        
    },
    Mutation: {
        addTask: async (_, {TaskInput}) => {
        const { title, description, status, order, colour, endTime, members } = TaskInput;
            console.log("Se crea la tarea")

            try {
                const task = await Task.create({ title, description, status, order, colour, endTime, members })
                task.save()
                console.log("Tarea creada correctamente")
                return task;
            } catch(error) {
                console.log(error)
                throw new Error('Error creating user')
            }
        }
    }
}

module.exports = task