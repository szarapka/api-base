'use strict'

var apiController

apiController = (function() {
  // Dependencies

  function init() {
    // Initialize things privately.
  }

  return {
    hello: (req, res, next) => {
      return res.status(200).json({msg: 'api-base'})
    }
  }
})()

module.exports = apiController