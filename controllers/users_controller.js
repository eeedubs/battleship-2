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
        let emailUniqueResponse = await checkIfEmailIsUniqueApi.execute(normalizedEmail);
        if (emailUniqueResponse.error) {
          return res.status(500).json({ auth: false, token: '', user: null, error: emailUniqueResponse.error });
        }
        if (!emailUniqueResponse.isUnique){
          return res.json({ auth: false, token: '', user: null, error: 'Email has already been taken.' });
        }

        // Username unique validation
        let usernameUniqueResponse = await checkIfUsernameIsUniqueApi.execute(username);
        if (usernameUniqueResponse.error) {
          return res.status(500).json({ auth: false, token: '', user: null, error: usernameUniqueResponse.error });
        }
        if (!usernameUniqueResponse.isUnique){
          return res.json({ auth: false, token: '', user: null, error: 'Username has already been taken.' });
        }

        const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

        let response = await createUserApi.execute(firstName, lastName, username, normalizedEmail, passwordHash);
        if (response.error) {
          return res.status(500).json({ auth: false, token: '', user: null, error: response.error });
        } else {
          const { user } = response;
          const token = jwt.sign({ id: user.id }, process.env.SECRET, {
            expiresIn: process.env.EXPIRATION,
          });

          response = createSessionApi.execute(token, user.id);
          if (response.error) {
            return res.status(500).json({ auth: false, token: '', user: null, error: response.error });
          } else {
            return res.status(200).json({ auth: true, token: token, user: user, error: null });
          }
        }
      } catch(error) {
        return res.status(500).json({ auth: false, token: '', user: null, error: error });
      }
    },

    // GET /api/users
    getAllUsers: async(req, res) => {
      try {
        const response = await getAllUsersApi.execute();
        return res.json(response);
      } catch(error) {
        return res.status(500).json({ error: error });
      }
    },
  }
};

