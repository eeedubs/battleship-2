
const { resolve } = require('path');
const getPendingGameInvitationsForUser = require(__basedir + '/src/lib/api/game_invitations/get_pending_game_invitations_for_user');
const getGamesForUser = require(__basedir + '/src/lib/api/games/get_games_for_user');

module.exports = {
  async execute(user_id) {
    try {
      const game_invitations = await getPendingGameInvitationsForUser.execute(user_id);
      const games = await getGamesForUser.execute(user_id);
      return { 
        games: games,
        game_invitations: game_invitations,
      }
    } catch (error) {
      console.log(error);
      return { error: "Something went wrong." };
    }
  }
}
