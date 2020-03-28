const router = require('koa-router')()
const store = require('../store')

router.prefix('/tasks')

router.post('/add', async (ctx, next) => {
  await store.createTask(ctx.request.body.title)
  ctx.redirect('/')
})
router.post('/add', async (ctx, next) => {
  await store.createTaskInfo(ctx.request.body.info)
  ctx.redirect('/')
})

module.exports = router
