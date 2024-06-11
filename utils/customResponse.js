const { type, status } = require('./statusCode')

const colorize = require('./colorize')

function sucRes(res, code, message, result) {
  // 格式: Success || Redirection
  const statusType = type(code)
  // 格式: 201 Created
  const statusCode = status(code)

  // 後端回應
  res.status(code).json({ statusType, statusCode, message, result })

  // 後端回應
  console.info(colorize(`${statusType}:`, 'blue'))
  console.info(message)
}

function errRes(res, code, message, name, custMsg) {
  // 格式: Client Error || Server Error (ReferenceError)
  const statusType = type(code, name)
  // 格式: 404 Not Found
  const statusCode = status(code)

  // 前端回應
  res.status(code).json({ statusType, statusCode, message: custMsg || message })

  // 後端回應
  console.error(colorize(`${name}:`, 'red'))
  console.error(message || custMsg)
}

module.exports = { sucRes, errRes }
