const fs = require('fs')
const CustomError = require('../../errors/CustomError')

async function localStorage(file) {
  if (!file) return null

  try {
    const filePath = file.path
    return `/${filePath}`
  } catch (err) {
    throw new CustomError(500, 'Fail to upload local image.')
  }
}

module.exports = localStorage
