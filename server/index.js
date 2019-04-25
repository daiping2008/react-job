const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')
const user = require('./route/user')

const {connect} = require('./db')
connect()

app.use(koaBody())
app.use(user.routes()).use(user.allowedMethods())

app.listen(8080, () => console.log('http:localhost:8080'))
