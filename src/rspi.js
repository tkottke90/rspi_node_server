const dht = require('node-dht-sensor');

module.exports = function (app) {

  const tempSensors = {
    dht: dht,
    sensors: [
      {
        id: 1,
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
            id: this.sensors[sensor].id,
            temperature: result.temperature,
            humidity: result.humidity
          });

          returnData.total++;
        }
      }

      return returnData;
    },
    read: function (id) {
      const sensorId = this.sensors.findIndex( sensor => sensor.id === id);
      const result = app.get('temp').dht.read(this.sensors[sensorId].type, this.sensors[id].pin);

      return {
        id: id,
        temperature: result.temperature,
        humidity: result.humidity
      };
    }
  };

  app.set('temp', tempSensors);

  return app;

};