const { resolve } = require('path');
const express = require('express');
const router = express.Router();

// /api/users
module.exports = (jwtMiddleWare) => {
  const userRoutes = require('./routes/users')(jwtMiddleWare);
  router.use(userRoutes);
  
  // /api/games
  // const gameRoutes = require('./routes/games')
  // router.use(gameRoutes);
  
  // /api/guesses
  // const guessRoutes = require('./routes/guesses')
  // router.use(guessRoutes);
  
  // /api/placements
  // const placementRoutes = require('./routes/placements')
  // router.use(placementRoutes);

  const sessionRoutes = require('./routes/sessions')(jwtMiddleWare);
  router.use(sessionRoutes);

  return router;
}