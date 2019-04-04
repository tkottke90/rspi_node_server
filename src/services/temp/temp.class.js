const errors = require('@feathersjs/errors');
const logger = require('../../logger');

/* eslint-disable no-unused-vars */
class Service {
  toMilliseconds(seconds) {
    return seconds * 1000;
  }

  constructor (options) {
    this.options = options || {};
  }

  async setup(app) {
    this.app = app;

    this.current = [];

    this.update = setInterval(async () => {
      const sensorData = this.app.get('temp').readAll();

      sensorData.timestamp = this.app.get('timestamp')();
      this.current = sensorData.data;

      for (let result of sensorData.data) {
        await app.get('redis').lpush(`sensor:${result.id}:temperature`, JSON.stringify({ timestamp: sensorData.timestamp, value: result.temperature }));
        await app.get('redis').lpush(`sensor:${result.id}:humidity`, JSON.stringify({ timestamp: sensorData.timestamp, value: result.humidity }));
      }

      app.io.emit('temp update', sensorData);
      logger.info(`${this.app.get('timestamp')()} - Refresh temperatures`);

    }, this.toMilliseconds(30));
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
