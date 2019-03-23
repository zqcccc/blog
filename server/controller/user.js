const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const CONFIG = require('../config')
const User = require('../models/user')

module.exports = {
  async login(ctx) {
    const { name = '', password = '' } = ctx.request.body
    if (name === '' || password === '') {
      ctx.body = {
        code: 0,
        msg: '请填写完表单信息'
      }
      return
    }
    try {
      const user = await User.findOne({ name })
      if (user && (await bcrypt.compare(password, user.password))) {
        const idAndName = {
          id: user._id,
          name: user.name,
        }
        ctx.body = {
          code: 1,
          msg: '登录成功',
          user: idAndName,
          token: jsonwebtoken.sign({
            data: {
              id: user.Id,
              name: user.name
            }
          }, CONFIG.secret, { expiresIn: '1h' })
        }
      } else {
        // ctx.status = 401
        ctx.body = {
          code: 0,
          msg: '登录失败，请检查用户名和密码'
        }
      }
    } catch (error) {
      console.log('登录失败:', error)
    }
  },

  async register(ctx) {
    // 生成salt
    const salt = await bcrypt.genSalt(10)
    let { name, password, isAdmin = false } = ctx.request.body
    try {
      const res = await User.find({ name })
      if (res && res.length !== 0) {
        ctx.body = {
          code: 0,
          msg: '用户名已存在'
        }
        return false
      }
    } catch (error) {
      console.log('注册时查询用户名失败:', error)
    }
    // 对密码进行加密
    password = await bcrypt.hash(password, salt)
    const user = {
      name,
      password,
      isAdmin
    }
    try {
      // 储存到数据库
      const res = await User.create(user)
      if (res) {
        ctx.body = {
          code: 1,
          msg: '注册成功',
          data: res
        }
      } else {
        ctx.body = {
          code: 0,
          msg: '注册失败'
        }
      }
    } catch (error) {
      console.log('注册失败:', error)
    }
  }
}
