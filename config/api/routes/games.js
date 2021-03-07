const { resolve } = require('path');
const express = require('express');
const router = express.Router();

module.exports = (jwtMiddleWare) => {
  // Route prefix is /api/games
  const games_controller = require(__basedir + '/controllers/games_controller')()

  // POST request for creating games
  router.post('/games', (req, res) => {
    games_controller.create(req, res);
  });

  return router;
}