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
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
