const { resolve } = require('path');
const express = require('express');
const router = express.Router();

module.exports = (jwtMiddleWare) => {
  // Route prefix is /api/users
  const gameInvitationsController = require(__basedir + '/controllers/game_invitations_controller')()

  // PUT request to accept invitations
  router.put('/game_invitations/:invitation_id/accept', (req, res) => {
    gameInvitationsController.accept(req, res);
  });
  
  // PUT request to decline invitations
  router.put('/game_invitations/:invitation_id/decline', (req, res) => {
    gameInvitationsController.decline(req, res);
  });

  // POST request for creating invitations
  router.post('/game_invitations', (req, res) => {
    gameInvitationsController.create(req, res);
  });

  return router;
}