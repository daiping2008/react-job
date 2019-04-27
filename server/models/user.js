const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  // 用户名
  username:{
    type: String,
    require: true
  },
  // 密码
  pwd:{
    type:String,
    require: true
  },
  // 类型 boss或者genius
  type:{
    type:String
  },
  // 头像
  avator:{
    type: String
  },
  // 个人简介或者职位简介
  desc:{
    type:String
  },
  // 职位
  job:{
    type: String
  },
  // 如果是boss还有2字段
  // 公司
  company:{
    type: String
  },
  // 薪资
  'money':{
    type: String
  },
  // 创建时间
  createdAt:{
    type:String,
    default:Date.now()
  },
  // 更新时间
  updateAt:{
    type:String,
    default:Date.now()
  }
})

module.exports = mongoose.model('User', userSchema)