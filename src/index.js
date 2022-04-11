'use strict'
require('dotenv').config();
const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { readFileSync} = require('fs');
const {join}  = require('path');
const resolvers = require('./graphql/resolvers/main.resolver');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001
const isDev = process.env.NODE_ENV !== 'production';

const typeDefs = readFileSync(
  join(__dirname, './graphql/schema','schema.graphql'),
  'utf-8'
)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.use(cors());
// Configurar los resolvers
app.use('/api', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: isDev
}))

app.listen(port, ()=>console.log(`Server is listen in http://localhost:${port}/api`));