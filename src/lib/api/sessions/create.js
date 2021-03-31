
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(token, userId) {
    try {
      const query =
        `INSERT INTO json_web_tokens
          (id, user_id)
        VALUES
          ($(token), $(userId))`

      return await db.none(query, {
        token: token,
        userId: userId,
      });
    } catch(error) {
      console.log(error);
      return { error: error };
    };
  }
}
