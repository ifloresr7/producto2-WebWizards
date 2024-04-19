const getUser = `
  query ($userInput: UserInput!) {
        loginUser(userInput: $userInput) {
        id
        email
        }
    }
`
const getBoardsByUserID = `
    query($id: ID!) {
        getBoardsByUserID(id: $id) {
            id
            title
            description
            image
        }
    }
`
const getDataByBoardID = `
    query ($id: ID!) {
        getDataByBoardID(id: $id) {
            title
            description
            image
            members {
                id
                email
            }
            tasks {
                id
                title
                description
                members {
                    id
                    email
                }
            }
        }
    }
`

const getTasksInStatusWithIDBoard = `
    query ($status: Status!, $id: ID!) {
        getTasksInStatusWithIDBoard(status: $status, id: $id) {
            id
            title
            description
            colour
            endTime
            status
            members {
                id
                email
            }
        }
    }
`

const queries = {
    getUser,
    getBoardsByUserID,
    getDataByBoardID,
    getTasksInStatusWithIDBoard
}


module.exports = queries;