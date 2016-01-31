'use strict'

var userController

userController = (function() {
  let User = require('../models/user')

  return {
    // GET /users
    list: (req, res, next) => {
      User.find({}, '-password', function (err, users) {
        if (err) return next(err)
        return res.status(200).json({
          status: 200,
          message: 'ok',
          recordCount: users.length,
          data: users
        })
      })
    },
    // GET /users/:id
    get: (req, res, next) => {
      User.findById(req.params.id, '-password', function (err, user) {
        if (err) return next(err)
        if (!user) return next()
        return res.status(200).json({
          status: 200,
          message: 'ok',
          recordCount: 1,
          data: user
        })
      })
    },
    // POST /users
    create: (req, res, next) => {
      req.body.password = User.generateHash(req.body.password)
      let user = new User(req.body)
      user.save(function (err, user) {
        if (err) return next(err)
        return res.status(201).json({
          status: 200,
          message: 'ok',
          recordCount: 1,
          data: user
        })
      })
    },
    // PUT /users/:id
    update: (req, res, next) => {
      if (req.body.password && req.body.password.length > 0) {
        req.body.password = User.generateHash(req.body.password)
      } else if (req.body.password && req.body.password.length === 0) {
        delete req.body.password
      }
      User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
        if (err) return next(err)
        if (!user) return next()
        return res.status(200).json({
          status: 200,
          message: 'ok',
          recordCount: 1,
          data: user
        })
      })
    },
    // DELETE /users/:id
    destroy: (req, res, next) => {
      User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return next(err)
        if (!user) return next()
        return res.status(200).json({
          status: 200,
          message: 'ok',
          recordCount: 0
        })
      })
    }
  }
})()

module.exports = userController