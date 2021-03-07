
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(inviter_user_id, invitee_user_id) {
    try {
      const query =
        `INSERT INTO battleship_game_invitations
          (inviter_user_id, invitee_user_id)
        VALUES
          ($(inviter_user_id), $(invitee_user_id))`

      await db.none(query, {
        inviter_user_id: inviter_user_id,
        invitee_user_id: invitee_user_id,
      })
      return;
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  }
}
