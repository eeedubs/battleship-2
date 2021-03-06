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

      return await db.oneOrNone(query, { email: email });
    } catch(error) {
      console.log("Error: ", error);
      return { error: "Something went wrong." };
    };
  },
}
