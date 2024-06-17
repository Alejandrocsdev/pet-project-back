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
const directUpload = multer()

function upload(type) {
  switch (true) {
    case type === 'local':
      return localUpload.single('image')
      break
    case type === 'imgur':
      return directUpload.single('image')
      break
    case type === 'cloudinary':
      return localUpload.single('image')
      break
  }
}

module.exports = upload
