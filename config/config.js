module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.LIGHTCLASS_DB_URI || 'mongodb://localhost/lightclass',
  dbtest: 'mongodb://lightclass:lightclass@120.25.227.156:29017/lightclass',
};
