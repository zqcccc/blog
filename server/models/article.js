const { db } = require('../db')
const { Schema, model } = db

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  tag: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  content: { type: String, required: true },
  descript: { type: String },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
},{
  versionKey: false,
  timestamps: { createdAt: 'create_at', updatedAt: 'update_at' }
})

module.exports = model('Article', ArticleSchema)
