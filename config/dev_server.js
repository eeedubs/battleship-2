require('dotenv').config();
const isProduction = process.env.NODE_ENV === 'production';

const express     = require('express');
const app         = express();
const apiPort     = process.env.API_PORT || 3000;
const { resolve } = require('path');

// Globals
global.__basedir = resolve(__dirname, '../');

// JSON parsing
app.use(express.json());

// Winston
const { winstonLogger, winstonErrorLogger } = require('./middleware/config.winston');
app.use(winstonLogger());
app.use(winstonErrorLogger());

// Express-session
// const expressSessionMiddleware = require('./middleware/config.express_session');
// app.use(expressSessionMiddleware);

// CORS
const corsMiddleware = require('./middleware/config.cors');
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);

// UI
const publicPath = resolve(__dirname, '../dist');
const staticConf = { maxAge: '1y', etag: false };
app.use(express.static(publicPath, staticConf));

// JWT
const jwtMiddleware = require('./middleware/config.jsonwebtoken');

// Routes
const apiRoutes = require('./api/index')(jwtMiddleware);
app.use('/api', apiRoutes);

// Server
const nodemon = require('nodemon');
app.listen(apiPort, () => {
  console.log(`app listening on port ${apiPort}.`);
});

process
// CTRL + C
.on('SIGINT', () => {
  console.log("\n[server] CTRL + C, shutting down...");
    nodemon.emit('quit');
    process.kill(process.pid, 'SIGINT');
    process.exit(0);
  })
  // Refresh
  .on('SIGUSR2', () => {
    console.log("\n[server] Restarting...");
    nodemon.restart();
    process.exit(0);
  })
  // Terminal closed
  .on('SIGHUP', () => {
    console.log("\n[server] Terminal closed, shutting down...");
    process.kill(process.pid, 'SIGHUP');
    process.exit(0);
  });