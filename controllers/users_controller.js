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
        return res.status(400).send({ auth: false, token: '', user: null, errorMessage: `Invalid email format` });
      }
      
      const normalizedEmail = validator.normalizeEmail(email);
      const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

      try {
        var newUser = await createUserApi.execute(firstName, lastName, userName, normalizedEmail, passwordHash);
      } catch(error) {
        return res.status(500).send({ auth: false, token: '', user: null, errorMessage: error });
      }

      const token = jwt.sign({ id: newUser.id }, process.env.SECRET, {
        expiresIn: process.env.EXPIRATION,
      });

      try {
        await createSessionApi.execute(token, newUser.id);
      } catch(error) {
        return res.status(500).send({ auth: false, token: '', user: null, errorMessage: `Could not create user session: ${error}` });
      }

      return res.status(200).send({ auth: true, token: token, user: newUser, errorMessage: null });
    },

    // GET /api/users
    getAllUsers: async(req, res) => {
      try {
        response = await getAllUsersApi.execute();
        return res.json(response);
      } catch(error) {
        return res.status(500).send({ error: error });
      }
    },
  }
};

