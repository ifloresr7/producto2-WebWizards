const addUser = `
  mutation($userInput: UserInput!) {
    addUser(UserInput: $userInput){
      id
      email
    }
  }
`

const addBoard = `
mutation($boardInput: boardInput!) {
  addBoard(boardInput: $boardInput)
}
`

const deleteBoard = `
mutation($id: ID!) {
  deleteBoard(id: $id)
}
`

const addTask = `
mutation($taskInput: taskInput!) {
  addTask(taskInput: $taskInput)
}
`

const addTaskToBoard = `
  mutation AddTaskToBoard($boardId: ID!, $taskId: ID!) {
    addTaskToBoard(boardId: $boardId, taskId: $taskId) 
  }
`

const deleteAllTasksFromBoard = `
  mutation DeleteAllTasksFromBoard($tasksIds: [ID]!) {
    deleteAllTasksFromBoard(tasksIds: $tasksIds) 
  }
`

const deleteTask = `
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) 
  }
`



const mutations = {
    addUser,
    addBoard,
    deleteBoard,
    addTask,
    addTaskToBoard,
    deleteAllTasksFromBoard,
    deleteTask
}

module.exports = mutations;