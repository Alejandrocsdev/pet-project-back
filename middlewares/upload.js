const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/local/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const localUpload = multer({ storage })
const cloudUpload = multer()

function upload(type) {
  switch (true) {
    case type === 'local':
      return localUpload.single('image')
      break
    case type === 'imgur' || type === 'cloudinary':
      return cloudUpload.single('image')
      break
  }
}

module.exports = upload
