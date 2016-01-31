'use strict'

const v1 = require('./v1')

module.exports = function (app) {
  app.use('/api/v1', v1)

  // Error Handling

  // 404 Handler
  app.use(function(req, res, next) {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // General Handler
  app.use((err, req, res, next) => {
    // Check for express-jwt error
    if (err.name === 'UnauthorizedError') {
      return res.status(401).send({
        status: 401,
        message: 'Unauthorized'
      })
    }

    // Setup the returned object
    let json = {
      status: err.status || 500,
      message: err.message
    }
    // More detail for development
    if (app.get('env') === 'development')
      json.error = err

    return res.status(err.status || 500).json(json)
  })
}