require('dotenv').config()

const bcrypt = require('bcrypt');

// jwt
const jwt = require('jsonwebtoken');
const { http } = require('winston');

// Dependencies
const refreshSessionApi = require(__basedir + '/src/lib/api/sessions/refresh');
const createSessionApi = require(__basedir + '/src/lib/api/sessions/create');
const deleteSessionApi = require(__basedir + '/src/lib/api/sessions/delete');
const getUserByEmailApi = require(__basedir + '/src/lib/api/users/get_user_by_email');

module.exports = () => {
  return {
    refresh: async(req, res) => {
      try {
        const { token } = req.body;

        let user = await refreshSessionApi.execute(token);
        if (!user) {
          await deleteSessionApi.execute(token);
          return res.status(401).send({ auth: false, token: '', error: response.error });
        }
        return res.status(200).send({ auth: true, token: token, user: user, error: null })
      } catch(error) {
        return res.status(500).send({ auth: false, token: '', error: error });
      }
    },
    // POST /api/sessions
    signIn: async(req, res) => {
      try {
        const { email, password } = req.body;
        let user = await getUserByEmailApi.execute(email);

        const passwordValid = await bcrypt.compare(password, user.passwordHash);
        if (passwordValid) {
          delete user.passwordHash;
          const token = jwt.sign({ user: user }, process.env.SECRET, {
            expiresIn: process.env.EXPIRATION,
          });
          await createSessionApi.execute(token, user.id);
          return res.status(200).send({ auth: true, token: token, user: user, error: null });
        }
        return res.status(401).send({ auth: false, token: '', user: null, error: 'Incorrect email and/or password' });
      } catch(error) {
        return res.status(500).send({ auth: false, token: '', user: null, error: error });
      }
    },
    signOut: async(req, res) => {
      try {
        const { token } = req.body;
        if (token){
          await deleteSessionApi.execute(token);
        }
        return res.status(200).end();
      } catch(error) {
        return res.status(500).send({ message: error });
      }
    },
  }
};

