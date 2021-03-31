const { resolve } = require('path');
const express = require('express');
const router = express.Router();

module.exports = (jwtMiddleWare) => {
  // Route prefix is /api/games
  const gamesController = require(__basedir + '/controllers/games_controller')()

  // POST request for creating games
  router.post('/games', (req, res) => {
    gamesController.create(req, res);
  });

  return router;
}