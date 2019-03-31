const assert = require('assert');
const app = require('../../src/app');

describe('\'hue-lights\' service', () => {
  it('registered the service', () => {
    const service = app.service('hue-lights');

    assert.ok(service, 'Registered the service');
  });
});
