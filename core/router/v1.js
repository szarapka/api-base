const router = require('express').Router()
const api = require('../controllers/api')

module.exports = function () {
  router.route('/')
    .get(api.hello)

  return router
}()