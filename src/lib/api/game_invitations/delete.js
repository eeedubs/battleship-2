
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(gameId) {
    try {
      const query =
        `DELETE FROM game_invitations
        WHERE id = $(gameId);`

      await db.one(query, { gameId: gameId })
      return;
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  }
}
