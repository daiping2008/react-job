const Koa = require('koa')
const app = new Koa()
const server = require('http').Server(app.callback())
const io = require('socket.io')(server)

const Chat = require('./db/models/chat')

io.on('connection', socket => {
  socket.on('sendmsg', data => {
    const {from, to, content} = data
    const chatId = [from, to].sort().join('-')
    const chat = new Chat({chatId, from, to, content})
    chat.save((err, doc)=>{
      io.emit('recvmsg', Object.assign(doc))
    })
  })
})

const koaBody = require('koa-body')
const user = require('./route/user')
const chat = require('./route/chat')

const {connect} = require('./db')
connect()

app.use(koaBody())
app.use(user.routes()).use(user.allowedMethods())
app.use(chat.routes()).use(chat.allowedMethods())

server.listen(8080, () => console.log('http:localhost:8080'))
