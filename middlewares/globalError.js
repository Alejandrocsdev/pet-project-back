const { errRes } = require('../utils/customResponse')

const colorize = require('../utils/colorize')

const { BaseError } = require('sequelize')

const CustomError = require('../utils/CustomError')

const sequelizeError = require('../utils/sequelizeError')

function globalError(err, req, res, next) {
  const name = err.name
  const code = err.code || 500
  const message = err.message
  const errors = err.errors

  if (err instanceof BaseError) {
    const custMsg = errors ? sequelizeError(errors) : 'Database or ORM Error'
    return errRes(res, code, message, name, custMsg)
  }

  if (err instanceof CustomError) {
    return errRes(res, code, message, name)
  }

  if (err instanceof Error) {
    const custMsg = 'Programming Error'
    return errRes(res, code, message, name, custMsg)
  }
}

module.exports = globalError
