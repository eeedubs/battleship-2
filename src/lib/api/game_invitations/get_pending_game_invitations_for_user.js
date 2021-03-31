
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(userId) {
    try {
      const query =
        `SELECT
          bgi.id,
          bgi.created_by,
          opponent_user.id AS opponent_user_id,
          opponent_user.username AS opponent_user_username,
          bgi.created_at,
          (SELECT win_count FROM battleship_games_record_against_user(u.id, opponent_user.id)) AS wins_against_opponent,
          (SELECT loss_count FROM battleship_games_record_against_user(u.id, opponent_user.id)) AS losses_against_opponent
        FROM users AS u
        JOIN battleship_game_invitations_for_user($(userId)) AS bgi ON bgi.user_id = u.id
          AND bgi.accepted_at IS NOT NULL
          AND bgi.declined_at IS NULL
          AND bgi.archived_at IS NULL
        JOIN users AS opponent_user ON opponent_user.id = bgi.opponent_user_id
          AND opponent_user.id != $(userId)
        WHERE u.id = $(userId)
        ORDER BY bgi.created_at DESC`

      return await db.any(query, { userId: userId })
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  }
}
