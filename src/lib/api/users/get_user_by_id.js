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

      const result = await db.oneOrNone(query, { id: id })
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
