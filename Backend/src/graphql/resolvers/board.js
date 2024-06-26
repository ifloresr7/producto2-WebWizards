const Board = require("../../db/models/board.model")
const User = require("../../db/models/user.model")
const Task = require("../../db/models/task.model");
const { addTask } = require("../../services/mutations");


const boardResolvers = {
    Query: {
        countBoards() {
            return Board.collection.countDocuments()
        },
        getBoardsByUserID: async (_, { id }) => {
            try {
                const boards = await Board.find({ members: id });
                return boards;
            }catch (error) {
                console.error("Error al obtener tableros por ID:", error);
                throw new Error('Error al obtener tableros por ID');
            }
        },
        getDataByBoardID: async (_, { id }) => {
            try {
                const board = await Board.findById(id);
                return board;
            }catch (error) {
                console.error("Error al obtener la información del tablero:", error);
                throw new Error('Error al obtener la información del tablero');
            }
        },
        getTasksInStatusWithIDBoard: async (_, {status, id }) => {
            try {
                const boardSelect = await Board.findById(id).populate("tasks")
                const tasks = boardSelect.tasks.filter(task => task.status == status)
                return tasks;
            }catch (error) {
                console.error("Error al obtener las tareas con un estado específico:", error);
                throw new Error('Error al obtener las tareas con un estado específico');
            }
        },
    },
    Board: {
        members: async (parent, args, context) => {
          const memberIds = parent.members;
    
          const members = await User.find({ _id: { $in: memberIds } });
    
          return members;
        },
        tasks: async (parent, args, context) => {
            const tasksIds = parent.tasks;
      
            const tasks = await Task.find({ _id: { $in: tasksIds } });
      
            return tasks;
          },
      },
    Mutation: {
        addBoard: async (_, {boardInput}) => {
            const { title, description, members, image } = boardInput;

            try {
                const board = await Board.create({ title, description, members, image })
                board.save()
                return "Tablero creado correctamente";
            } catch(error) {
                console.log(error)
                throw new Error('Error creating board')
            }
        },
        deleteBoard: async (_, {id}) => { 
            try {
                const board = await Board.findByIdAndDelete(id)
                if (board == null){
                    const error = new Error('');
                    error.status = 404
                    throw error 
                }
                return "Tablero borrado correctamente";
              } catch(error) {
                console.error("Error al eliminar tablero:", error);
                if (error.status == 404) {
                    throw new Error ("El tablero no existe.")
                } else{
                    throw new Error('Error al eliminar tablero');
                }
              }
        },
        addTaskToBoard: async (_, { boardId, taskId }) => {
            try {
                const board = await Board.findById(boardId)

                board.tasks.push(taskId)

                board.save()

                return "Tarea añadida correctamente al tablero";
            } catch (error) {
                return error
            }
        }
    }
};

module.exports = boardResolvers

/*
app.get('/createBoard', async (req, res) => {
    const newBoard = await Board.create({ title: 'Test Board', description: 'Test Description' })
    newBoard.save()

    res.send(newBoard)
})*/

/*const resolvers = {
    
    Board: {
      members: async (parent, args, context) => {
        // Assuming parent.members contains the array of user IDs for the board
        const memberIds = parent.members;
  
        // Fetch user information for each member ID
        const members = await User.find({ _id: { $in: memberIds } });
  
        // Return the fetched members
        return members;
      },
      // Other board field resolvers...
    },
    // Other type resolvers...
  };*/