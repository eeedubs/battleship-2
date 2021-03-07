
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(token, user_id) {
    try {
      const query =
        `INSERT INTO json_web_tokens
          (id, user_id)
        VALUES
          ($(token), $(user_id))`

      await db.none(query, {
        token: token,
        user_id: user_id,
      });
      return;
    } catch(error) {
      throw `Error: ${error}`
    };
  }
}
