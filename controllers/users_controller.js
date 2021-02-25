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

module.exports = () => {
  return {
    // POST /api/users
    signUp: async(req, res) => {
      const { firstName, lastName, userName, email } = req.body;
      
      const emailIsValid = validator.isEmail(email);
      if (!emailIsValid) {
        return res.status(400).json({ auth: false, token: '', user: null, error: `Invalid email format` });
      }
      
      const normalizedEmail = validator.normalizeEmail(email);
      const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

      try {
        let response = await createUserApi.execute(firstName, lastName, userName, normalizedEmail, passwordHash);
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

