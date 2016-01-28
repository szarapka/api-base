'use strict'

var jwtController

jwtController = (function() {
  let _ = require('lodash')
  let user = require('../models/user')

  function createToken(user) {
    let jwt = require('jsonwebtoken')
    let secret = process.env.TOKEN_SECRET
    let expiry = process.env.TOKEN_EXPIRY
    let issuer = process.env.TOKEN_ISSUER

    return jwt.sign(_.omit(user, 'password'), secret, {expiresIn: expiry, issuer: issuer})
  }

  return {
    authenticate: (req, res, next) => {
      // authenticate
    }
  }
})()

module.exports = apiController