const unused = require('../../hooks/unavailable-endpoint');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ unused() ],
    update: [ unused() ],
    patch: [],
    remove: [ unused() ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
