const axios = require('axios');

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async setup(app) {
    this.app = app;
    this.config = app.get('phillips');

    this.serviceURL = `http://${this.config.bridge_IP}/api/${this.config.bridge_username}`;
  }

  async find (params) {
    const result = await axios.get(`${this.serviceURL}/lights`);

    return result.data;
  }

  async get (id, params) {
    const result = await axios.get(`${this.serviceURL}/lights/${id}`);
    return result.data;
  }

  async create (data, params) {
    return null;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    
  }

  async remove (id, params) {
    return null;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
