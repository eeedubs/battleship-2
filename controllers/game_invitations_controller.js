require('dotenv').config()

// db
const db = require(__basedir + '/src/lib/api/db');

// Dependencies
const createGameInvitationApi = require(__basedir + '/src/lib/api/game_invitations/create');
const acceptGameInvitationAndCreateGameApi = require(__basedir + '/src/lib/api/game_invitations/accept_and_create_game');
const declineGameInvitationApi = require(__basedir + '/src/lib/api/game_invitations/decline');

module.exports = () => {
  return {
    // POST /api/game_invitations/create
    create: async(req, res) => {
      const { inviterUserId, inviteeUsername } = req.body;

      try {
        await createGameInvitationApi.execute(inviterUserId, inviteeUsername);
        return res.status(200).end();
      } catch(error) {
        return res.status(500).json({ error: error });
      }
    },

    // POST /api/game_invitations/:id/accept
    accept: async(req, res) => {
      const { invitationId, startingUserId } = req.params;

      try {
        const game = await acceptGameInvitationAndCreateGameApi.execute(invitationId, startingUserId);
        return res.status(200).json({ id: game.id, error: null });
      } catch(error) {
        return res.status(500).json({ error: error });
      }
    },

    // POST /api/game_invitations/:id/decline
    decline: async(req, res) => {
      const { invitationId } = req.params;

      try {
        await declineGameInvitationApi.execute(invitationId);
        return res.status(200).end();
      } catch(error) {
        return res.status(500).json({ error: error });
      }
    },

  }
};

