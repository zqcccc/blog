const { db } = require('../db')
const { Schema, model } = db

const CommentSchema = new Schema({
  nickname: { type: String },
  mail: { type: String, required: true },
  title: { type: String, },
  content: { type: String, required: true },
  article: { type: Schema.Types.ObjectId, required: true, ref: 'Article' },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
},{
  versionKey: false,
  timestamps: { createdAt: 'create_at', updatedAt: 'update_at' }
})

module.exports = model('Comment', CommentSchema)
