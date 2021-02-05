require('dotenv').config()

const bcrypt = require('bcrypt');
const saltRounds = 10;

// jwt
const jwt = require('jsonwebtoken');

// Dependencies
const createSessionApi = require(__basedir + '/src/lib/api/sessions/create');
const deleteSessionApi = require(__basedir + '/src/lib/api/sessions/delete');
const getUserByEmailApi = require(__basedir + '/src/lib/api/users/get_user_by_email');

module.exports = () => {
  return {
    // POST /api/sessions
    signIn: async(req, res) => {
      try {
        var response = await getUserByEmailApi.execute(req.body.email);
      } catch(error) {
        return res.status(500).send({ auth: false, token: '', user: null, errorMessage: error });
      }
      const { user } = response;
      if (user){
        const passwordValid = await bcrypt.compare(req.body.password, user.passwordHash);
        if (passwordValid) {
          delete user.passwordHash;
          const token = jwt.sign({ id: user.id }, process.env.SECRET, {
            expiresIn: process.env.EXPIRATION,
          });
          await createSessionApi.execute(token, user.id);
          return res.status(200).send({ auth: true, token: token, user: user, errorMessage: null });
        }
      }
      return res.status(401).send({ auth: false, token: '', user: null, errorMessage: 'Incorrect email and/or password' });
    },
    signOut: async(req, res) => {
      const token = req.body.token;
      if (token){
        try {
          await deleteSessionApi.execute(token);
        } catch(error) {
          return res.status(500).send({ message: error });
        }
      }
      return res.status(200).end();
    },
  }
};

