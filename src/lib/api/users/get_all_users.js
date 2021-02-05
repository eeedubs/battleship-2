const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute() {
    try {
      const query = `SELECT * FROM users`
      return await db.any(query);
    } catch(error) {
      throw `Error: ${error}`
    }
  }
}
