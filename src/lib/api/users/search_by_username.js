const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');
const _ = require('lodash');

module.exports = {
  async execute(username, currentUserId) {
    try {
      const query = 
        `SELECT
          id,
          email,
          username,
          first_name,
          last_name
        FROM users
        WHERE username ILIKE ('%' || $(username) || '%')
          AND id != $(currentUserId)
        LIMIT 10`

      return await db.any(query, { 
        username: username,
        currentUserId: currentUserId,
      })
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  },
}
