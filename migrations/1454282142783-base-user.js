'use strict'

const mongoose = require('mongoose')
const User = require('../core/models/user')
const db = process.env.DB_HOST

mongoose.connect(db)

exports.up = function(next) {
  let user = new User({
    username: 'admin',
    password: User.generateHash('password'),
    email: 'admin@example.com'
  })
  user.save(function (err, user) {
    if (err) throw err
    next()
  })
}

exports.down = function(next) {
  User.findOneAndRemove({username: 'admin'}, function (err, user) {
    if (err) throw err
    next()
  })
}
