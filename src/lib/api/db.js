require('dotenv').config();

const pgp = require('pg-promise')();
const PGUSER = process.env.PGUSER;
const PGPASSWORD = process.env.PGPASSWORD;
const PGHOST = process.env.HOST || 'localhost';
const PGPORT = process.env.PGPORT || 3000;
const PGDATABASE = process.env.PGDATABASE;

const db = pgp(`postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`);

module.exports = db;
