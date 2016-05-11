const wechatRoute = require('../routes/wechat.server.routes');
const express = require('express');
const swig = require('swig');
const bodyParser = require('body-parser');


module.exports = () => {
  const app = express();
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('views', './views');
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());
  app.use(express.static('./public'));

  app.use('/wechat', wechatRoute);

  return app;
};
