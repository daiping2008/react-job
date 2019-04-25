const utility = require('utility')

// 加密加盐
exports.md5 = (pwd) => {
  const salt = '__BlackRabbit__@CoM!' // 盐值
  return utility.md5(pwd + salt)
}