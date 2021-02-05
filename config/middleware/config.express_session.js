require('dotenv').config();

const expressSession  = require('express-session');
const uuidv4          = require('uuid').v4;

const session = expressSession({
    name: 'sessionId',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
      maxAge: 3600000,
      secure: isProduction,
      sameSite: isProduction,
    },
    genid: (() => {
      return uuidv4();
    }),
 })

 module.exports = session;