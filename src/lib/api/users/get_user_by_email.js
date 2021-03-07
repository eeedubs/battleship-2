const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');
const _ = require('lodash');

module.exports = {
  async execute(email) {
    try {
      const query = 
        `SELECT
          id,
          email,
          first_name,
          last_name,
          username,
          password_hash
        FROM users
        WHERE email = $(email)`

      const result = await db.oneOrNone(query, { email: email });
      if (_.isEmpty(result)) {
        return { error:  `User not found with email "${email}"` };
      };
      return {
        user: {
          id: result.id,
          email: result.email,
          first_name: result.first_name,
          last_name: result.last_name,
          username: result.username,
          passwordHash: result.password_hash
        }
      };
    } catch(error) {
      console.log("Error: ", error);
      return { error: "Something went wrong." };
    };
  },
}
