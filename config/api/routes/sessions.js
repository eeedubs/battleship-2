const { resolve } = require('path');
const express = require('express');
const router = express.Router();

module.exports = (jwtMiddleWare) => {
  // Route prefix is /api/sessions
  const sessionsController = require(__basedir + '/controllers/sessions_controller')()

  router.put('/sessions', (req, res) => {
    sessionsController.refresh(req, res);
  });

  // POST request to create sessions (log in)
  router.post('/sessions', (req, res) => {
    sessionsController.signIn(req, res);
  });

  // DELETE request to delete sessions (log out)
  router.delete('/sessions', (req, res) => {
    sessionsController.signOut(req, res);
  });

  return router;
}