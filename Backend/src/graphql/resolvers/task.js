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
        addTask: async (_, {taskInput}) => {
        const { title, description, status, order, colour, endTime, members } = taskInput;
            console.log("Se crea la tarea")

            try {
                const task = await Task.create({ title, description, status, order, colour, endTime, members })
                task.save()
                return "Tarea creada correctamente";
            } catch(error) {
                console.log(error)
                throw new Error('Error creating user')
            }
        },
        deleteTask: async (_, {id}) => { 
            
            try {
                const task = await Task.findByIdAndDelete(id)
                task.deleteOne()
                return "Tarea borrada correctamente";
              } catch(error) {
                console.error("Error al eliminar tarea:", error);
                throw new Error('Error al eliminar tarea');
              }
          }
    }
}

module.exports = task