const router = require('koa-router')()

const User = require('../models/user')

router.prefix('/user')

router.get('/', async ctx => {
  const person = await User.find({})
  ctx.body = person
})

module.exports = router