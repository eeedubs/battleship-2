const { resolve } = require('path');
const express = require('express');
const router = express.Router();

module.exports = (jwtMiddleWare) => {
  // Route prefix is /api/dashboard
  const dashboard_controller = require(__basedir + '/controllers/dashboard_controller')()

  // GET request to fetch all dashboard data for a user
  router.get('/dashboard', jwtMiddleWare, (req, res) => {
    dashboard_controller.getDataForUser(req, res);
  });

  return router;
}