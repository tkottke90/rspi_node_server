const redis = require('ioredis');
const logger = require('./logger');


module.exports = function(app) {
  const client = new redis('6379', process.env.REDIS_URL);

  client.on('connect', () => {
    logger.log('info', 'Redis Connected');
  });

  client.on('disconnect', () => {
    logger.log('info', 'Redis Disconnected');
  });

  app.set('redis', client);

  return app;
};