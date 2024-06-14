const resStatus = require('./responseStatus')
const colorize = require('./colorize')

// 成功回應
function sucRes(res, code, message, result) {
  const { statusType, statusCode } = resStatus(code)
  // 前端回應
  res.status(code).json({ statusType, statusCode, message, result })
  // 後端回應
  console.info(colorize(`${statusType}:`, 'blue'))
  console.info(message)
}

// 錯誤回應
function errRes(res, code, message, name) {
  const { statusType, statusCode } = resStatus(code, name)
  // 前端回應
  res.status(code).json({ statusType, statusCode, message })
  // 後端回應
  console.error(colorize(`${name}:`, 'red'))
  console.error(message)
}

module.exports = { sucRes, errRes }
