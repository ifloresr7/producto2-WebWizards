const User = require('../../db/models/user.model')

const userResolvers = {
    Query: {
        showUsers: async () => {
            try {
                const users = await User.find();
                return users;
              } catch (error) {
                console.error("Error al obtener usuarios:", error);
                throw new Error('Error al obtener usuarios');
              }
        },
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
        }
    },
    Mutation: {
        addUser: async (_, {UserInput}) => {
          const { email, password } = UserInput;
            console.log("Se crea el usuario")

            try {
                const user = await User.create({ email, password })
                user.save()
                console.log("usuario creado correctament")
                return user;
            } catch(error) {
                console.log(error)
                throw new Error('Error creating user')
            }
        }
    }
}

module.exports = userResolvers