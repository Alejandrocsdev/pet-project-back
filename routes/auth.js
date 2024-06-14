const { Router } = require('express')
const router = Router()

const { loginAuth } = require('../config/passport')

const { authController } = require('../controllers')

router.post('/register', authController.register)
router.post('/login', loginAuth, authController.login)
// router.post('/logout', authController.logout)

module.exports = router
