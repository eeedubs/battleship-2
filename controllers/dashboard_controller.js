require('dotenv').config()

// Dependencies
const getDataForUser = require(__basedir + '/src/lib/api/dashboard/get_data_for_user');

module.exports = () => {
  return {
    // POST /api/dashboard
    getDataForUser: async(req, res) => {
      const user_id = req.user_id;
      try {
        let response = await getDataForUser.execute(user_id);

        if (response.error) {
          return res.status(500).json({ invites: null, games: null, error: response.error });
        } else {
          const { games, game_invitations } = response
          
          return res.status(200).json({ 
            games: games, 
            game_invitations: game_invitations,
          });
        }
      } catch(error) {
        return res.status(500).json({ invites: null, games: null, error: error });
      }
    },
  }
};

