const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');
const _ = require('lodash');

module.exports = {
  async execute(email, currentUserId) {
    try {
      const query = 
        `SELECT
          id,
          email,
          username,
          first_name,
          last_name
        FROM users
        WHERE email ILIKE ('%' || $(email) || '%')
          AND id != $(currentUserId)
        LIMIT 10`
      return await db.any(query, { 
        email: email,
        currentUserId: currentUserId,
      })
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  },
}
