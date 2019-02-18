const Comment = require('../models/comment')

module.exports = {
  async getComments(ctx) {
    const articleId = ctx.params.id
    if (!articleId) {
      ctx.body = {
        code: 0,
        msg: '无效参数'
      }
      return false
    }
    try {
      const res = await Article.find(querys, fields).sort({
        meta: { createdAt: '-1' }
      })
    } catch (error) {}
  }
}
