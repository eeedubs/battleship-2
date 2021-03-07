const { resolve } = require('path');
const express = require('express');
const router = express.Router();

// /api/users
module.exports = (jwtMiddleWare) => {
  // /api/dashboard
  const dashboardRoutes = require('./routes/dashboard')(jwtMiddleWare);
  router.use(dashboardRoutes);

  // /api/game_invitations
  const gameInvitationRoutes = require('./routes/game_invitations')(jwtMiddleWare);
  router.use(gameInvitationRoutes);

  // /api/games
  const gameRoutes = require('./routes/games')(jwtMiddleWare);
  router.use(gameRoutes);

  // /api/sessions
  const sessionRoutes = require('./routes/sessions')(jwtMiddleWare);
  router.use(sessionRoutes);

  // /api/users
  const userRoutes = require('./routes/users')(jwtMiddleWare);
  router.use(userRoutes);

  return router;
}