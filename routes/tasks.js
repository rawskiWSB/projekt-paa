const router = require('koa-router')()
const store = require('../store')

router.prefix('/tasks')

router.post('/add', async (ctx, next) => {
    const { title, info } = ctx.request.body

  await store.createTask(title, info)
  ctx.redirect('/')
})

module.exports = router
