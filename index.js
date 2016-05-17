
const config = require('./config/config');
const mongoose = require('mongoose');
require('./models/material.server.model');
require('./models/user.server.model');



const app = require('./config/express')();

const db = mongoose.connect(config.db, function(err) {
  if (err) {
		console.error('Could not connect to MongoDB!');
		console.log(err);
  } else {
    console.log('connect to db: ' + config.db);
  }
});

app.listen(config.port);
