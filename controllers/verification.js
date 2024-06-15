const { sequelize, Otp } = require('../models')

const { asyncError } = require('../middlewares')

const { sucRes } = require('../utils/customResponse')

const Validator = require('../Validator')

const Joi = require('joi')

const encrypt = require('../utils/encrypt')

// 發送信件函式
const sendMail = require('../config/email')

const schema = Joi.object()
const emailBody = { methodData: Joi.string().email().required() }
const phoneBody = { methodData: Joi.string().pattern(/^09/).length(10).required() }

class VerificationController extends Validator {
  constructor() {
    super(schema)
  }

  sendEmail = asyncError(async (req, res, next) => {
    this.validateBody(req.body, emailBody)
    const { methodData } = req.body

    const otp = encrypt.otp()
    const expireTime = Date.now() + 10 * 60 * 1000

    const [transaction, hashedOtp, otpData] = await Promise.all([
      // 開始事務
      sequelize.transaction(),
      // 加密OTP
      encrypt.hash(otp),
      // 檢查OTP是否已存在
      Otp.findOne({where: { methodData }})
    ])

    try {
      if (otpData) {
        // 將最新OTP存至資料庫
        await Otp.update({ otp: hashedOtp, expireTime, attempts: 0 }, { where: { methodData } })
      } else {
        // 將OTP存至資料庫
        await Otp.create({ methodData, otp: hashedOtp, expireTime })
      }
      // 提交事務
      await transaction.commit()
    } catch (err) {
      // 如果發生錯誤，回滾事務
      await transaction.rollback()
      next(err)
    }

    // 發送驗證信
    const info = await sendMail(methodData, otp)
    info.expireTime = expireTime

    sucRes(res, 200, 'Email sent successfully.', info)
  })

  verifyEmail = asyncError(async (req, res, next) => {
    sucRes(res, 200, 'Email verified successfully.')
  })

  sendPhone = asyncError(async (req, res, next) => {
    sucRes(res, 200, 'SMS sent successfully.')
  })

  verifyPhone = asyncError(async (req, res, next) => {
    sucRes(res, 200, 'Phone verified successfully.')
  })
}

module.exports = new VerificationController()
