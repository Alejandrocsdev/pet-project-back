const crypto = require('crypto')

const secret = crypto.randomBytes(32).toString('hex')

// 生成環境變數所需SECRET
console.log(secret)
