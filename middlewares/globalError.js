const { errRes } = require('../utils/customResponse')

const { BaseError } = require('sequelize')

const CustomError = require('../utils/CustomError')

function globalError(err, req, res, next) {
  const name = err.name
  const code = err.code
  const message = err.message

  if (err instanceof BaseError) {
    return res.json({ status: 'Database or ORM Error', statusType: name })
  }

  if (err instanceof CustomError) {
    return errRes(res, code, message, name)
  }

  if (err instanceof Error) {
    return res.json({ status: 'Programming Error', statusType: name })
  }
}

module.exports = globalError
