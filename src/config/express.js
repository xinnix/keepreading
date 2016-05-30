const wechatRoute = require('../routes/wechat.server.routes');
const adminRoute = require('../routes/admin.server.routes');
const express = require('express');
const swig = require('swig');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './public/img' });

module.exports = () => {
  const app = express();
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('views', './src/views');
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());
  app.use(express.static('public'));

  app.use('/wechat', wechatRoute);
  app.use('/admin', multipartMiddleware, adminRoute);

  return app;
};
