const { errRes } = require('../utils/customResponse')

const { BaseError } = require('sequelize')
const sequelizeError = require('../utils/sequelizeError')

const CustomError = require('../utils/CustomError')

function globalError(err, req, res, next) {
  if (err instanceof BaseError) {
    const { code, message } = sequelizeError(err)
    err.code = code
    err.message = message
  } else if (!(err instanceof CustomError)) {
    err.code = 500
    err.message = 'Programming Error'
  }

  errRes(res, err.code, err.message, err.name)
}

module.exports = globalError
