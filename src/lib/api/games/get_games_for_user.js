
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');

module.exports = {
  async execute(userId) {
    try {
      const query =
        `SELECT
          id,
          inviter_user_id,
          invitee_user_id,
          winner_user_id,
          loser_user_id,
          created_at,
          updated_at,
          completed_at
        FROM games
        WHERE $(userId) IN (inviter_user_id, invitee_user_id)
          AND archived_at IS NULL`

      const games = await db.any(query, { userId: userId })
      return { games: games }
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  }
}
