const { Router } = require('express')
const router = Router()

const { authController } = require('../controllers')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

module.exports = router
