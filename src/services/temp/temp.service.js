// Initializes the `temp` service on path `/temp`
const createService = require('./temp.class.js');
const hooks = require('./temp.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/temp', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('temp');

  service.hooks(hooks);
};
