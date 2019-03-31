/* eslint-disable no-unused-vars */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const errors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    
    throw new errors.Unavailable('Endpoint Unavailable');

  };
};
