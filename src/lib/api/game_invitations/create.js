
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(inviter_user_id, invitee_username) {
    try {
      const query =
        `INSERT INTO battleship_game_invitations
          (inviter_user_id, invitee_user_id)
        SELECT
          $(inviter_user_id),
          invitee_user.id
        FROM users AS invitee_user
        WHERE invitee_user.username = $(invitee_username);`

      await db.none(query, {
        inviter_user_id: inviter_user_id,
        invitee_username: invitee_username,
      })
      return;
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  }
}
