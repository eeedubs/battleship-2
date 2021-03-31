
const { resolve } = require('path');
const getPendingGameInvitationsForUser = require(__basedir + '/src/lib/api/game_invitations/get_pending_game_invitations_for_user');
const getGamesForUser = require(__basedir + '/src/lib/api/games/get_games_for_user');
const getFriendsForUser = require(__basedir + '/src/lib/api/user_friends/get_friends_for_user');

module.exports = {
  async execute(userId) {
    try {
      const gameInvitations = await getPendingGameInvitationsForUser.execute(userId);
      const games = await getGamesForUser.execute(userId);
      const userFriends = await getFriendsForUser.execute(userId);
      return { 
        games: games,
        gameInvitations: gameInvitations,
        userFriends: userFriends,
      }
    } catch (error) {
      console.log(error);
      return { error: "Something went wrong." };
    }
  }
}
