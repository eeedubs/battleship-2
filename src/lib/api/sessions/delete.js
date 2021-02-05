
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(token) {
    try {
      const query =
        `DELETE FROM json_web_tokens
        WHERE id = $(token);`

      await db.one(query, { token: token })
    } catch(error) {
      throw `Error: ${error}`
    };
  }
}
