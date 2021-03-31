require('dotenv').config()

// Dependencies
const createGameApi = require(__basedir + '/src/lib/api/games/create');

module.exports = () => {
  return {
    // POST /api/games/create
    create: async(req, res) => {
      const { gameInvitationId, startingUserId } = req.params;
      try {
        const game = await createGameApi.execute(gameInvitationId, startingUserId);
        return res.status(200).json({ id: game.id });
      } catch(error) {
        return res.status(500).json({ error: error });
      }
    },
  }
};

