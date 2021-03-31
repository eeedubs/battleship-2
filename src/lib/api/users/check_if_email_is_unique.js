const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');
const _ = require('lodash');
const { response } = require('express');

module.exports = {
  async execute(email) {
    try {
      const query = 
        `SELECT NOT EXISTS(
          SELECT 1
          FROM users
          WHERE email = $(email)
        ) AS is_unique`

      return await db.one(query, { email: email });
    } catch(error) {
      console.log("Error: ", error);
      return { error: "Something went wrong." };
    };
  },
}
