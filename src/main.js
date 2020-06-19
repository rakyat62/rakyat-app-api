import { GraphQLServer, GraphQLServerLambda } from 'graphql-yoga';
import { resolvers, typeDefs } from './schema';

require('dotenv').config();

const props = {
  typeDefs,
  resolvers,
  context: (request) => ({
    request,
  }),
};

const server = new GraphQLServer(props);
const lambda = new GraphQLServerLambda(props);
const { handler } = lambda;

export {
  server,
  handler,
};
