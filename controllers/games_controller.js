require('dotenv').config()

// Dependencies
const createApi = require(__basedir + '/src/lib/api/games/create');

module.exports = () => {
  return {
    // POST /api/games/create
    create: async(req, res) => {
      const { game_invitation_id, starting_user_id } = req.params;
      try {
        const response = await createApi.execute(game_invitation_id, starting_user_id);
        if (response.error) {
          return res.status(500).json({id: null, error: response.error });
        } else {
          return res.status(200).json({ id: response.id });
        }
      } catch(error) {
        return res.status(500).json({ error: error });
      }
    },
  }
};

