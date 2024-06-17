const { Router } = require('express')
const router = Router()

const { loginAuth, jwtAuth } = require('../config/passport')

const { authController } = require('../controllers')

const { upload } = require('../middlewares')

const storageType = process.env.STORAGE_TYPE || 'local'

router.post('/register', upload(storageType), authController.register)
router.post('/login', loginAuth, authController.login)

// router.get('/protected', jwtAuth, authController.protected)

module.exports = router
