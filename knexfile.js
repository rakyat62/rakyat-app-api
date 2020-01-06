require('dotenv').config();

const defaultConfig = {
  client: 'mysql2',
  connection: {
    timezone: '+07:00',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'your_db',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: `${__dirname}/src/db/migrations`,
  },
  seeds: {
    directory: `${__dirname}/src/db/seeds`,
  },
};

module.exports = {
  development: {
    ...defaultConfig,
  },

  staging: {
    ...defaultConfig,
  },

  production: {
    ...defaultConfig,
  },

};
