const temp = require('./temp/temp.service.js');
const hueLights = require('./hue-lights/hue-lights.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(temp);
  app.configure(hueLights);
};
