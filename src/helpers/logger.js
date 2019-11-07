const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.DEVELOPMENT ? 'debug' : 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new winston.transports.File({
      filename: './logs/info.log',
      level: 'info',
    }),
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
    }),
  ],
});

module.exports = logger;
