
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(userId) {
    try {
      const query =
        `WITH
          user_friends_ids AS (
            SELECT
              uf.user_two_id AS friend_user_id,
              uf.created_at
            FROM users AS u
            JOIN user_friends AS uf ON uf.user_one_id = u.id
            WHERE u.id = $(userId)

            UNION

            SELECT 
              uf.user_one_id AS friend_user_id,
              uf.created_at
            FROM users AS u
            JOIN user_friends AS uf ON uf.user_two_id = u.id
            WHERE u.id = $(userId)
          )
        SELECT
          u.id,
          u.email,
          u.username,
          u.first_name,
          u.last_name,
          ufi.created_at
        FROM user_friends_ids AS ufi
        JOIN users AS u ON u.id = ufi.friend_user_id
        ORDER BY ufi.created_at`

      return await db.any(query, { userId: userId })
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  }
}
