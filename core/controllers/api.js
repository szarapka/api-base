'use strict'

var apiController

apiController = (function() {
  // Dependencies
  let _ = require('lodash')
  let user = require('../models/user')

  function init() {
    // Initialize things privately.
  }

  function createToken(user) {
    let jwt = require('jsonwebtoken')
    let secret = process.env.TOKEN_SECRET
    let expiry = process.env.TOKEN_EXPIRY
    let issuer = process.env.TOKEN_ISSUER
    let audience = process.env.TOKEN_AUDIENCE

    return jwt.sign(_.omit(user, 'password'), secret, {expiresIn: expiry, issuer: issuer, audience: audience})
  }

  return {
    hello: (req, res, next) => {
      return res.status(200).json({msg: 'api-base'})
    },
    authenticate: (req, res, next) => {
      // authenticate
    }
  }
})()

module.exports = apiController