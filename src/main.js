import { GraphQLServer } from 'graphql-yoga';
import { resolvers, typeDefs } from './schema';

require('dotenv').config();

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start({ port: process.env.PORT || 4000 }, (info) => {
  console.log('The server is up!', info);
});
