
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(firstName, lastName, userName, email, passwordHash) {
    try {
      const query =
        `INSERT INTO USERS
          (first_name, last_name, user_name, email, password_hash)
        VALUES
          ($(firstName), $(lastName), $(userName), $(email), $(passwordHash))
        RETURNING id, first_name, last_name, user_name;`

      const results = await db.one(query, {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        passwordHash: passwordHash,
      })
      return { 
        id: results.id,
        firstName: results.first_name,
        lastName: results.last_name,
        userName: results.user_name
      };
    } catch(error) {
      throw `Error: ${error}`
    };
  }
}
