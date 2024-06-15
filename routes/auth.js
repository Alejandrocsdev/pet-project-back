const { Router } = require('express')
const router = Router()

const { loginAuth, jwtAuth } = require('../config/passport')

const { authController } = require('../controllers')

router.post('/register', authController.register)
router.post('/login', loginAuth, authController.login)

router.get('/protected', jwtAuth, authController.protected)

module.exports = router
