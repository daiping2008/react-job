const router = require('koa-router')()

const Chat = require('../db/models/chat')
// const User = require('../db/models/user')

router.prefix('/chat')

router.get('/', async ctx => {
  const {from, to} = ctx.request.query
  const chatId = [from, to].sort().join('-')
  
  const res = await Chat.find({chatId})
  return ctx.body={
    code:0,
    data:res
  }
})

router.get('/getMsg', async ctx=>{

})

module.exports = router