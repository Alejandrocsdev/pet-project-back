const { Router } = require('express')
const router = Router()

const { verificationController } = require('../controllers')

// 發送OTP/密碼
router.post('/send/otp', verificationController.sendOTP)
router.post('/send/password', verificationController.sendPassword)

// 驗證OTP
router.post('/verify/otp', verificationController.verifyOTP)

// 回傳SMS狀態
router.get('/sms_dr', verificationController.smsDr)

module.exports = router
