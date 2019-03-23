const Tag = require('../models/tag')
const Article = require('../models/article')

module.exports = {
  async getTags(ctx) {
    try {
      const tags = await Tag.find()
      if (tags) {
        ctx.body = {
          code: 1,
          msg: '获取标签成功',
          data: tags
        }
      } else {
        ctx.body = {
          code: 0,
          msg: '获取标签失败'
        }
      }
    } catch (error) {
      ctx.body = {
        code: 0,
        msg: '服务器内部错误'
      }
    }
  },

  async postTag(ctx) {
    try {
      const { name, descript } = ctx.request.body
      // 判断标签名是否重复
      const res = await Tag.find({ name })
      if (res && res.length !== 0) {
        ctx.body = {
          code: 0,
          msg: '已存在同名标签'
        }
        return false
      }
      const tag = await new Tag({ name, descript }).save()
      if (tag) {
        ctx.body = {
          code: 1,
          msg: '添加标签成功',
          data: tag
        }
      } else {
        ctx.body = {
          code: 0,
          msg: '添加标签失败'
        }
      }
    } catch (error) {
      console.log(error)
      ctx.body = {
        code: 0,
        msg: '服务器内部错误'
      }
    }
  },

  async putTag(ctx) {
    const _id = ctx.params.id
    const { name, descript } = ctx.request.body
    console.log(_id)
    try {
      if (!_id) {
        ctx.body = {
          code: 0,
          msg: '无效参数'
        }
        return false
      }
      // 判断标签名是否重复
      const tag = await Tag.find({ _id: { $ne: _id }, name })
      if (tag && tag.length !== 0) {
        ctx.body = {
          code: 0,
          msg: '已存在同名标签'
        }
        return false
      }

      const res = await Tag.updateOne({ _id }, { name, descript })
      if (res) {
        ctx.body = {
          code: 1,
          msg: '修改成功',
          data: res
        };
      } else {
        ctx.body = {
          code: 0,
          msg: '修改失败',
          data: res
        };
      }
    } catch (error) {
      console.log(error)
      ctx.body = {
        code: 0,
        msg: '服务器内部错误'
      }
    }
  },

  async deleteTag(ctx) {
    const _id = ctx.params.id
      if (_id.length !== 24) {
        ctx.body = {
          code: 0,
          msg: '你传的是个什么鬼哦！',
          id: _id
        }
        return
      }
    try {
      const article = await Article.find({ tag: _id })
      if (article.length) {
        ctx.body = {
          code: 0,
          msg: '还有文章含有此标签，请先去除这些标签',
          article
        }
        return
      }
      const tag = await Tag.deleteOne({ _id })
      if (tag.length) {
        ctx.body = {
          code: 0,
          msg: 'test删除标签失败',
          tag
        }
        return
      }
      ctx.body = {
        code: 1,
        msg: 'test删除标签成功',
        tag
      }
    } catch (error) {
      console.log(error)
      ctx.body = {
        code: 0,
        msg: '服务器内部错误'
      }
    }
  }
}
