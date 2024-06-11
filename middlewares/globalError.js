const { errRes } = require('../utils/customResponse')

const colorize = require('../utils/colorize')

const { BaseError } = require('sequelize')

const CustomError = require('../utils/CustomError')

function globalError(err, req, res, next) {
  const name = err.name
  const code = err.code || 500
  let message = err.message

  if (err instanceof BaseError) {
    message = 'Database or ORM Error'
    return errRes(res, code, message, name)
  }

  if (err instanceof CustomError) {
    return errRes(res, code, message, name)
  }

  if (err instanceof Error) {
    message = 'Programming Error'
    return errRes(res, code, message, name)
  }
}

module.exports = globalError
