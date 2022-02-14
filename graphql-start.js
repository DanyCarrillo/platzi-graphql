'use strict'

const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String,
    saludo: String,
  }
`);

// Configurar los resolvers
const resolvers = { 
    hello: () => 'Hola mundo!',
    saludo: () => 'Hola a todos'
};

// Ejecutar query
graphql(schema, '{ hello, saludo }', resolvers).then((response) => {
  console.log(response);
});