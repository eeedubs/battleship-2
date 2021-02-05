
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');
const _ = require('lodash');

module.exports = {
  async execute(token) {
    try {
      const query =
        `SELECT user_id
        FROM json_web_tokens
        WHERE id = $(token);`

      const results = await db.oneOrNone(query, {
        token: token,
        userId: userId,
      });

      return _.isEmpty(results) ? {} : { userId: results.user_id }
    } catch(error) {
      throw `Error: ${error}`
    };
  }
}
