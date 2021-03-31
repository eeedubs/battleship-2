require('dotenv').config();
const pgPromise = require('pg-promise');

const pgOptions = {
  receive: (data, result, e) => {
    camelizeColumns(data);
  }
};

const camelizeColumns = (data) => {
  const template = data[0];
  for (let prop in template) {
    const camel = pgPromise.utils.camelize(prop);
    if (!(camel in template)) {
      for (let i = 0; i < data.length; i++) {
        let d = data[i];
        d[camel] = d[prop];
        delete d[prop];
      }
    }
  }
};

const pgp = pgPromise(pgOptions);
const PGUSER = process.env.PGUSER;
const PGPASSWORD = process.env.PGPASSWORD;
const PGHOST = process.env.HOST || 'localhost';
const PGPORT = process.env.PGPORT || 3000;
const PGDATABASE = process.env.PGDATABASE;

const db = pgp(`postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`);

module.exports = db;
