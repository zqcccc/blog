const router = require('koa-router')()
const controller = require('../controller');


router
  .get('/', async (ctx, next) => {
    await ctx.render('index', {
      title: 'Hello Koa 2!'
    })
  })

module.exports = router
