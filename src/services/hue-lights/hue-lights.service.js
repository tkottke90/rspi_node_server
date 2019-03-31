// Initializes the `hue-lights` service on path `/hue-lights`
const createService = require('./hue-lights.class.js');
const hooks = require('./hue-lights.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/hue-lights', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('hue-lights');

  service.hooks(hooks);
};
