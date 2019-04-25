const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    require: true
  },
  pwd:{
    type:String,
    require: true
  }
})

module.exports = mongoose.model('User', userSchema)