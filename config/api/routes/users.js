const { resolve } = require('path');
const express = require('express');
const router = express.Router();

module.exports = (jwtMiddleWare) => {
  // Route prefix is /api/users
  const users_controller = require(__basedir + '/controllers/users_controller')()

  // POST request for creating users
  router.post('/users', (req, res) => {
    users_controller.sign_up(req, res);
  });

  // GET request to fetch all users
  router.get('/users', (req, res) => {
    users_controller.getAllUsers(req, res);
  });

  return router;
}