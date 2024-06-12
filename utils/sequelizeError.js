// err.error(O)
// SequelizeUniqueConstraintError
// SequelizeValidationError
// err.error(X)
// SequelizeEagerLoadingError
// SequelizeDatabaseError
// SequelizeConnectionError

function sequelizeError(errors) {
  const type = errors[0].type
  const field = errors[0].path
  const value = errors[0].value
  // console.log(type)
  // console.log(field)
  // console.log(value)

  // const message = errors[0].message
  // const validatorKey = errors[0].validatorKey
  // console.log(message)
  // console.log(validatorKey)

  if (type === 'unique violation') {
    return `The value '${value}' for the field '${field}' already exists.`
  } else if (type === 'notNull Violation') {
    return `Field '${field}' cannot be null.`
  }
}

module.exports = sequelizeError
