const Board = require("../../db/models/board.model")
const User = require("../../db/models/user.model")

const boardResolvers = {
    Query: {
        countBoards() {
            return Board.collection.countDocuments()
        },
        getBoardsByID: async (_, { id }) => {
            try {
                const boards = await Board.find({ members: id });
                return boards;
            }catch (error) {
                console.error("Error al obtener tableros por ID:", error);
                throw new Error('Error al obtener tableros por ID');
            }
        },
        showBoards: async () => {
            try {
                const boards = await Board.find();
                return boards;
              } catch (error) {
                console.error("Error al obtener usuarios:", error);
                throw new Error('Error al obtener usuarios');
              }
        }
    },
    Board: {
        members: async (parent, args, context) => {
          const memberIds = parent.members;
    
          const members = await User.find({ _id: { $in: memberIds } });
    
          return members;
        },
    
      },
    Mutation: {
        addBoard: async (_, {boardInput}) => {
            const { title, description, members } = boardInput;

            try {
                const board = await Board.create({ title, description, members })
                board.save()
                return board;
            } catch(error) {
                console.log(error)
                throw new Error('Error creating board')
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