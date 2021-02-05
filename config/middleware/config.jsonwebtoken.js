require('dotenv').config();

const jwt = require('jsonwebtoken');

const verifySessionApi = require(__basedir + '/src/lib/api/sessions/verify');

module.exports = {
  verify: async(req, res, next) => {
    try {
      const token = req.headers['x-access-token'];
      if (token) {
        jwt.verify(token, process.env.SECRET, async(err, decoded) => {
          if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token' });
          
          const session = await verifySessionApi.execute(decoded.id);

          if (session && session.userId){
            req.userId = session.userId;
            next();
          } else {
            res.status(401).send('Token invalid.');
          }
        });
      } else {
        res.status(401).send('No token present');
      }
    } catch(error) {
      console.log(`Error: ${error}`);
      throw error;
    }
  }
};
