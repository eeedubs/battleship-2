require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = async(req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if (token) {
      return jwt.verify(token, process.env.SECRET, async(error, decoded) => {
        if (error) { return res.status(403); }
        
        if (decoded.user) {
          req.currentUserId = decoded.user.id;
          return next();
        } else {
          return res.status(403);
        }
      });
    } else {
      return res.status(401);
    }
  } catch(error) {
    console.log(error);
    return res.status(500);
  }
};
