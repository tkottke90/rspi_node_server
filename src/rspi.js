const dht = require('node-dht-sensor');
const chalk = require('chalk');

module.exports = function (app) {

  const tempSensors = {
    dht: dht,
    sensors: [
      {
        name: 'Office',
        pin: 4,
        type: 11
      }
    ],
    readAll: function () {
      const returnData = {
        total: 0,
        data: []
      };

      for (let sensor in this.sensors) {
        const result = app.get('temp').dht.read(this.sensors[sensor].type, this.sensors[sensor].pin);

        if (result.temperature) {
          returnData.data.push({
            temperature: result.temperature,
            humidity: result.humidity
          });

          returnData.total++;
        }
      }

      return returnData;
    },
    read: function (id) {
      const result = app.get('temp').dht.read(this.sensors[id].type, this.sensors[id].pin);

      return {
        temperature: result.temperature,
        humidity: result.humidity
      };
    }
  };

  app.set('temp', tempSensors);

  return app;

};