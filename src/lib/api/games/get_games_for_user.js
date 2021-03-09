
const { resolve } = require('path');
const db = require(__basedir + '/src/lib/api/db');
const _ = require('lodash');

module.exports = {
  async execute(user_id) {
    try {
      const query = `
        SELECT
          bg.id,
          opponent_user.id AS opponent_user_id,
          opponent_user.username AS opponent_user_username,
          (SELECT id FROM battleship_games_current_turn_user(bg.id)) AS current_turn_user_id,
          (SELECT username FROM battleship_games_current_turn_user(bg.id)) AS current_turn_user_username,
          winner_user.id AS winner_user_id,
          winner_user.username AS winner_username,
          loser_user.username AS loser_username,
          bg.created_at AS game_created_at,
          last_guess.created_at AS last_guess_created_at,
          (SELECT CASE WHEN bg.completed_at IS NULL THEN FALSE ELSE TRUE END) AS is_completed,
          bg.completed_at AS game_completed_at
        FROM battleship_game_invitations AS bgi
        JOIN battleship_games AS bg ON bg.battleship_game_invitation_id = bgi.id
          AND bg.archived_at IS NULL
        JOIN users AS opponent_user ON opponent_user.id IN (bgi.inviter_user_id, bgi.invitee_user_id)
          AND opponent_user.id != $(user_id)
        LEFT JOIN users AS winner_user ON winner_user.id = bg.winner_user_id
        LEFT JOIN users AS loser_user ON loser_user.id = bg.loser_user_id
        LEFT JOIN battleship_guesses AS last_guess ON last_guess.battleship_game_id = bg.id
          AND last_guess.created_at = (
            SELECT MAX(created_at)
            FROM battleship_guesses
            WHERE battleship_game_id = bg.id
          )
        WHERE $(user_id) IN (bgi.inviter_user_id, bgi.invitee_user_id)
          AND bgi.accepted_at IS NOT NULL
          AND bgi.declined_at IS NULL
          AND bgi.archived_at IS NULL
        ORDER BY last_guess.created_at DESC, bg.completed_at DESC, bg.created_at DESC;`

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
