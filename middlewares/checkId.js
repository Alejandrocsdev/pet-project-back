const CustomError = require('../utils/CustomError')

function checkId(req, res, next, val) {
  if (isNaN(val)) {
    const err = new CustomError(400, 'Invalid parameter id. It must be a number.')
    return next(err)
  }
  next()
}

module.exports = checkId
