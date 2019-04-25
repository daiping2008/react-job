const mongoose = require('mongoose')

const config = require('../utils/config')

exports.connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.dbs, {
      useNewUrlParser:true
    })
    const db = mongoose.connection

    db.on('error', error => {
      console.error(`${error},\n MongoDB connected Fail.`)
    })
    
    db.on('open', () => {
      console.log('MongoDB connected Successfully.')
    })
  })
}