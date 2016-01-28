'use strict'

const express = require('express')
const fs = require('fs')
const join = require('path').join
const mongoose = require('mongoose')

const models = join(__dirname, 'core/models')
const port = process.env.API_PORT || 3000
const db = process.env.DB_HOST
const app = express()

module.exports = app

fs.readdirSync(models)
  .filter(file => ~file.indexOf('.js'))
  .forEach(file => require(join(models, file)))

require('./core/config/express')(app)
require('./core/router')(app)

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen)

function listen () {
  app.listen(port, () => {
    console.log('API listening on port ' + port + '.')
  })
}

function connect () {
  return mongoose.connect(db).connection
}