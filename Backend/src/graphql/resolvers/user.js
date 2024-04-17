const User = require('../../db/models/user.model')

const user = {
    Query: {
        showUsers() {
            return "showUsers"
        }
    },
    Mutation: {
        addUser: async (_, { email, password }) => {

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

module.exports = user