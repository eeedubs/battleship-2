const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');
const _ = require('lodash');

module.exports = {
  execute(id) {
    try {
      const query = 
        `SELECT id
        FROM users
        WHERE id = $(id)`

      return await db.oneOrNone(query, { id: id })
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  },
}
