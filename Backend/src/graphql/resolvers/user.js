const User = require('../../db/models/user.model')

const userResolvers = {
    Query: {
        loginUser: async (_,{ userInput }) => {
            const { email, password } = userInput;
            try {
                const user = await User.findOne({ email });
                if (!user || user.password !== password) {
                  throw new Error('Contraseña incorrecta');
                }
    
                return user;
              } catch (error) {
                throw new Error(error.message);
              }
        },
        getUserByEmail: async (_, { email }) => {
          try {
            const user = await User.findOne({ email });
            return user ? user : null;
          } catch (error) {
            throw new Error('Error al obtener usuario por email');
          }
        },
    },
    Mutation: {
        addUser: async (_, {UserInput}) => {
          const { email, password } = UserInput;
            console.log("Se crea el usuario")

            try {
                const user = await User.create({ email, password })
                user.save()
                return user;
            } catch(error) {
                console.log(error)
                throw new Error('Error creating user')
            }
        }
    }
}

module.exports = userResolvers