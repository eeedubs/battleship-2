
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

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
            RETURNING user_id, id AS token
          )
        SELECT
          u.id AS user_id,
          u.email,
          u.first_name,
          u.last_name,
          u.user_name,
          ut.token
        FROM users AS u
        JOIN update_token AS ut ON ut.user_id = u.id`

      const results = await db.oneOrNone(query, { token: token })
      return {
        user: {
          userId: results.user_id,
          email: results.email,
          firstName: results.first_name,
          lastName: results.last_name,
          userName: results.user_name
        },
        token: token,
      }
    } catch(error) {
      console.log(error);
      return { error: error };
    };
  }
}
