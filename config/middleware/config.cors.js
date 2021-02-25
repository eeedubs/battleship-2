require('dotenv').config();

const host        = process.env.HOST || 'localhost';
const apiPort     = process.env.API_PORT || 3000;
const clientPort  = process.env.CLIENT_PORT || 8080;

const cors = require('cors');

const corsOptions = { 
  origin: [
    `http://${host}:${apiPort}`, // API 
    `https://${host}:${apiPort}`, // API 
    `http://${host}:${clientPort}`, // Client
    `https://${host}:${clientPort}` // Client
  ],
  allowedHeaders: [
    'x-access-token',
    'Content-Type',
    'Access-Control-Allow-Headers',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;