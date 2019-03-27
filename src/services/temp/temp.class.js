const errors = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async setup(app) {
    this.app = app;

    this.current = [];

    this.update = setInterval(() => {
      const sensorData = this.app.get('temp').readAll();

      this.current = sensorData.data;

      app.io.emit('temp update', sensorData);

    }, 1000);
  }

  async onDestroy() {
    clearInterval(this.update);
  }

  async find (params) {
    return this.app.get('temp').getAll();
  }

  async get (id, params) {
    
    if (id < this.app.get('temp').sensors.length) {

      const sensor = this.app.get('temp')[id];
      return this.app.get('temp').read(id);

    } else {
      throw new errors.Conflict('Invalid Sensor ID');
    }
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
