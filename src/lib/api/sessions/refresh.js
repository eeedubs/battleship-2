
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');
const _ = ('lodash');

module.exports = {
  async execute(token) {
    try {
      const query =
        `WITH
          update_token AS (
            UPDATE json_web_tokens
            SET 
              expires_at = now() ::TIMESTAMPTZ + '1 hour' ::INTERVAL
            WHERE id = $(token)
              AND expires_at >= now()
            RETURNING user_id, id AS token
          )
        SELECT
          u.id,
          u.email,
          u.first_name,
          u.last_name,
          u.username
        FROM users AS u
        JOIN update_token AS ut ON ut.user_id = u.id`

      return await db.oneOrNone(query, { token: token })
    } catch(error) {
      console.log(error);
      return { error: error };
    };
  }
}
