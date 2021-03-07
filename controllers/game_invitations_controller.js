require('dotenv').config()

// db
const db = require(__basedir + '/src/lib/api/db');

// Dependencies
const createApi = require(__basedir + '/src/lib/api/game_invitations/create');
const acceptApi = require(__basedir + '/src/lib/api/game_invitations/accept');
const declineApi = require(__basedir + '/src/lib/api/game_invitations/decline');

module.exports = () => {
  return {
    // POST /api/game_invitations/create
    create: async(req, res) => {
      const { inviter_user_id, invitee_user_id } = req.params;

      try {
        await createApi.execute(inviter_user_id, invitee_user_id);
        return res.status(200).end();
      } catch(error) {
        return res.status(500).json({ error: error });
      }
    },

    // POST /api/game_invitations/:id/accept
    accept: async(req, res) => {
      const { invitation_id } = req.params;

      try {
        await acceptApi.execute(invitation_id);
        return res.status(200).end();
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

