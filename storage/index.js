const local = require('./local')
const imgur = require('./cloud/imgur')
const cloudinary = require('./cloud/cloudinary')

function uploadImage(file, type) {
  switch (true) {
    case type === 'local':
      return local.upload(file)
      break
    case type === 'imgur':
      return imgur.upload(file)
      break
    case type === 'cloudinary':
      return cloudinary.upload(file)
      break
  }
}

module.exports = { uploadImage }
