const { db } = require('../db')
const { Schema, model } = db

const TagSchema = new Schema({
  name: { type: String, required: true },
  descript: { type: String, required: true },
  num: { type: Number, default: 0 }
})

module.exports = model('Tag', TagSchema)
