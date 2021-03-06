const router = require('koa-router')()

const User = require('../db/models/user')

const {md5} = require('../utils/utils')

const cookiesKey = require('../utils/cookiesKeys')

// 把密码过滤掉
const _filter = {pwd:0,_v:0} 

router.prefix('/user')

router.get('/', async ctx => {
  const person = await User.find({}, _filter)
  ctx.body = person
})

router.get('/list', async ctx => {
  const {type} = ctx.request.query
  const res = await User.find({type},_filter)
  return ctx.body = {
    code:0,
    data: res
  }
})

router.post('/update', async ctx=> {
  const body = ctx.request.body
  const userid = ctx.cookies.get(cookiesKey.USER_ID)
  if (!userid) {
    return ctx.body={code:1}
  }

  try {
    const res = await User.findByIdAndUpdate(userid, body, _filter)
    return ctx.body = {
      code:0,
      data:Object.assign(res, body, _filter)
    }
  } catch (error) {
    return ctx.body={
      code:1,
      msg:'服务器出错'
    }
  }
  
})

router.get('/info', async ctx => {
  const userid = ctx.cookies.get(cookiesKey.USER_ID)
  if(!userid) {
    return ctx.body = {
      code:1,
      msg:'用户没登录'
    }
  }

  const res = await User.findOne({_id:userid}, _filter)
  if (!res) {
    return ctx.body = {
      code:1,
      msg: '用户不存在'
    }
  }
  return ctx.body = {
    code:0,
    data: Object.assign(res, _filter)
  }
})

router.post('/login', async ctx => {
  const {username, pwd} = ctx.request.body
  console.log({username,pwd})
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
  ctx.cookies.set(cookiesKey.USER_ID, res._id)
  return ctx.body = {
    code:0,
    data:Object.assign(res, _filter)
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
    ctx.cookies.set(cookiesKey.USER_ID, res._id)
    return ctx.body = {
      code:0,
      data:Object.assign(res, _filter)
    }
  } catch(err) {
    return ctx.body = {
      code: 1,
      msg: '服务器出错'
    }
  }
})

module.exports = router