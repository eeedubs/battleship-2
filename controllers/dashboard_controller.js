require('dotenv').config()

// Dependencies
const getDataForUserApi = require(__basedir + '/src/lib/api/dashboard/get_data_for_user');

module.exports = () => {
  return {
    // POST /api/dashboard
    getDataForUser: async(req, res) => {
      const currentUserId = req.currentUserId;
      try {
        let userData = await getDataForUserApi.execute(currentUserId);
        const { games, gameInvitations, userFriends } = userData;
        
        return res.status(200).json({ 
          games: games,
          gameInvitations: gameInvitations,
          userFriends: userFriends,
        });
      } catch(error) {
        return res.status(500).json({ invites: null, games: null, error: error });
      }
    },
  }
};

