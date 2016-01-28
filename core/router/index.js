'use strict'

const v1 = require('./v1')

module.exports = function (app) {
  app.use('/api/v1', v1)
}