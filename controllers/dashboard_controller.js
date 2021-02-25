require('dotenv').config()

// Dependencies
const getDataForUser = require(__basedir + '/src/lib/api/dashboard/get_data_for_user');

module.exports = () => {
  return {
    // POST /api/dashboard
    getDataForUser: async(req, res) => {
      const userId = req.userId;
      try {
        let response = await getDataForUser.execute(userId);

        if (response.error) {
          return res.status(500).json({ invites: null, games: null, error: response.error });
        } else {
          const { games, gameInvitations } = response
          
          return res.status(200).json({ games: games, gameInvitations: gameInvitations });
        }
      } catch(error) {
        return res.status(500).json({ invites: null, games: null, error: error });
      }
    },
  }
};

