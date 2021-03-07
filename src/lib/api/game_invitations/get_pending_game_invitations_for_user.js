
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(user_id) {
    try {
      const query =
        `SELECT
          bgi.id,
          inviter_user.id AS inviter_user_id,
          inviter_user.username AS inviter_user_username,
          invitee_user.id AS invitee_user_id,
          invitee_user.username AS invitee_user_username,
          bgi.created_at ::DATE
        FROM battleship_game_invitations AS bgi
        JOIN users AS inviter_user ON inviter_user.id = bgi.inviter_user_id
        JOIN users AS invitee_user ON invitee_user.id = bgi.invitee_user_id
        WHERE $(user_id) IN (bgi.inviter_user_id, bgi.invitee_user_id)
          AND bgi.accepted_at IS NULL
          AND bgi.declined_at IS NULL
          AND bgi.archived_at IS NULL`

      const gameInvitations = await db.any(query, { user_id: user_id })
      return gameInvitations;
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  }
}
