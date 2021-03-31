const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');
const _ = require('lodash');

module.exports = {
  execute(username) {
    try {
      const query = 
        `SELECT id
        FROM users
        WHERE username = $(username)`

      return await db.oneOrNone(query, { username: username })
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  },
}
