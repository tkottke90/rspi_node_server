// Initializes the `devices` service on path `/devices`
const createService = require('./devices.class.js');
const hooks = require('./devices.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/devices', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('devices');

  service.hooks(hooks);
};
