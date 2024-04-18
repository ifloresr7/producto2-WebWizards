getUsers = async (email, password) => {
    
        const query = queries.getUser

        const variables = { email, password }

        const response = await axios.post('http://localhost:5000/graphql', {
            query,
            variables
        })

        return response
}