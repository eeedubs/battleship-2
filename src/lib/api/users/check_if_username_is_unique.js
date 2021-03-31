const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');
const _ = require('lodash');
const { response } = require('express');

module.exports = {
  async execute(username) {
    try {
      const query = 
        `SELECT NOT EXISTS(
          SELECT 1
          FROM users
          WHERE username = $(username)
        ) AS is_unique`

      return await db.one(query, { username: username });
    } catch(error) {
      console.log("Error: ", error);
      return { error: "Something went wrong." };
    };
  },
}
