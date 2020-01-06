const knex = require('knex')({
  client: 'mysql2',
  debug: true,
  connection: {
    timezone: 'Asia/Jakarta',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME || 'your_db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  },
});

module.exports = knex;
