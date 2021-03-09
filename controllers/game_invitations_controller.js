require('dotenv').config()

// db
const db = require(__basedir + '/src/lib/api/db');

// Dependencies
const createApi = require(__basedir + '/src/lib/api/game_invitations/create');
const acceptAndCreateGameApi = require(__basedir + '/src/lib/api/game_invitations/accept_and_create_game');
const declineApi = require(__basedir + '/src/lib/api/game_invitations/decline');

module.exports = () => {
  return {
    // POST /api/game_invitations/create
    create: async(req, res) => {
      const { inviter_user_id, invitee_username } = req.body;

      try {
        const response = await createApi.execute(inviter_user_id, invitee_username);
        return res.status(200).end();
      } catch(error) {
        return res.status(500).json({ error: error });
      }
    },

    // POST /api/game_invitations/:id/accept
    accept: async(req, res) => {
      const { invitation_id, starting_user_id } = req.params;

      try {
        const response = await acceptAndCreateGameApi.execute(invitation_id, starting_user_id);
        if (response.error) {
          return res.status(500).json({ id: null, error: response.error });
        }
        return res.status(200).json({ id: response.id, error: null });
      } catch(error) {
        return res.status(500).json({ error: error });
      }
    },

    // POST /api/game_invitations/:id/decline
    decline: async(req, res) => {
      const { invitation_id } = req.params;

      try {
        await declineApi.execute(invitation_id);
        return res.status(200).end();
      } catch(error) {
        return res.status(500).json({ error: error });
      }
    },

  }
};

