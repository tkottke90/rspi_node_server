const assert = require('assert');
const app = require('../../src/app');

describe('\'temp\' service', () => {
  it('registered the service', () => {
    const service = app.service('temp');

    assert.ok(service, 'Registered the service');
  });
});
