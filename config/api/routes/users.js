const { resolve } = require('path');
const express = require('express');
const router = express.Router();

module.exports = (jwtMiddleWare) => {
  // Route prefix is /api/users
  const usersController = require(__basedir + '/controllers/users_controller')()

  // POST request to creating users
  router.post('/users', (req, res) => {
    usersController.signUp(req, res);
  });

  // GET request to fetch all users
  router.get('/users', (req, res) => {
    usersController.getAllUsers(req, res);
  });

  return router;
}