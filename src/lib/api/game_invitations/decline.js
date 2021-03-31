
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(invitationId) {
    try {
      const query =
        `UPDATE battleship_game_invitations
        SET declined_at = now()
        WHERE id = $(invitationId);`

      return await db.none(query, { invitationId: invitationId })
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  }
}
