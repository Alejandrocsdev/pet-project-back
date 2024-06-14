const { Router } = require('express')
const router = Router()

const { verificationController } = require('../controllers')

router.post('/send/email', verificationController.sendEmail)
router.post('/send/phone', verificationController.sendPhone)

router.post('/verify/email', verificationController.verifyEmail)
router.post('/verify/phone', verificationController.verifyPhone)

module.exports = router
