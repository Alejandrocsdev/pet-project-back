const CustomError = require('../errors/CustomError')

function checkId(req, res, next, val) {
  const id = Number(val)
  if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
    const err = new CustomError(400, 'Invalid parameter id. It must be a number.')
    return next(err)
  }
  next()
}

module.exports = checkId
