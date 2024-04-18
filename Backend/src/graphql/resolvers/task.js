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
    Task: {
        members: async (parent, args, context) => {
          const memberIds = parent.members;
    
          const members = await User.find({ _id: { $in: memberIds } });
    
          return members;
        },
    },
    Mutation: {
        addTask: async (_, {taskInput}) => {
        const { title, description, status, order, colour, endTime, members } = taskInput;
            console.log("Se crea la tarea")

            try {
                const task = await Task.create({ title, description, status, order, colour, endTime, members })
                task.save()
                return task.id;
            } catch(error) {
                console.log(error)
                throw new Error('Error creating user')
            }
        },
        deleteTask: async (_, {id}) => { 
            
            try {
                const task = await Task.findByIdAndDelete(id)
                if (task == null){
                    const error = new Error('');
                    error.status = 404
                    throw error 
                }
                return "Tarea borrada correctamente";
            } catch(error) {
                console.error("Error al eliminar tarea:", error);
                if (error.status == 404) {
                    throw new Error ("La tarea no existe.")
                } else{
                    throw new Error('Error al eliminar tarea');
                }
            }
        },
        deleteAllTasksFromBoard: async (_, { tasksIds }) => {
            try {
                await Task.deleteMany({ _id: { $in: tasksIds } });
                return 'Se han eliminado las tareas relacionadas';
            } catch (error) {
                console.error('Ha habido un error eliminando las tareas de un tablero:', error);
                throw new Error('Ha habido un error eliminando las tareas de un tablero');
            }
        }
    }
}

module.exports = task