const router = require('koa-router')()

const Chat = require('../db/models/chat')
const config = require('../utils/cookiesKeys')
const User = require('../db/models/user')

router.prefix('/chat')

router.get('/', async ctx => {
  const res = await Chat.find({})
  return ctx.body = {
    code:0,
    data:res
  }
})

router.get('/unreadInfo', async ctx => {
  const userid = ctx.cookies.get(config.USER_ID)

  const res = await Chat.find({'$or':[{from:userid}, {to:userid}]}).sort({createAt:-1})
  // 获得未读取信息列表
  const unread = res.filter(v => !v.read && v.to===userid)
  // 组装数据，把用户消息分组，并且返回最新消息
  const msg = handlerData(res)
  console.log(msg[0])
  const obj = {count:1}
  console.log(Object.assign(unread[0], obj))
  return ctx.body = {
    code:0,
    data: {unread: unread.length,msg}
  }
})

router.get('/getMsg', async ctx=>{
  const {from, to} = ctx.request.query
  const chatId = [from, to].sort().join('-')
  
  const res = await Chat.find({chatId})
  return ctx.body={
    code:0,
    data:res
  }
})

const handlerData = (data) => {
  const user = {}
  data.forEach(v => {
    if(!user[v.chatId]) {
      user[v.chatId] = []
    }
    user[v.chatId].push(v)
  })

  const res = []
  for (let value in user) {
    res.push(user[value][0])
  }

  res.sort((a,b) => (b.createAt - a.createAt))
  return res
}

module.exports = router