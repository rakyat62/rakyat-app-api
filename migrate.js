require('dotenv').config();
const db = require('./src/models');
const logger = require('./src/helpers/logger');

db.sequelize.sync({ force: true })
  .then(() => logger.info('Migration success'))
  .catch((error) => logger.info(error))
  .finally(() => process.exit(0));
