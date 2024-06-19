const multer = require('multer')
const path = require('path')

const storage = (storagePath) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, storagePath)
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
}

const localUpload = multer({ storage: storage('storage/local/images/') })
const tempUpload = multer({ storage: storage('storage/cloud/cloudinary/temp/') })
const directUpload = multer()

function upload(type) {
  switch (true) {
    case type === 'local':
      return localUpload.single('image')
      break
    case type === 'cloudinary':
      return tempUpload.single('image')
      break
    case type === 'imgur':
      return directUpload.single('image')
      break
  }
}

module.exports = upload
