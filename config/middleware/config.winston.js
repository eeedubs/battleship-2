const winston = require('winston');
const expressWinston = require('express-winston');

module.exports = {
  winstonLogger: () => {
    return expressWinston.logger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true,
          timestamp: true,
          handleExceptions: true,
        })
      ],
      meta: false,
      exitOnError: false,
      msg: "HTTP {{req.method}} {{req.url}}",
      colorize: false,
    });
  },
  winstonErrorLogger: () => {
    return expressWinston.errorLogger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true,
          timestamp: true,
          handleExceptions: true,
        })
      ],
    });
  },
}
  