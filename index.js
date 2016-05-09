
var config = require('./config/config');
var mongoose = require('mongoose');


var app = require('./config/express')();
// var chalk = require('chalk');
//
// var db = mongoose.connect(config.db, function(err) {
// 	if (err) {
// 		console.error(chalk.red('Could not connect to MongoDB!'));
// 		console.log(chalk.red(err));
// 	} else {
//       console.log(chalk.red('connect to db: ' + config.db));
//     }
// });

app.listen(config.port);
