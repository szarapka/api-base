const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const bcrypt = require('bcrypt-nodejs')
const timestamps = require('mongoose-timestamp')

const userSchema = new Schema({
  username: {type: String, required: true, trim: true, unique: true},
  email: {type: String, index: { unique: true }, required: true},
  password: {type: String, required: true}
})

userSchema.plugin(timestamps)

// generating a hash
userSchema.statics.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model("User", userSchema)
