const { resolve } = require('path');
const express = require('express');
const router = express.Router();

module.exports = (jwtMiddleWare) => {
  // Route prefix is /api/sessions
  const sessions_controller = require(__basedir + '/controllers/sessions_controller')()

  router.put('/sessions', (req, res) => {
    sessions_controller.refresh(req, res);
  });

  // POST request to create sessions (sign in)
  router.post('/sessions', (req, res) => {
    sessions_controller.sign_in(req, res);
  });

  // DELETE request to delete sessions (sign out)
  router.delete('/sessions', (req, res) => {
    sessions_controller.sign_out(req, res);
  });

  return router;
}