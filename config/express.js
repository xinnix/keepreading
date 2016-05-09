const wechatRoute = require('../routes/wechat.server.routes');
const express = require('express');
const bodyParser = require('body-parser');


module.exports = () => {
  const app = express();

  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());
  app.use('/wechat', wechatRoute);

  return app;
};
