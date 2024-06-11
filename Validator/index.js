const CustomError = require('../utils/CustomError')

class Validator {
  validatePk(data) {
    if (!data) {
      throw new CustomError(404, 'Table data not found with parameter id.')
    }
  }
}

module.exports = Validator
