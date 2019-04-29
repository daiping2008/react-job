const router = require('koa-router')()

const Chat = require('../db/models/chat')

router.prefix('/chat')

router.get('/', async ctx => {
  const res = await Chat.find({})
  return ctx.body={
    code:0,
    data:res
  }
})

router.get('/getMsg', async ctx=>{

})

module.exports = router