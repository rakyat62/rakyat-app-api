import { GraphQLServer } from 'graphql-yoga';
import { resolvers, typeDefs } from './schema';

require('dotenv').config();

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: (request) => ({
    request,
  }),
});

module.exports = server;
