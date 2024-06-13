const CustomError = require('../utils/CustomError')

class Validator {
  constructor(schema) {
    this.schema = schema
  }

  validatePk(datas) {
    datas.forEach((data) => {
      if (!data) {
        throw new CustomError(404, `Table data not found with parameter or body id.`)
      }
    })
  }

  validateBody(payload, body) {
    const schema = body ? this.schema.append(body) : this.schema
    const { error } = schema.validate(payload)

    if (error) {
      let message = error.details[0].message
      message = message.replace(/\"/g, '')
      message = message.charAt(0).toUpperCase() + message.slice(1)
      throw new CustomError(400, message)
    }
  }

  validatePreserved(data, preserved) {
    if (data === preserved) {
      throw new CustomError(400, `Value '${preserved}' is a preserved field, cannot be alter.`)
    }
  }
}

module.exports = Validator
