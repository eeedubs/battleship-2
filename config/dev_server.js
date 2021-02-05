require('dotenv').config();
const isProduction = process.env.NODE_ENV === 'production';

const express     = require('express');
const app         = express();
const host        = process.env.HOST || 'localhost';
const apiPort     = process.env.API_PORT || 3000;
const clientPort  = process.env.CLIENT_PORT || 8080;
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
const cors = require('cors');
const corsOptions = { 
  origin: [
    `http://${host}:${apiPort}`, // API 
    `https://${host}:${apiPort}`, // API 
    `http://${host}:${clientPort}`, // Consumer
    `https://${host}:${clientPort}` // Consumer
  ],
  credentials: true,
  exposedHeaders: ['set-cookie'],
};
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// UI
const publicPath = resolve(__dirname, '../dist');
const staticConf = { maxAge: '1y', etag: false };
app.use(express.static(publicPath, staticConf));

// JWT
const jwtMiddleware = require('./middleware/config.jsonwebtoken');

// Routes
const apiRoutes = require('./api/index')(jwtMiddleware);
app.use('/api', apiRoutes);

// Port
app.listen(apiPort, () => console.log(`app listening on port ${apiPort}.`));
