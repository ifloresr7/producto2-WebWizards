require('graphql-import-node/register');

const boardTypeDefs = require('./types/board.types.js');
const taskTypeDefs = require('./types/task.types.js');
const userTypeDefs = require('./types/user.types.js');
const mergedResolvers = require('./resolvers');

const typeDefs = `${userTypeDefs} ${taskTypeDefs} ${boardTypeDefs}`;

console.log(typeDefs)

module.exports = { typeDefs, mergedResolvers };