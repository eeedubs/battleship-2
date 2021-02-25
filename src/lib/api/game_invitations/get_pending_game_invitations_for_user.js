
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(userId) {
    try {
      const query =
        `SELECT
          id,
          inviter_user_id,
          invitee_user_id,
          created_at
        FROM game_invitations
        WHERE $(userId) IN (inviter_user_id, invitee_user_id)
          AND accepted_at IS NULL
          AND declined_at IS NULL
          AND archived_at IS NULL`

      const gameInvitations = await db.any(query, { userId: userId })
      return { gameInvitations: gameInvitations }
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  }
}
