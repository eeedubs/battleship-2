
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(game_invitation_id, starting_user_id) {
    try {
      const query =
        `INSERT INTO battleship_games
          (battleship_game_invitation_id, starting_user_id)
        VALUES
          ($(game_invitation_id), $(starting_user_id))
        RETURNING id`

      const results = await db.one(query, {
        game_invitation_id: game_invitation_id,
        starting_user_id: starting_user_id,
      })
      return { id: results.id };
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  }
}
