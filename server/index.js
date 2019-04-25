const Koa = require('koa')

const user = require('./route/user')

const {connect} = require('./db')

connect()
const app = new Koa()
app.use(user.routes()).use(user.allowedMethods())

app.listen(8080, () => console.log('http:localhost:8080'))
