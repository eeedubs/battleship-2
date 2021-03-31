require('dotenv').config()

const bcrypt = require('bcrypt');
const saltRounds = 10;

// jwt
const jwt = require('jsonwebtoken');

// validator.js
const validator = require('validator');

// Dependencies
const createUserApi = require(__basedir + '/src/lib/api/users/create');
const createSessionApi = require(__basedir + '/src/lib/api/sessions/create');
const getAllUsersApi = require(__basedir + '/src/lib/api/users/get_all_users');
const checkIfEmailIsUniqueApi = require(__basedir + '/src/lib/api/users/check_if_email_is_unique');
const checkIfUsernameIsUniqueApi = require(__basedir + '/src/lib/api/users/check_if_username_is_unique');
const searchByEmailApi = require(__basedir + '/src/lib/api/users/search_by_email');
const searchByUsernameApi = require(__basedir + '/src/lib/api/users/search_by_username');

module.exports = () => {
  return {
    // POST /api/users
    signUp: async(req, res) => {
      const { firstName, lastName, username, email } = req.body;
      
      const emailIsValid = validator.isEmail(email);
      if (!emailIsValid) {
        return res.status(400).json({ auth: false, token: '', user: null, error: `Invalid email format` });
      }
      
      const normalizedEmail = validator.normalizeEmail(email);
      
      try {
        // Email unique validation
        let emailIsUnique = await checkIfEmailIsUniqueApi.execute(normalizedEmail);
        if (!emailIsUnique){
          return res.json({ auth: false, token: '', user: null, error: 'Email has already been taken.' });
        }

        // Username unique validation
        let usernameIsUnique = await checkIfUsernameIsUniqueApi.execute(username);
        if (!usernameIsUnique.isUnique){
          return res.json({ auth: false, token: '', user: null, error: 'Username has already been taken.' });
        }

        // Create user
        const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
        const newUser = await createUserApi.execute(firstName, lastName, username, normalizedEmail, passwordHash);
        
        // Create session
        const token = jwt.sign({ id: newUser.id }, process.env.SECRET, {
          expiresIn: process.env.EXPIRATION,
        });
        createSessionApi.execute(token, newUser.id);

        return res.status(200).json({ auth: true, token: token, user: newUser, error: null });
      } catch(error) {
        return res.status(500).json({ auth: false, token: '', user: null, error: error });
      }
    },

    // GET /api/users
    getAllUsers: async(req, res) => {
      try {
        const response = await getAllUsersApi.execute();
        return res.status(200).json(response);
      } catch(error) {
        return res.status(500).json({ error: error });
      }
    },

    // GET /api/users/email/:email
    searchByEmail: async(req, res) => {
      try {
        const { email } = req.params;

        const users = await searchByEmailApi.execute(email, req.currentUserId);
        return res.status(200).json({ users: users });
      } catch(error) {
        console.log(error);
        return res.status(500).json({ error: error });
      }
    },

    // GET /api/users/username/:username
    searchByUsername: async(req, res) => {
      try {
        const { username } = req.params;
        const users = await searchByUsernameApi.execute(username, req.currentUserId);
        return res.status(200).json({ users: users });
      } catch(error) {
        console.log(error);
        return res.status(500).json({ error: error });
      }
    },
  }
};

