// Used to connect to the database from server.js

require('dotenv').config();
const { Pool } = require('pg');
const PGHOST = process.env.PGHOST;
const PGUSER = process.env.PGUSER;
const PGDATABASE = process.env.PGDATABASE;

module.exports = new Pool({
  host: PGHOST,
  user: PGUSER,
  database: PGDATABASE,
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
  },
});