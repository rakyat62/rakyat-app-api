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

server.start({
  port: process.env.PORT || 4000,
  cors: {
    credentials: true,
    origin: ['http://localhost:3000', 'https://rakyat62.netlify.com'],
  },
}, (info) => {
  console.log('The server is up!', info);
});
