
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(inviterUserId, inviteeUsername) {
    try {
      const query =
        `INSERT INTO battleship_game_invitations
          (inviter_user_id, invitee_user_id)
        SELECT
          $(inviterUserId),
          invitee_user.id
        FROM users AS invitee_user
        WHERE invitee_user.username = $(inviteeUsername);`

      return await db.none(query, {
        inviterUserId: inviterUserId,
        inviteeUsername: inviteeUsername,
      })
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  }
}
