const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const chalk = require('chalk');
const raspberryPi = require('./rspi.js');
const redis = require('./redis');

const authentication = require('./authentication');

const app = express(feathers());

// Load app configuration
app.configure(configuration());

app.set('timestamp', () => {
  return `${chalk.blue(new Date().toISOString())}`;
});
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join('public', 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());

const _clients = [];
app.configure(socketio(function(io) {
  io.on('connection', function(socket) {
    if (!_clients[socket.id]) {  logger.log('info', `${app.get('timestamp')()} - new socket ${socket.id}`); }
    _clients[socket.id] = socket;

    socket.emit('news', { text: 'A client connected!' });
    
    socket.on('my other event', function (data) {
      logger.log('info', `${app.get('timestamp')()} - ${data}`);
    });

    // eslint-disable-next-line no-unused-vars
    socket.on('disconnect', (data) => {
      logger.log('info', socket.id + ' disconnected');
      delete _clients[socket.id];
    });
  });

  // Registering Socket.io middleware
  io.use(function (socket, next) {
    // Exposing a request property to services and hooks
    socket.feathers.referrer = socket.request.referrer;
    next();
  });
}));

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.configure(redis);
app.configure(raspberryPi);

app.hooks(appHooks);

process.on('beforeExit', () => {
  logger.log('info', `${chalk.blue(new Date().toISOString())} - Shutting Down....`);
});


module.exports = app;
