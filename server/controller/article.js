const Article = require('../models/article')
const Tag = require('../models/tag')
const mongoose = require('mongoose')

module.exports = {
  // 获取文章列表
  async getList(ctx) {
    const { tag = '', keyword = '' } = ctx.query
    const fields = {
      content: false,
      __v: false
    }
    try {
      let querys
      if (tag !== '') {
        querys.tag = { $in: [tag] }
      }
      if (keyword !== '') {
        const keywordReg = new RegExp(keyword)
        querys.$or = [{ title: keywordReg }, { descript: keywordReg }]
      }
      const res = await Article.find(querys, fields).sort({
        update_at: '-1'
      })
      ctx.body = {
        code: 1,
        msg: '获取文章列表成功',
        data: res || []
      }
    } catch (error) {
      console.log(error)
      ctx.body = {
        code: 0,
        msg: '服务内部错误'
      }
    }
  },
  // 查看文章详情
  async getArt(ctx) {
    const _id = ctx.params.id
    try {
      if (!_id) {
        ctx.body = {
          code: 0,
          msg: '无效参数'
        }
        return false
      }
      const res = await Article.findOne({ _id })
      if (res) {
        ctx.body = {
          code: 1,
          msg: '获取文章成功',
          data: res
        }
      } else {
        ctx.body = {
          code: 0,
          msg: '获取文章失败'
        }
      }
    } catch (err) {
      ctx.body = {
        code: 0,
        msg: '获取文章详情失败'
      }
    }
  },
  // 添加文章
  async postArt(ctx) {
    try {
      const res = await new Article(ctx.request.body).save()
      if (res) {
        ctx.body = {
          code: 1,
          msg: '添加文章成功'
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
      msg: '添加文章失败,请检查表单是否填写完整'
    }
  },
  // 修改文章
  async putArt(ctx) {
    const _id = ctx.params.id
    const { title = '', descript, tag, content = '' } = ctx.request.body
    if (!title || !content) {
      ctx.body = {
        code: 0,
        msg: '无效参数,标题和内容不能为空'
      }
      return false
    }
    try {
      // 判断文章是否存在
      const art = await Article.findOne({ _id })
      if (!art) {
        ctx.body = {
          code: 0,
          msg: '文章不存在'
        }
        return false
      }
      const res = await Article.findByIdAndUpdate(
        _id,
        {
          title,
          descript,
          tag,
          content
        },
        { new: true }
      )
      if (res) {
        ctx.body = {
          code: 1,
          msg: '修改成功'
        }
      } else {
        ctx.body = {
          code: 0,
          msg: '修改失败'
        }
      }
    } catch (error) {
      console.log('修改文章过程错误', err)
      ctx.body = {
        code: 0,
        msg: '修改失败'
      }
    }
  },
  // 删除文章
  async deleteArt(ctx) {
    const _id = ctx.params.id
    try {
      if (!_id) {
        ctx.body = {
          code: 0,
          msg: '无效参数'
        }
        return
      }
      const res = await Article.findByIdAndRemove(_id)
      if (res) {
        ctx.body = {
          code: 1,
          msg: '文章删除成功'
        }
      } else {
        ctx.body = {
          code: 0,
          msg: '文章删除失败'
        }
      }
    } catch (err) {
      ctx.body = {
        code: 0,
        msg: '删除文章失败'
      }
    }
  },

  async test(ctx) {
    try {
      const { tag = '5c653a7ab36c700c7c4098b6', keyword = '测试' } = ctx.query
      const opts = [
      //   { $unwind: '$tag' },
      //   {
      //     $group: {
      //       _id: '$tag',
      //       articles: { $push: { _id: '$_id', title: '$title' } },
      //       count: { $sum: 1 }
      //     }
      //   },
      { $match: { tag :new mongoose.Types.ObjectId(tag) } },
      // { $match: { $or: [ { title: {$regex: keyword} },  ] } },
        {
          $lookup: {
            from: 'tags',
            localField: 'tag',
            foreignField: '_id',
            as: 'tag'
          }
        },
        { $project: {
          title: 1,
          tag: {
            "_id":1,
            "name":1
          },
          update_at:1
        },
       },
       { $sort : { update_at: -1 } }
      ]
      if(tag!==''){

      }
      const res = await Article.aggregate(opts)

      // const res = await Article.find().populate('tag','_id name descript')
      ctx.body = {
        code: 1,
        msg: '获取标签成功',
        res
      }
    } catch (error) {
      console.log(error)
    }
  }
}
