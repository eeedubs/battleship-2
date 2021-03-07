
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(invitation_id) {
    try {
      const query =
        `UPDATE battleship_game_invitations
        SET accepted_at = now()
        WHERE id = $(invitation_id);`

      await db.none(query, { invitation_id: invitation_id })
      return;
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  }
}
