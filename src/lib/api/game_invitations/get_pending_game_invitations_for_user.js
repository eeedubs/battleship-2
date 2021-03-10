
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(user_id) {
    try {
      const query =
        `SELECT
          bgi.id,
          bgi.inviter_user_id,
          bgi.invitee_user_id,
          opponent_user.id AS opponent_user_id,
          opponent_user.username AS opponent_user_username,
          bgi.created_at
        FROM battleship_game_invitations AS bgi
        JOIN users AS opponent_user ON opponent_user.id IN (bgi.inviter_user_id, bgi.invitee_user_id)
          AND opponent_user.id != $(user_id)
        WHERE bgi.accepted_at IS NULL
          AND bgi.declined_at IS NULL
          AND bgi.archived_at IS NULL
        ORDER BY bgi.created_at DESC`

      const gameInvitations = await db.any(query, { user_id: user_id })
      return gameInvitations;
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  }
}
