const { type, status } = require('./statusCode')

const colorize = require('./colorize')

function sucRes(res, code, message, result) {
  const statusType = type(code)
  const statusCode = status(code)
  res.status(code).json({ statusType, statusCode, message, result })
  console.info(colorize(`${statusType}:`, 'blue'))
  console.info(message)
}

function errRes(res, code, message, name) {
  const statusType = type(code, name)
  const statusCode = status(code)
  res.status(code).json({ statusType, statusCode, message })
  console.error(colorize(`${name}:`, 'red'))
  console.error(message)
}

module.exports = { sucRes, errRes }
