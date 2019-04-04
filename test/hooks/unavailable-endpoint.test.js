const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const unavailableEndpoint = require('../../src/hooks/unavailable-endpoint');

describe('\'unavailableEndpoint\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: { 
        get: [ unavailableEndpoint() ]
      }
    });
  });

  it('should return a rejected response with a 503 error code', async () => {
    try {
      await app.service('dummy').get('test');
    } catch(err) {
      assert(err.code === 503, '503 - unavailable code returned');
      assert(err.message == 'Endpoint Unavailable', 'endpoint unavailable message returned');
    }
  });
});
