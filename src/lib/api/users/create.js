
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(first_name, last_name, username, email, passwordHash) {
    try {
      const query =
        `INSERT INTO users
          (first_name, last_name, username, email, password_hash)
        VALUES
          ($(first_name), $(last_name), $(username), $(email), $(passwordHash))
        RETURNING id, first_name, last_name, email, username;`

      const results = await db.one(query, {
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        passwordHash: passwordHash,
      })
      return { 
        user: {
          id: results.id,
          email: results.email,
          first_name: results.first_name,
          last_name: results.last_name,
          username: results.username
        }
      }
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  }
}
