
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(invitationId, startingUserId) {
    try {
      const query =
        `WITH
          game_invitation_update AS (
            UPDATE battleship_game_invitations
            SET accepted_at = now()
            WHERE id = $(invitationId)
            RETURNING id
          )
        INSERT INTO battleship_games
          (battleship_game_invitation_id, starting_user_id)
        SELECT
          $(invitationId),
          $(startingUserId)
        FROM game_invitation_update
        RETURNING battleship_games.id`

      return await db.one(query, { 
        invitationId: invitationId,
        startingUserId: startingUserId,
      })
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  }
}
