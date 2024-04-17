const user = require('./user.js')
const board = require('./board.js')
const task = require('./task.js')   
const { mergeResolvers } = require('@graphql-tools/merge')

const mergedResolvers = mergeResolvers([
    user,
    board,
    task,
])

module.exports = mergedResolvers