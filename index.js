
const config = require('./src/config/config');
const mongoose = require('mongoose');
require('./src/models/material.server.model');
require('./src/models/user.server.model');
require('./src/models/keepRecord.server.model');

const app = require('./src/config/express')();

const db = mongoose.connect(config.db, function(err) {
  if (err) {
		console.error('Could not connect to MongoDB!');
		console.log(err);
  } else {
    console.log('connect to db: ' + config.db);
  }
});

app.listen(config.port);
