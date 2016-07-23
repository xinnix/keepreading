
const config = require('./src/config/config');
const mongoose = require('mongoose');
require('./src/models/task.server.model');
require('./src/models/user.server.model');
require('./src/models/keeprecord.server.model');
require('./src/models/card.server.model');


const app = require('./src/config/express')();
console.log(config.db);
console.log(config.port);
const db = mongoose.connect(config.db, function(err) {
  if (err) {
		console.error('Could not connect to MongoDB!');
		console.log(err);
  } else {
    console.log('connect to db: ' + config.db);
  }
});

app.listen(config.port);
