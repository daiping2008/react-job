const router = require('koa-router')()

const User = require('../models/user')

const {md5} = require('../utils/utils')

router.prefix('/user')

router.get('/', async ctx => {
  const person = await User.find({})
  ctx.body = person
})

router.post('/register', async ctx => {
  const {username, pwd, type} = ctx.request.body
  const userRep = await User.findOne({username})
  if(userRep) {
    return ctx.body = {
      code:1,
      msg:'用户名存在'
    }
  }
  const user = new User({username, type, pwd: md5(pwd)})
  const res = await user.save()
  ctx.body = {
    code:0,
    data:{
      username: res.username,
      type: res.type
    }
  }
})

module.exports = router