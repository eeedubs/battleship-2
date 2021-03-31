
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(gameInvitationId, startingUserId) {
    try {
      const query =
        `INSERT INTO battleship_games
          (battleship_game_invitation_id, starting_user_id)
        VALUES
          ($(gameInvitationId), $(startingUserId))
        RETURNING id`

      return await db.one(query, {
        gameInvitationId: gameInvitationId,
        startingUserId: startingUserId,
      })
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  }
}
