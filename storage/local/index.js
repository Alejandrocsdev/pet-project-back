const fs = require('fs')
const path = require('path')
const CustomError = require('../../errors/CustomError')

class Local {
  async upload(file) {
    if (!file) return null

    try {
      const filePath = `uploads/${file.filename}`
      return { link: filePath, deleteData: file.filename }
    } catch (err) {
      throw new CustomError(500, 'Failed to upload local image. (local)')
    }
  }

  async delete(fileName) {
    try {
      const filePath = path.resolve(__dirname, fileName)
      await fs.unlink(filePath)
    } catch (err) {
      throw new CustomError(500, 'Failed to delete image. (local)')
    }
  }
}

module.exports = new Local()


