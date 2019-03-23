const Comment = require('../models/comment')
const Article = require('../models/article')

module.exports = {
  async getAllComments(ctx) {
    try {
      const res = await Comment.find({})
        .populate('article', { title: 1 })
        .sort({
          update_at: '-1'
        })
      ctx.body = {
        code: 1,
        msg: '获取所有评论成功',
        data: res
      }
    } catch (error) {
      console.log(error)
      ctx.body = {
        code: 0,
        msg: '服务内部错误'
      }
    }
  },
  async getComments(ctx) {
    const articleId = ctx.params.id
    console.log('articleId: ', articleId)
    if (!articleId) {
      ctx.body = {
        code: 0,
        msg: '无效参数'
      }
      return false
    }
    try {
      const res = await Comment.find({ articleId }).sort({
        update_at: '-1'
      })
      ctx.body = {
        code: 1,
        msg: '获取所有评论成功',
        data: res
      }
    } catch (error) {
      console.log(error)
      ctx.body = {
        code: 0,
        msg: '服务内部错误'
      }
    }
  },
  async postComment(ctx) {
    try {
      const { article = '' } = ctx.request.body
      if(article.length !== 24 ) {
        ctx.body = {
          code: 0,
          msg: '文章不存在'
        }
        return
      }
      const hasArt = await Article.find({_id: article})
      if(!hasArt) {
        ctx.body = {
          code: 0,
          msg: '文章不存在'
        }
        return
      }
      const res = await new Comment(ctx.request.body).save()
      if (res) {
        console.log(res)
        ctx.body = {
          code: 1,
          msg: '发送评论成功'
        }
        return
      }
    } catch (error) {
      console.log(error)
      ctx.body = {
        code: 0,
        msg: '服务内部错误'
      }
    }
    ctx.body = {
      code: 0,
      msg: '添加评论失败,请检查表单是否填写完整'
    }
  },
  async deleteComment(ctx) {
    const _id = ctx.params.id
    if (!_id) {
      ctx.body = {
        code: 0,
        msg: '无效参数'
      }
      return false
    }
    try {
      const res = await Comment.findOneAndDelete({ _id })
      console.log(res)
      if (res) {
        ctx.body = {
          code: 1,
          msg: '删除成功'
        }
        return
      } else {
        ctx.body = {
          code: 0,
          msg: '不存在此评论'
        }
      }
    } catch (error) {
      console.log(error)
      ctx.body = {
        code: 0,
        msg: '服务内部错误'
      }
    }
  }
}
