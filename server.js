const { server } = require('./dist/main');


server.start({
  port: process.env.PORT || 4000,
  cors: {
    credentials: true,
    origin: ['http://localhost:3000', 'https://rakyat62.netlify.app'],
  },
}, (info) => {
  console.log('The server is up!', info);
});
