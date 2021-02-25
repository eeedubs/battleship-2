
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(inviterUserId, inviteeUserId) {
    try {
      const query =
        `INSERT INTO game_invitations
          (inviter_user_id, invitee_user_id)
        VALUES
          ($(inviterUserId), $(inviteeUserId));`

      await db.one(query, {
        inviterUserId: inviterUserId,
        inviteeUserId: inviteeUserId,
      })
      return;
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  }
}
