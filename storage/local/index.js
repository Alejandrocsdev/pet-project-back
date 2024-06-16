const fs = require('fs')
const CustomError = require('../../errors/CustomError')

class Local {
  async upload(file) {
    if (!file) return null

    try {
      const filePath = file.path
      return { link: `/${filePath}`, deletehash: null }
    } catch (err) {
      throw new CustomError(500, 'Fail to upload local image.')
    }
  }
}

module.exports = new Local()
