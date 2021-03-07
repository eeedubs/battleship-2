
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');
const _ = require('lodash');

module.exports = {
  async execute(user_id) {
    try {
      const query =
        `SELECT
          bg.id AS game_id,
          invitee_user.id AS invitee_user_id,
          invitee_user.username AS invitee_username,
          inviter_user.id AS inviter_user_id,
          inviter_user.username AS inviter_username,
          current_turn_user.id AS current_turn_user_id,
          current_turn_user.username AS current_turn_user_username,
          winner_user.username AS winner_username,
          loser_user.username AS loser_username,
          bg.created_at ::DATE,
          bg.updated_at ::DATE,
          (SELECT CASE WHEN bg.completed_at IS NULL THEN FALSE ELSE TRUE END) AS is_completed,
          bg.completed_at
        FROM battleship_game_invitations AS bgi
        JOIN battleship_games AS bg ON bg.battleship_game_invitation_id = bgi.id
          AND bg.archived_at IS NULL
        JOIN users AS inviter_user ON inviter_user.id = bgi.inviter_user_id
        JOIN users AS invitee_user ON invitee_user.id = bgi.invitee_user_id
        LEFT JOIN users AS current_turn_user ON current_turn_user.id = (SELECT battleship_games_current_turn_user_id(bg.id))
        LEFT JOIN users AS winner_user ON winner_user.id = bg.winner_user_id
        LEFT JOIN users AS loser_user ON loser_user.id = bg.loser_user_id
        WHERE $(user_id) IN (bgi.inviter_user_id, bgi.invitee_user_id)
          AND bgi.accepted_at IS NOT NULL
          AND bgi.declined_at IS NULL
          AND bgi.archived_at IS NULL`

      const results = await db.any(query, { user_id: user_id })
      if (_.isEmpty(results)) {
        return { inProgress: [], completed: [] }
      }
      const gamesInProgress = [], gamesCompleted = [];
      results.forEach((game) => {
        if (game.is_completed){
          gamesCompleted.push(game);
        } else {
          gamesInProgress.push(game);
        }
      })
      return { inProgress: gamesInProgress, completed: gamesCompleted };
    } catch(error) {
      console.log(error);
      return { error: "Something went wrong." };
    };
  }
}
