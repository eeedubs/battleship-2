
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(firstName, lastName, username, email, passwordHash) {
    try {
      const query =
        `INSERT INTO users
          (first_name, last_name, username, email, password_hash)
        VALUES
          ($(firstName), $(lastName), $(username), $(email), $(passwordHash))
        RETURNING id, first_name, last_name, email, username;`

      return await db.one(query, {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        passwordHash: passwordHash,
      })
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  }
}
