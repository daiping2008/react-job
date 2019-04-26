const router = require('koa-router')()

const User = require('../models/user')

const {md5} = require('../utils/utils')

const USER_ID = 'userid'

router.prefix('/user')

router.get('/', async ctx => {
  const person = await User.find({})
  ctx.body = person
})

router.post('/login', async ctx => {
  const {username, pwd} = ctx.request.body
  const res = await User.findOne({username})
  if(!res) {
    return ctx.body = {
      code:1,
      msg:'用户名不存在'
    }
  }
  if (res.pwd !== md5(pwd)){
    return ctx.body = {
      code:1,
      msg:'密码错误'
    }
  }
  ctx.cookies.set(USER_ID, res._id)
  return ctx.body = {
    code:0,
    data:{
      username: res.username,
      type: res.type
    }
  }
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

  try {
    const res = await user.save()
    ctx.cookies.set(USER_ID, res._id)
    return ctx.body = {
      code:0,
      data:{
        username: res.username,
        type: res.type
      }
    }
  } catch(err) {
    return ctx.body = {
      code: 1,
      msg: '服务器出错'
    }
  }
 
})

module.exports = router