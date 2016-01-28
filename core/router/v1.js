const router = require('express').Router()
const api = require('../controllers/api')
const jwt = require('express-jwt')

const jwtCheck = jwt({
  secret: process.env.TOKEN_SECRET,
  audience: process.env.TOKEN_AUDIENCE,
  issuer: process.env.TOKEN_ISSUER
})

module.exports = function () {
  router.route('/')
    .get(api.hello)

  router.route('/authenticate')
    .post(api.authenticate)

  router.all('*', jwtCheck)

  // ROUTES BELOW REQUIRE TOKENS

  router.route('/restricted')
    .get(api.restricted)

  return router
}()