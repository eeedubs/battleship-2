const Winston = require('winston');
const expressWinston = require('express-winston');

module.exports = {
  winstonLogger: () => {
    return expressWinston.logger({
      transports: [
        new Winston.transports.Console(),
      ],
      format: Winston.format.combine(
        Winston.format.colorize(),
        Winston.format.json(),
      ),
      meta: false,
      exitOnError: false,
      msg: "HTTP {{req.method}} {{req.url}}",
      expressFormat: true,
      colorize: false,
    });
  },
  winstonErrorLogger: () => {
    return expressWinston.errorLogger({
      transports: [
        new Winston.transports.Console(),
      ],
      format: Winston.format.combine(
        Winston.format.colorize(),
        Winston.format.json(),
      ),
      meta: true,
      exitOnError: false,
      expressFormat: true,
      colorize: true,
    });
  },
}
  