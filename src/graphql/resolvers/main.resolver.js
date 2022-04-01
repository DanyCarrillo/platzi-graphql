const queries = require('./query.resolver');
const mutations = require('./mutations.resolver');
const types = require('./types.resolver');

module.exports = {
    Query: queries,
    Mutation: mutations, ...types
}