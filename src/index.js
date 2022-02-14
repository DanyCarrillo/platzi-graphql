'use strict'
require('dotenv').config();
const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { readFileSync} = require('fs');
const {join}  = require('path');
const resolvers = require('./graphql/resolvers/resolvers');
const app = express();
const port = process.env.PORT || 3001

const typeDefs = readFileSync(
  join(__dirname, './graphql/schema','schema.graphql'),
  'utf-8'
)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Configurar los resolvers

app.use('/api', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
}))

app.listen(port, ()=>console.log(`Server is listen in http://localhost:${port}/api`));