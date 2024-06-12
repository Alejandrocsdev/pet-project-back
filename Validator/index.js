const CustomError = require('../utils/CustomError')

class Validator {
  constructor(schema) {
    this.schema = schema
  }

  validatePk(data) {
    if (!data) {
      throw new CustomError(404, 'Table data not found with parameter id.')
    }
  }

  validateBody(payload) {
    const { error } = this.schema.validate(payload)
    if (error) {
      let message = error.details[0].message
      message = message.replace(/\"/g, '')
      message = message.charAt(0).toUpperCase() + message.slice(1)
      throw new CustomError(400, message)
    }
  }
}

module.exports = Validator
