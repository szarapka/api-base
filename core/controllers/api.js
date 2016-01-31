'use strict'

var apiController

apiController = (function() {
  let _ = require('lodash')
  let User = require('../models/user')

  function createToken(user) {
    // JWT spec: https://tools.ietf.org/html/rfc7519
    let jwt = require('jsonwebtoken')
    let secret = process.env.TOKEN_SECRET
    let expiry = process.env.TOKEN_EXPIRY
    let issuer = process.env.TOKEN_ISSUER
    let audience = process.env.TOKEN_AUDIENCE

    return jwt.sign(_.omit(user, 'password'), secret, {expiresIn: expiry, issuer: issuer, audience: audience})
  }

  return {
    hello: (req, res, next) => {
      return res.status(200).json({
        status: 200,
        message: 'api-base'
      })
    },
    restricted: (req, res, next) => {
      return res.status(200).json({
        status: 200,
        message: 'restricted'
      })
    },
    authenticate: (req, res, next) => {
      User.findOne({'username': req.body.username}, 'username password email display').exec(function (err, user) {
        if (err) {
          return res.status(500).json({
            status: 500,
            message: 'An Internal Error has Occured. Please try again later.',
            error: err
          })
        }

        if (!user) {
          return res.status(401).json({
            status: 401,
            message: 'Invalid Credentials.'
          })
        }

        if (!user.validPassword(req.body.password)) {
          return res.status(401).json({
            status: 401,
            message: 'Invalid Credentials.'
          })
        }

        // Needed for lodash.omit to work
        user = user.toObject()

        return res.status(201).json({
          status: 201,
          message: 'Token Created',
          token: createToken(user),
          user: _.omit(user, 'password'
        )})
      })
    }
  }
})()

module.exports = apiController