const { resolve } = require('path');
const express = require('express');
const router = express.Router();

module.exports = (jwtMiddleWare) => {
  // Route prefix is /api/dashboard
  const dashboardController = require(__basedir + '/controllers/dashboard_controller')()

  // GET request to fetch all dashboard data for a user
  router.get('/dashboard', jwtMiddleWare, (req, res) => {
    dashboardController.getDataForUser(req, res);
  });

  return router;
}