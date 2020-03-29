const router = require('koa-router')()
const store = require('../store')

router.prefix('/tasks')

router.post('/add', async (ctx, next) => {
    const { title, info } = ctx.request.body
  await store.createTask(title, info)
  ctx.redirect('/')
})
router.post('/updateStatus', async (ctx, next) => {
  const { id, status } = ctx.request.body
  await store.updateTaskStatus(id, status)
  ctx.status = 200
})

router.delete('/deleteTask', async (ctx, next) => {
  const { id } = ctx.request.body
  await store.deleteTask(id)
  ctx.status = 204
})


module.exports = router
