
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(invitation_id, starting_user_id) {
    try {
      const query =
        `WITH
          game_invitation_update AS (
            UPDATE battleship_game_invitations
            SET accepted_at = now()
            WHERE id = $(invitation_id)
            RETURNING id
          )
        INSERT INTO battleship_games
          (battleship_game_invitation_id, starting_user_id)
        SELECT
          $(invitation_id),
          $(starting_user_id)
        FROM game_invitation_update
        RETURNING battleship_games.id`

      const response = await db.one(query, { 
        invitation_id: invitation_id,
        starting_user_id: starting_user_id,
      })
      return {
        id: response.id,
      };
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  }
}
