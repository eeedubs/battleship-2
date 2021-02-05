const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');
const _ = require('lodash');

module.exports = {
  async execute(email) {
    try {
      const query = 
        `SELECT
          id,
          first_name,
          last_name,
          user_name,
          password_hash
        FROM users
        WHERE email = $(email)`

      const results = await db.oneOrNone(query, { email: email });
      if (_.isEmpty(results)) {
        return { message:  `User not found with email ${email}` };
      };
      return {
        user: {
          id: results.id,
          firstName: results.first_name,
          lastName: results.last_name,
          userName: results.user_name,
          passwordHash: results.password_hash
        }
      };
    } catch(error) {
      throw `Error: ${error}`
    };
  },
}
