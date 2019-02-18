const { db } = require('../db')
const { Schema, model } = db

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  token: { type: String, default: '' }
})

module.exports = model('User', UserSchema)
