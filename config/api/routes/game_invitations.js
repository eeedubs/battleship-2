const { resolve } = require('path');
const express = require('express');
const router = express.Router();

module.exports = (jwtMiddleWare) => {
  // Route prefix is /api/users
  const game_invitations_controller = require(__basedir + '/controllers/game_invitations_controller')()

  // PUT request to accept invitations
  router.put('/game_invitations/:invitation_id/accept', (req, res) => {
    game_invitations_controller.accept(req, res);
  });
  
  // PUT request to decline invitations
  router.put('/game_invitations/:invitation_id/decline', (req, res) => {
    game_invitations_controller.decline(req, res);
  });

  // POST request for creating invitations
  router.post('/game_invitations', (req, res) => {
    game_invitations_controller.create(req, res);
  });

  return router;
}