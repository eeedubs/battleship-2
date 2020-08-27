'use strict';

var dbm;
var type;
var seed;
var Promise;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
  Promise = options.Promise;
};

exports.up = function(db, callback) {
  const sql = `
    CREATE TABLE users(
      id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR NOT NULL,
      password_hash VARCHAR NOT NULL,
      first_name VARCHAR,
      last_name VARCHAR,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `

  db.runSql(sql, (err) => {
    if (err) return console.log(err);
  }, callback);
};

exports._meta = {
  "version": 1
};
