const { sequelize, User, Otp } = require('../models')

const { asyncError } = require('../middlewares')

const { sucRes } = require('../utils/customResponse')

const Validator = require('../Validator')

const Joi = require('joi')

const encrypt = require('../utils/encrypt')

const sendMail = require('../config/email')

const CustomError = require('../errors/CustomError')

const emailRules = Joi.string().email().required()
const phoneRules = Joi.string().pattern(/^09/).length(10).required()

const schema = Joi.object({
  methodData: Joi.alternatives()
    .try(emailRules, phoneRules)
    .required()
})

const otpBody = { otp: Joi.string().length(8).required() }

class VerificationController extends Validator {
  constructor() {
    super(schema)
  }

  sendOTP = asyncError(async (req, res, next) => {
    this.validateBody(req.body)
    const { methodData } = req.body

    const otp = encrypt.otp()
    const expireTime = Date.now() + 10 * 60 * 1000

    const [transaction, hashedOtp, otpData, user] = await Promise.all([
      // 開始事務
      sequelize.transaction(),
      // 加密OTP
      encrypt.hash(otp),
      // 檢查OTP是否已存在
      Otp.findOne({ where: { methodData } }),
      // 檢查發送媒介是不是信箱
      User.findOne({ where: { email: methodData } })
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

    if (user) {
      const info = await sendMail(methodData, otp)
      info.expireTime = expireTime
      sucRes(res, 200, 'Email sent successfully.', info)
    } else {
      // const info = await sendMail(methodData, otp)
      // info.expireTime = expireTime
      sucRes(res, 200, 'SMS sent successfully.', info)
    }
  })

  verifyOTP = asyncError(async (req, res, next) => {
    this.validateBody(req.body, otpBody)
    const { methodData, otp } = req.body

    // 取得 Otps Table 特定 userId 資料
    const otpData = await Otp.findOne({ where: { methodData } })
    this.validateData([otpData], `Table data not found with email: ${methodData}.`)
    // 取得OTP
    const hashedOtp = otpData.otp

    // 檢查OTP是否正確
    const isMatch = await encrypt.hashCompare(otp, hashedOtp)

    // 取得OTP有效期限
    const expireTime = otpData.expireTime

    // 取得嘗試輸入OTP次數
    const attempts = otpData.attempts + 1

    if (isMatch || expireTime <= Date.now() || attempts > 3) {
      // 刪除 Otps Table 資料
      await Otp.destroy({ where: { otp: hashedOtp } })

      switch (true) {
        case isMatch:
          sucRes(res, 200, 'Email verified successfully.')
          break
        case expireTime <= Date.now():
          // 拋出錯誤，並由 catch 捕捉。401: Unauthorized
          throw new CustomError(401, 'OTP was expired.')
          break
        case attempts > 3:
          // 拋出錯誤，並由 catch 捕捉。429: Too Many Requests
          throw new CustomError(429, 'Too many OTP input attempts.')
          break
      }
    } else {
      // 更新 Otps Table 資料
      await Otp.update({ attempts }, { where: { otp: hashedOtp } })
      throw new CustomError(401, 'Wrong OTP input.')
    }
  })
}

module.exports = new VerificationController()
