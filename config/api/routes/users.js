const { resolve } = require('path');
const express = require('express');
const router = express.Router();

module.exports = (jwtMiddleWare) => {
  // Route prefix is /api/users
  const usersController = require(__basedir + '/controllers/users_controller')()

  // GET request to search users by email
  router.get('/users/email/:email', jwtMiddleWare, (req, res) => {
    usersController.searchByEmail(req, res);
  });

  // GET request to search users by username
  router.get('/users/username/:username', jwtMiddleWare, (req, res) => {
    usersController.searchByUsername(req, res);
  });

  // POST request for creating users
  router.post('/users', (req, res) => {
    usersController.signUp(req, res);
  });

  // GET request to fetch all users
  router.get('/users', (req, res) => {
    usersController.getAllUsers(req, res);
  });

  return router;
}