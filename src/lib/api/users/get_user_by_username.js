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

      const result = await db.oneOrNone(query, { username: username })
      if (_.isEmpty(results)) {
        return { error:  `User not found.` };
      }
      return {
        user: { id: result.id }
      }    
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  },
}
