const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
  // 聊天ID
  chatId:{
    type:String,
    require:true
  },
  // 谁发送聊天
  from:{
    type:String,
    require:true
  },
  // 谁接收聊天
  to:{
    type:String,
    require:true
  },
  // 是否已读
  read:{
    type:Boolean,
    default:false
  },
  // 聊天内容
  content:{
    type:String,
    default:''
  },
  createAt:{
    type:String,
    default:Date.now()
  },
  updateAt:{
    type:String,
    default:Date.now()
  }
})

module.exports = mongoose.model('Chat', ChatSchema)