const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');
const _ = require('lodash');

module.exports = {
  execute(id) {
    try {
      const query = 
        `SELECT id AS user_id
        FROM users
        WHERE id = $(id)`

      const results = await db.oneOrNone(query, { id: id })
      if (_.isEmpty(results)) {
        return { message:  `User not found with email ${email}` };
      }
      return results;
    } catch(error) {
      throw `Error: ${error}`
    };
  },
}
