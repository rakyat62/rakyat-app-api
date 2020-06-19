require('dotenv').config();
const db = require('./models');
const logger = require('./helpers/logger');

db.sequelize.sync({ force: true })
  .then(() => logger.info('Migration success'))
  .catch((error) => logger.info(error))
  .finally(() => process.exit(0));
