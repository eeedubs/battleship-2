require('dotenv').config();
const express = require('express');
const app = express();
const apiPort = process.env.API_PORT || 3000;
const { resolve } = require('path');
const cors = require('cors');
const corsOptions = { origin: `http://localhost:${apiPort}` };

app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// UI
const publicPath = resolve(__dirname, './dist');
const staticConf = { maxAge: '1y', etag: false };
app.use(express.static(publicPath, staticConf));

// DB
const db = require('./db/config.db');

db.connect((err, client, done) => {
  if (err) console.log(err);

  // return client.query(`SELECT * FROM users;`)
    // .then(res => console.log(res.rows[0]))
    // .catch(e => console.log(e));
  app.listen(apiPort, () => console.log(`app listening on port ${apiPort}.`));

  // middleware that is specific to this app
  app.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })

  client.end();
});