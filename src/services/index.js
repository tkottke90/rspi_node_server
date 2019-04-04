const temp = require('./temp/temp.service.js');
const hueLights = require('./hue-lights/hue-lights.service.js');
const devices = require('./devices/devices.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(temp);
  app.configure(hueLights);
  app.configure(devices);
  app.configure(users);
};
