const cloudinary = require('cloudinary').v2

const fs = require('fs')
const path = require('path')

const CustomError = require('../../../errors/CustomError')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

class Cloudinary {
  async upload(file) {
    if (!file) return null

    try {
      const filePath = path.resolve(__dirname, '..', '..', '..', file.path)
      const data = await cloudinary.uploader.upload(filePath)

      const link = data.secure_url
      const deleteData = data.public_id

      fs.unlink(filePath, (err) => {
        if (err) throw new CustomError(500, 'Failed to delete temporary image after upload. (cloudinary)')
      })

      return { link, deleteData }
    } catch (err) {
      if (deleteData) {
        await cloudinary.uploader.destroy(deleteData)
      }
      throw new CustomError(500, 'Failed to upload local image. (cloudinary)')
    }
  }

  async delete(deletehash) {
    try {
      await cloudinary.uploader.destroy(deletehash)
    } catch (err) {
      throw new CustomError(500, 'Failed to delete image. (cloudinary)')
    }
  }
}

module.exports = new Cloudinary()
