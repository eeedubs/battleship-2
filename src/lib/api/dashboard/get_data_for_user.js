
const { resolve } = require('path');
const getPendingGameInvitationsForUser = require(__basedir + '/src/lib/api/game_invitations/get_pending_game_invitations_for_user');
const getGamesForUser = require(__basedir + '/src/lib/api/games/get_games_for_user');

module.exports = {
  async execute(userId) {
    try {
      const invites = await getPendingGameInvitationsForUser.execute(userId);
      const games = await getGamesForUser.execute(userId);
      return { 
        invites: invites,
        games: games
      }
    } catch (error) {
      console.log(error);
      return { error: "Something went wrong." };
    }
  }
}
