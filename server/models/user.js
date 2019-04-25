const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    require: true
  },
  pwd:{
    type:String,
    require: true
  },
  type:{
    type:String
  },
  createdAt:{
    type:String,
    default:Date.now()
  },
  updateAt:{
    type:String,
    default:Date.now()
  }
})

module.exports = mongoose.model('User', userSchema)